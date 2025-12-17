/**
 * Social Media Templates Registry
 *
 * Add new templates by:
 * 1. Creating a new template file (e.g., MyTemplate.tsx)
 * 2. Exporting the SocialTemplate object from it
 * 3. Importing and adding it to the templates array below
 */

export * from './types';

import { ImAttendingTemplate } from './ImAttendingTemplate';
import { SpeakerAnnouncementTemplate } from './SpeakerAnnouncementTemplate';
import type { SocialTemplate } from './types';

/**
 * All available templates
 */
export const templates: SocialTemplate[] = [
  ImAttendingTemplate,
  SpeakerAnnouncementTemplate,
];

/**
 * Get a template by ID
 */
export function getTemplateById(id: string): SocialTemplate | undefined {
  return templates.find((t) => t.id === id);
}

/**
 * Get the default template
 */
export function getDefaultTemplate(): SocialTemplate {
  return templates[0];
}

// Re-export individual templates for direct imports
export { ImAttendingTemplate } from './ImAttendingTemplate';
export { SpeakerAnnouncementTemplate } from './SpeakerAnnouncementTemplate';
