import { useCallback, useMemo, useState } from 'react';
import type { ImageFieldData } from '../social-templates';
import {
  ImageCrop,
  ImageCropApply,
  ImageCropContent,
  ImageCropReset,
} from '@/components/kibo-ui/image-crop';

interface EditableImageFrameProps {
  imageData: ImageFieldData;
  onUpdate: (settings: Partial<ImageFieldData>) => void;
  isActive: boolean;
  onActivate: () => void;
  /**
   * Initial crop aspect ratio (e.g. to match the container).
   * The user can freely adjust the crop ratio afterwards (unless circular crop is enabled).
   */
  initialCropAspect?: number;
  /** Default crop shape for the UI. */
  defaultCropShape?: 'square' | 'circle';
}

/**
 * Image editing component with crop, zoom, grayscale, and position controls
 */
export function EditableImageFrame({
  imageData,
  onUpdate,
  isActive,
  onActivate,
  initialCropAspect,
  defaultCropShape = 'square',
}: EditableImageFrameProps) {
  const [showCropper, setShowCropper] = useState(false);
  const [circularCrop, setCircularCrop] = useState(defaultCropShape === 'circle');

  const cropFile = useMemo(() => {
    if (!imageData.src) return null;

    // We expect data URLs (uploaded via FileReader or produced by canvas).
    // Convert to File so the Kibo ImageCrop component can read it.
    if (!imageData.src.startsWith('data:')) return null;

    const match = imageData.src.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) return null;

    const mimeType = match[1] || 'image/png';
    const base64 = match[2];

    try {
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const name = imageData.fileName || 'image.png';
      return new File([bytes], name, { type: mimeType });
    } catch {
      return null;
    }
  }, [imageData.src, imageData.fileName]);

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
            {!cropFile ? (
              <p className="text-sm text-muted-foreground">
                Cropper needs an uploaded image (data URL). Please re-upload the image.
              </p>
            ) : (
              <ImageCrop
                // Freeform ratio by default; circular crop forces 1:1.
                aspect={circularCrop ? 1 : undefined}
                // Initial crop box should match the target container ratio.
                initialAspect={circularCrop ? 1 : initialCropAspect}
                circularCrop={circularCrop}
                file={cropFile}
                maxImageSize={10 * 1024 * 1024}
                onCrop={(croppedSrc) => {
                  // After cropping, we store the cropped pixels in src and reset
                  // positioning/zoom so user controls behave predictably.
                  onUpdate({
                    src: croppedSrc,
                    crop: { x: 0, y: 0, width: 100, height: 100 },
                    zoom: 1,
                    offsetX: 0,
                    offsetY: 0,
                  });
                  setShowCropper(false);
                }}
              >
                <div className="max-h-[60vh] overflow-auto">
                  <ImageCropContent className="max-h-[60vh] max-w-full" />
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCircularCrop(false)}
                    className={[
                      'rounded-md border px-4 py-2 text-sm font-semibold',
                      !circularCrop ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border',
                    ].join(' ')}
                  >
                    Square
                  </button>
                  <button
                    type="button"
                    onClick={() => setCircularCrop(true)}
                    className={[
                      'rounded-md border px-4 py-2 text-sm font-semibold',
                      circularCrop ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border',
                    ].join(' ')}
                  >
                    Round
                  </button>
                  <ImageCropApply asChild>
                    <button
                      type="button"
                      className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                    >
                      Apply Crop
                    </button>
                  </ImageCropApply>
                  <ImageCropReset asChild>
                    <button
                      type="button"
                      className="rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold"
                    >
                      Reset
                    </button>
                  </ImageCropReset>
                  <button
                    type="button"
                    onClick={() => setShowCropper(false)}
                    className="rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </ImageCrop>
            )}
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
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `translate(${imageData.offsetX}%, ${imageData.offsetY}%) scale(${imageData.zoom})`,
              transformOrigin: '50% 50%',
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
