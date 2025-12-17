import type { ReactNode } from 'react';

/**
 * Field types supported by the template schema
 */
export type FieldType = 'text' | 'textarea' | 'image' | 'link' | 'checkbox';

/**
 * Schema field definition - drives the form UI
 */
export interface FieldSchema {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  defaultValue?: string | boolean;
  required?: boolean;
  /** For image fields: max file size in bytes */
  maxSize?: number;
  /** For text/textarea: max character length */
  maxLength?: number;
  /** For image fields: aspect ratio hint (e.g., "1:1", "16:9") */
  aspectHint?: string;
  /**
   * For image fields: initial crop aspect ratio to match the target container.
   * This is only used to set the starting crop box; the user can freely adjust afterwards.
   */
  initialCropAspectRatio?: number;
  /**
   * For image fields: use the current stage aspect ratio as initial crop ratio.
   * Useful for full-bleed background images that fill the stage.
   */
  useStageAspectForInitialCrop?: boolean;
  /**
   * For image fields: default crop shape in the crop UI.
   * - "square": standard rectangular crop
   * - "circle": circular crop (forces 1:1 and outputs PNG with transparent corners)
   */
  defaultCropShape?: 'square' | 'circle';
}

/**
 * Image field data with crop/zoom/filter settings
 */
export interface ImageFieldData {
  /** Base64 data URL or object URL */
  src: string;
  /** Original file name */
  fileName?: string;
  /** Crop as percentage of image */
  crop: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  /** Zoom level (1 = 100%) */
  zoom: number;
  /** Apply grayscale filter */
  grayscale: boolean;
  /** Position offset within bounds (percentage) */
  offsetX: number;
  offsetY: number;
}

/**
 * Template data - values for all fields
 */
export type TemplateData = Record<string, string | boolean | ImageFieldData | undefined>;

/**
 * Props passed to template components
 */
export interface TemplateComponentProps {
  data: TemplateData;
  /** Width of the stage in pixels (for scaling calculations) */
  stageWidth: number;
  /** Height of the stage in pixels */
  stageHeight: number;
}

/**
 * Aspect ratio preset
 */
export interface AspectRatioPreset {
  id: string;
  label: string;
  width: number;
  height: number;
}

/**
 * Template definition
 */
export interface SocialTemplate {
  /** Unique template identifier */
  id: string;
  /** Display name */
  name: string;
  /** Description shown in UI */
  description?: string;
  /** React component that renders the template */
  Component: React.ComponentType<TemplateComponentProps>;
  /** Default aspect ratio for this template */
  defaultAspectRatio: AspectRatioPreset;
  /** Supported aspect ratios */
  supportedAspectRatios?: AspectRatioPreset[];
  /** Field schema - defines editable fields */
  schema: FieldSchema[];
  /** Default canvas width for export (pixels) */
  exportWidth?: number;
  /** Thumbnail preview (optional) */
  thumbnail?: string;
}

/**
 * Common aspect ratio presets
 */
export const ASPECT_RATIOS: AspectRatioPreset[] = [
  { id: '1:1', label: 'Square (1:1)', width: 1, height: 1 },
  { id: '4:5', label: 'Portrait (4:5)', width: 4, height: 5 },
  { id: '9:16', label: 'Story (9:16)', width: 9, height: 16 },
  { id: '16:9', label: 'Landscape (16:9)', width: 16, height: 9 },
  { id: '3:2', label: 'Classic (3:2)', width: 3, height: 2 },
  { id: '2:3', label: 'Tall (2:3)', width: 2, height: 3 },
];

/**
 * Helper to get aspect ratio value
 */
export function getAspectRatioValue(preset: AspectRatioPreset): number {
  return preset.width / preset.height;
}

/**
 * Helper to create default image field data
 */
export function createDefaultImageData(): ImageFieldData {
  return {
    src: '',
    crop: { x: 0, y: 0, width: 100, height: 100 },
    zoom: 1,
    grayscale: false,
    offsetX: 0,
    offsetY: 0,
  };
}
