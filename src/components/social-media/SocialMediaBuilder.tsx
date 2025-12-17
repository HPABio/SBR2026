import { useState, useRef, useCallback, useEffect } from 'react';
import { toPng, toJpeg } from 'html-to-image';
import {
  templates,
  getTemplateById,
  getDefaultTemplate,
  ASPECT_RATIOS,
  getAspectRatioValue,
  createDefaultImageData,
  type SocialTemplate,
  type TemplateData,
  type AspectRatioPreset,
  type FieldSchema,
  type ImageFieldData,
} from '../social-templates';
import { EditableImageFrame } from './EditableImageFrame';

interface SocialMediaBuilderProps {
  /** Initial template ID */
  initialTemplateId?: string;
  /** Headless mode - no controls, just the stage (for server-side rendering) */
  headless?: boolean;
  /** Initial data for headless mode */
  initialData?: TemplateData;
}

/**
 * Main social media builder component
 */
export function SocialMediaBuilder({
  initialTemplateId,
  headless = false,
  initialData,
}: SocialMediaBuilderProps) {
  // Template selection
  const [selectedTemplate, setSelectedTemplate] = useState<SocialTemplate>(() =>
    initialTemplateId ? getTemplateById(initialTemplateId) || getDefaultTemplate() : getDefaultTemplate()
  );

  // Aspect ratio
  const [aspectRatio, setAspectRatio] = useState<AspectRatioPreset>(
    selectedTemplate.defaultAspectRatio
  );

  // Form data
  const [formData, setFormData] = useState<TemplateData>(() => {
    if (initialData) return initialData;
    return getDefaultFormData(selectedTemplate);
  });

  // Stage ref for export
  const stageRef = useRef<HTMLDivElement>(null);

  // Stage dimensions
  const [stageDimensions, setStageDimensions] = useState({ width: 400, height: 400 });

  // Export state
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState('');

  // Active image field for editing
  const [activeImageField, setActiveImageField] = useState<string | null>(null);

  // Update stage dimensions when aspect ratio changes
  useEffect(() => {
    const updateDimensions = () => {
      if (!stageRef.current) return;
      const container = stageRef.current.parentElement;
      if (!container) return;

      const containerWidth = container.clientWidth;
      const ratio = getAspectRatioValue(aspectRatio);
      const width = Math.min(containerWidth, 600);
      const height = width / ratio;

      setStageDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [aspectRatio]);

  // Handle template change
  const handleTemplateChange = useCallback((templateId: string) => {
    const template = getTemplateById(templateId);
    if (!template) return;

    setSelectedTemplate(template);
    setAspectRatio(template.defaultAspectRatio);
    setFormData(getDefaultFormData(template));
    setActiveImageField(null);
  }, []);

  // Handle aspect ratio change
  const handleAspectRatioChange = useCallback((ratioId: string) => {
    const ratio = ASPECT_RATIOS.find((r) => r.id === ratioId);
    if (ratio) setAspectRatio(ratio);
  }, []);

  // Handle form field change
  const handleFieldChange = useCallback((fieldId: string, value: string | boolean | ImageFieldData) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  }, []);

  // Handle image upload
  const handleImageUpload = useCallback(
    async (fieldId: string, file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        const imageData: ImageFieldData = {
          ...createDefaultImageData(),
          src,
          fileName: file.name,
        };
        handleFieldChange(fieldId, imageData);
        setActiveImageField(fieldId);
      };
      reader.readAsDataURL(file);
    },
    [handleFieldChange]
  );

  // Handle image settings update
  const handleImageSettingsUpdate = useCallback(
    (fieldId: string, settings: Partial<ImageFieldData>) => {
      setFormData((prev) => {
        const current = prev[fieldId] as ImageFieldData | undefined;
        if (!current) return prev;
        return {
          ...prev,
          [fieldId]: { ...current, ...settings },
        };
      });
    },
    []
  );

  // Export as PNG
  const handleExportPng = useCallback(async () => {
    if (!stageRef.current) return;

    setIsExporting(true);
    setExportStatus('Preparing export...');

    try {
      // Wait for fonts to load
      await document.fonts?.ready;

      const exportWidth = selectedTemplate.exportWidth || 1080;
      const exportHeight = exportWidth / getAspectRatioValue(aspectRatio);
      const pixelRatio = exportWidth / stageDimensions.width;

      setExportStatus('Rendering PNG...');

      const dataUrl = await toPng(stageRef.current, {
        cacheBust: true,
        pixelRatio,
        width: stageDimensions.width,
        height: stageDimensions.height,
        canvasWidth: exportWidth,
        canvasHeight: exportHeight,
      });

      // Download
      const link = document.createElement('a');
      link.download = `${selectedTemplate.id}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();

      setExportStatus('');
    } catch (error) {
      console.error('PNG export failed:', error);
      setExportStatus('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  }, [selectedTemplate, aspectRatio, stageDimensions]);

  // Export as JPEG
  const handleExportJpeg = useCallback(async () => {
    if (!stageRef.current) return;

    setIsExporting(true);
    setExportStatus('Preparing export...');

    try {
      await document.fonts?.ready;

      const exportWidth = selectedTemplate.exportWidth || 1080;
      const exportHeight = exportWidth / getAspectRatioValue(aspectRatio);
      const pixelRatio = exportWidth / stageDimensions.width;

      setExportStatus('Rendering JPEG...');

      const dataUrl = await toJpeg(stageRef.current, {
        cacheBust: true,
        pixelRatio,
        quality: 0.92,
        width: stageDimensions.width,
        height: stageDimensions.height,
        canvasWidth: exportWidth,
        canvasHeight: exportHeight,
        backgroundColor: '#000000',
      });

      const link = document.createElement('a');
      link.download = `${selectedTemplate.id}-${Date.now()}.jpg`;
      link.href = dataUrl;
      link.click();

      setExportStatus('');
    } catch (error) {
      console.error('JPEG export failed:', error);
      setExportStatus('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  }, [selectedTemplate, aspectRatio, stageDimensions]);

  // Reset form
  const handleReset = useCallback(() => {
    setFormData(getDefaultFormData(selectedTemplate));
    setActiveImageField(null);
    setExportStatus('');
  }, [selectedTemplate]);

  // Expose render function for headless mode
  useEffect(() => {
    if (!headless) return;

    (window as any).__renderSocialCard = async (payload: {
      templateId: string;
      data: TemplateData;
      format?: 'png' | 'jpeg';
      quality?: number;
    }) => {
      const template = getTemplateById(payload.templateId) || getDefaultTemplate();
      setSelectedTemplate(template);
      setFormData(payload.data);

      // Wait for render
      await new Promise((resolve) => setTimeout(resolve, 100));
      await document.fonts?.ready;

      if (!stageRef.current) throw new Error('Stage not available');

      const exportWidth = template.exportWidth || 1080;
      const ratio = getAspectRatioValue(template.defaultAspectRatio);
      const exportHeight = exportWidth / ratio;
      const pixelRatio = exportWidth / stageDimensions.width;

      if (payload.format === 'jpeg') {
        return toJpeg(stageRef.current, {
          cacheBust: true,
          pixelRatio,
          quality: payload.quality || 0.92,
          canvasWidth: exportWidth,
          canvasHeight: exportHeight,
          backgroundColor: '#000000',
        });
      }

      return toPng(stageRef.current, {
        cacheBust: true,
        pixelRatio,
        canvasWidth: exportWidth,
        canvasHeight: exportHeight,
      });
    };
  }, [headless, stageDimensions]);

  const TemplateComponent = selectedTemplate.Component;

  // Headless mode - just render the stage
  if (headless) {
    return (
      <div
        ref={stageRef}
        id="social-card-stage"
        style={{
          width: stageDimensions.width,
          height: stageDimensions.height,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <TemplateComponent
          data={formData}
          stageWidth={stageDimensions.width}
          stageHeight={stageDimensions.height}
        />
      </div>
    );
  }

  // Full builder UI
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* Controls Panel */}
      <div className="rounded-xl border border-border bg-background/40 p-5">
        <h3 className="text-xl font-bold font-anton uppercase">Social Media Post Generator</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Select a template, customize the content, and export your image.
        </p>

        <div className="mt-5 space-y-4">
          {/* Template Selector */}
          <div className="space-y-2">
            <label className="text-sm font-semibold" htmlFor="template-select">
              Template
            </label>
            <select
              id="template-select"
              value={selectedTemplate.id}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className="block w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
            {selectedTemplate.description && (
              <p className="text-xs text-muted-foreground">{selectedTemplate.description}</p>
            )}
          </div>

          {/* Aspect Ratio Selector */}
          <div className="space-y-2">
            <label className="text-sm font-semibold" htmlFor="aspect-ratio-select">
              Aspect Ratio
            </label>
            <select
              id="aspect-ratio-select"
              value={aspectRatio.id}
              onChange={(e) => handleAspectRatioChange(e.target.value)}
              className="block w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              {(selectedTemplate.supportedAspectRatios || ASPECT_RATIOS).map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          {/* Dynamic Form Fields */}
          {selectedTemplate.schema.map((field) => (
            <FieldInput
              key={field.id}
              field={field}
              value={formData[field.id]}
              onChange={(value) => handleFieldChange(field.id, value)}
              onImageUpload={(file) => handleImageUpload(field.id, file)}
              onImageSettingsUpdate={(settings) => handleImageSettingsUpdate(field.id, settings)}
              isActiveImage={activeImageField === field.id}
              onActivateImage={() => setActiveImageField(field.id)}
            />
          ))}

          {/* Export Buttons */}
          <div className="flex flex-wrap gap-3 pt-4">
            <button
              type="button"
              onClick={handleExportPng}
              disabled={isExporting}
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
            >
              {isExporting ? 'Exporting...' : 'Download PNG'}
            </button>
            <button
              type="button"
              onClick={handleExportJpeg}
              disabled={isExporting}
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
            >
              {isExporting ? 'Exporting...' : 'Download JPEG'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={isExporting}
              className="rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold"
            >
              Reset
            </button>
          </div>

          {exportStatus && <p className="text-xs text-muted-foreground">{exportStatus}</p>}
        </div>
      </div>

      {/* Preview Panel */}
      <div className="rounded-xl border border-border bg-background/40 p-5">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-xl font-bold font-anton uppercase">Preview</h3>
          <div className="text-xs text-muted-foreground">
            {stageDimensions.width}×{Math.round(stageDimensions.height)}px preview
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-lg border border-border bg-black/20">
          <div
            ref={stageRef}
            id="social-card-stage"
            style={{
              width: stageDimensions.width,
              height: stageDimensions.height,
              position: 'relative',
              overflow: 'hidden',
              margin: '0 auto',
            }}
          >
            <TemplateComponent
              data={formData}
              stageWidth={stageDimensions.width}
              stageHeight={stageDimensions.height}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Get default form data for a template
 */
function getDefaultFormData(template: SocialTemplate): TemplateData {
  const data: TemplateData = {};
  for (const field of template.schema) {
    if (field.type === 'image') {
      data[field.id] = createDefaultImageData();
    } else if (field.type === 'checkbox') {
      data[field.id] = field.defaultValue ?? false;
    } else {
      data[field.id] = (field.defaultValue as string) ?? '';
    }
  }
  return data;
}

/**
 * Dynamic field input component
 */
interface FieldInputProps {
  field: FieldSchema;
  value: string | boolean | ImageFieldData | undefined;
  onChange: (value: string | boolean | ImageFieldData) => void;
  onImageUpload: (file: File) => void;
  onImageSettingsUpdate: (settings: Partial<ImageFieldData>) => void;
  isActiveImage: boolean;
  onActivateImage: () => void;
}

function FieldInput({
  field,
  value,
  onChange,
  onImageUpload,
  onImageSettingsUpdate,
  isActiveImage,
  onActivateImage,
}: FieldInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  if (field.type === 'checkbox') {
    return (
      <label className="inline-flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 accent-primary"
        />
        {field.label}
      </label>
    );
  }

  if (field.type === 'image') {
    const imageData = value as ImageFieldData | undefined;

    return (
      <div className="space-y-2">
        <label className="text-sm font-semibold">{field.label}</label>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onImageUpload(file);
          }}
          className="block w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
        {field.aspectHint && (
          <p className="text-xs text-muted-foreground">Recommended aspect: {field.aspectHint}</p>
        )}

        {/* Image editing controls */}
        {imageData?.src && (
          <EditableImageFrame
            imageData={imageData}
            onUpdate={onImageSettingsUpdate}
            isActive={isActiveImage}
            onActivate={onActivateImage}
          />
        )}
      </div>
    );
  }

  if (field.type === 'textarea') {
    return (
      <div className="space-y-2">
        <label className="text-sm font-semibold" htmlFor={field.id}>
          {field.label}
        </label>
        <textarea
          id={field.id}
          value={(value as string) || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          maxLength={field.maxLength}
          rows={4}
          className="block w-full resize-y rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
      </div>
    );
  }

  // text, link
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold" htmlFor={field.id}>
        {field.label}
      </label>
      <input
        id={field.id}
        type={field.type === 'link' ? 'url' : 'text'}
        value={(value as string) || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        maxLength={field.maxLength}
        className="block w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
      />
    </div>
  );
}

export default SocialMediaBuilder;
