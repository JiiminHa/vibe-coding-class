import type { Template } from '@/types/template';

const STORAGE_KEY = 'cardflow_templates';

export function loadTemplates(): Template[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Template[]) : [];
  } catch {
    return [];
  }
}

export function saveTemplates(templates: Template[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
}
