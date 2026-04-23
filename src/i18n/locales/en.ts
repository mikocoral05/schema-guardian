import type { LocaleDefinition } from '../types';
import { fieldLabel, formatOptions } from './helpers';

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
      arrayType: (context) =>
        `${fieldLabel(context, 'This field')} must be an array`,
      unknownKey: (context) =>
        `${fieldLabel(context, 'This field')} is not allowed`,
      custom: (context) =>
        `${fieldLabel(context, 'This field')} is invalid`,
    },
    array: {
      min: (context) =>
        `${fieldLabel(context, 'This field')} must contain at least ${context.minimum} items`,
      max: (context) =>
        `${fieldLabel(context, 'This field')} must contain at most ${context.maximum} items`,
    },
    string: {
      min: (context) =>
        `${fieldLabel(context, 'This field')} must be at least ${context.minimum} characters`,
      max: (context) =>
        `${fieldLabel(context, 'This field')} must be at most ${context.maximum} characters`,
      email: (context) =>
        `${fieldLabel(context, 'This field')} must be a valid email address`,
    },
    enum: {
      invalid: (context) =>
        `${fieldLabel(context, 'This field')} must be one of: ${formatOptions(context)}`,
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
