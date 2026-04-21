import type { LocaleDefinition, MessageContext } from '../types';

function fieldLabel(context: MessageContext, fallback: string): string {
  return context.label ?? fallback;
}

export const en: LocaleDefinition = {
  code: 'en',
  dir: 'ltr',
  messages: {
    common: {
      required: (context) =>
        context.label ? `${context.label} is required` : 'This field is required',
      invalidType: (context) =>
        `${fieldLabel(context, 'This field')} must be a ${context.expected ?? 'valid value'}`,
      objectType: (context) =>
        `${fieldLabel(context, 'This field')} must be an object`,
      unknownKey: (context) =>
        `${fieldLabel(context, 'This field')} is not allowed`,
    },
    string: {
      min: (context) =>
        `${fieldLabel(context, 'This field')} must be at least ${context.minimum} characters`,
      max: (context) =>
        `${fieldLabel(context, 'This field')} must be at most ${context.maximum} characters`,
      email: (context) =>
        `${fieldLabel(context, 'This field')} must be a valid email address`,
    },
    number: {
      min: (context) =>
        `${fieldLabel(context, 'This field')} must be greater than or equal to ${context.minimum}`,
      max: (context) =>
        `${fieldLabel(context, 'This field')} must be less than or equal to ${context.maximum}`,
      integer: (context) =>
        `${fieldLabel(context, 'This field')} must be a whole number`,
    },
  },
};
