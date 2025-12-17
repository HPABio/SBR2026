import { useState, useRef, useCallback } from 'react';
import ReactCrop, { type Crop, type PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import type { ImageFieldData } from '../social-templates';

interface EditableImageFrameProps {
  imageData: ImageFieldData;
  onUpdate: (settings: Partial<ImageFieldData>) => void;
  isActive: boolean;
  onActivate: () => void;
  /** Restrict crop aspect ratio (e.g., 1 for square) */
  cropAspect?: number;
}

/**
 * Image editing component with crop, zoom, grayscale, and position controls
 */
export function EditableImageFrame({
  imageData,
  onUpdate,
  isActive,
  onActivate,
  cropAspect,
}: EditableImageFrameProps) {
  const [showCropper, setShowCropper] = useState(false);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);

  // Initialize crop when image loads
  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;

      // Create a centered crop
      const initialCrop = centerCrop(
        makeAspectCrop(
          {
            unit: '%',
            width: 90,
          },
          cropAspect || 1,
          width,
          height
        ),
        width,
        height
      );

      // #region agent log
      console.log('[DEBUG-E] Image loaded, setting initial crop', { initialCrop, imgWidth: width, imgHeight: height });
      // #endregion
      setCrop(initialCrop);
    },
    [cropAspect]
  );

  // Apply crop
  const handleApplyCrop = useCallback(() => {
    // #region agent log
    console.log('[DEBUG-A,B,E] handleApplyCrop called', { hasCompletedCrop: !!completedCrop, completedCrop, hasImgRef: !!imgRef.current, cropState: crop });
    // #endregion
    if (!completedCrop || !imgRef.current) {
      // #region agent log
      console.log('[DEBUG-A,B] Early return - missing data', { hasCompletedCrop: !!completedCrop, hasImgRef: !!imgRef.current });
      // #endregion
      return;
    }

    const img = imgRef.current;
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    // Convert pixel crop to percentage
    const cropData = {
      x: (completedCrop.x * scaleX / img.naturalWidth) * 100,
      y: (completedCrop.y * scaleY / img.naturalHeight) * 100,
      width: (completedCrop.width * scaleX / img.naturalWidth) * 100,
      height: (completedCrop.height * scaleY / img.naturalHeight) * 100,
    };

    // #region agent log
    console.log('[DEBUG-C] Calling onUpdate with cropData', { cropData, imgNaturalWidth: img.naturalWidth, imgWidth: img.width });
    // #endregion
    onUpdate({ crop: cropData });
    setShowCropper(false);
  }, [completedCrop, onUpdate, crop]);

  // Handle zoom change
  const handleZoomChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onUpdate({ zoom: parseFloat(e.target.value) });
    },
    [onUpdate]
  );

  // Handle grayscale toggle
  const handleGrayscaleToggle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onUpdate({ grayscale: e.target.checked });
    },
    [onUpdate]
  );

  // Handle position offset X
  const handleOffsetXChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onUpdate({ offsetX: parseFloat(e.target.value) });
    },
    [onUpdate]
  );

  // Handle position offset Y
  const handleOffsetYChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onUpdate({ offsetY: parseFloat(e.target.value) });
    },
    [onUpdate]
  );

  // Reset all settings
  const handleReset = useCallback(() => {
    onUpdate({
      crop: { x: 0, y: 0, width: 100, height: 100 },
      zoom: 1,
      grayscale: false,
      offsetX: 0,
      offsetY: 0,
    });
  }, [onUpdate]);

  if (!imageData.src) return null;

  return (
    <div className="rounded-lg border border-border bg-background/60 p-3">
      {/* Cropper Modal */}
      {showCropper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="max-h-[90vh] max-w-[90vw] overflow-auto rounded-lg bg-background p-4">
            <h4 className="mb-3 text-lg font-semibold">Crop Image</h4>
            <div className="max-h-[60vh] overflow-auto">
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => {
                  // #region agent log
                  console.log('[DEBUG-A,E] ReactCrop onComplete fired', { completedCrop: c });
                  // #endregion
                  setCompletedCrop(c);
                }}
                aspect={cropAspect}
              >
                <img
                  ref={imgRef}
                  src={imageData.src}
                  alt="Crop preview"
                  onLoad={onImageLoad}
                  style={{ maxHeight: '60vh', maxWidth: '100%' }}
                  crossOrigin="anonymous"
                />
              </ReactCrop>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={handleApplyCrop}
                className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                Apply Crop
              </button>
              <button
                type="button"
                onClick={() => setShowCropper(false)}
                className="rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview thumbnail */}
      <div className="mb-3">
        <div
          className="relative h-20 w-20 overflow-hidden rounded border border-border"
          onClick={onActivate}
        >
          <img
            src={imageData.src}
            alt="Preview"
            crossOrigin="anonymous"
            style={{
              // Apply crop by scaling and positioning the image
              // The image is scaled to show only the crop region
              position: 'absolute',
              width: `${100 / (imageData.crop.width / 100)}%`,
              height: `${100 / (imageData.crop.height / 100)}%`,
              left: `${-imageData.crop.x / (imageData.crop.width / 100)}%`,
              top: `${-imageData.crop.y / (imageData.crop.height / 100)}%`,
              // Apply additional zoom and offset on top of crop
              transform: `scale(${imageData.zoom}) translate(${imageData.offsetX}%, ${imageData.offsetY}%)`,
              transformOrigin: 'center center',
              filter: imageData.grayscale ? 'grayscale(100%)' : 'none',
            }}
          />
        </div>
      </div>

      {/* Controls - only show when active */}
      {isActive && (
        <div className="space-y-3">
          {/* Crop button */}
          <button
            type="button"
            onClick={() => setShowCropper(true)}
            className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold"
          >
            Open Cropper
          </button>

          {/* Zoom slider */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold">Zoom</label>
              <span className="text-xs text-muted-foreground">{imageData.zoom.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.05"
              value={imageData.zoom}
              onChange={handleZoomChange}
              className="w-full"
            />
          </div>

          {/* Position X slider */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold">Position X</label>
              <span className="text-xs text-muted-foreground">{imageData.offsetX.toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="-50"
              max="50"
              step="1"
              value={imageData.offsetX}
              onChange={handleOffsetXChange}
              className="w-full"
            />
          </div>

          {/* Position Y slider */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold">Position Y</label>
              <span className="text-xs text-muted-foreground">{imageData.offsetY.toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="-50"
              max="50"
              step="1"
              value={imageData.offsetY}
              onChange={handleOffsetYChange}
              className="w-full"
            />
          </div>

          {/* Grayscale toggle */}
          <label className="flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              checked={imageData.grayscale}
              onChange={handleGrayscaleToggle}
              className="h-3 w-3 accent-primary"
            />
            Grayscale filter
          </label>

          {/* Reset button */}
          <button
            type="button"
            onClick={handleReset}
            className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-xs"
          >
            Reset Image Settings
          </button>
        </div>
      )}

      {!isActive && (
        <button
          type="button"
          onClick={onActivate}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Click to edit image settings
        </button>
      )}
    </div>
  );
}

export default EditableImageFrame;
