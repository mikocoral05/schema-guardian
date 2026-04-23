import type { MessageContext } from '../types';

export function fieldLabel(context: MessageContext, fallback: string): string {
  return context.label ?? fallback;
}

export function formatOptions(context: MessageContext): string {
  const values = context.options ?? [];

  if (values.length === 0) {
    return '';
  }

  return values.map((value) => String(value)).join(', ');
}
