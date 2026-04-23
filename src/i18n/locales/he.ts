import type { LocaleDefinition } from '../types';
import { fieldLabel, formatOptions } from './helpers';

export const he: LocaleDefinition = {
  code: 'he',
  dir: 'rtl',
  messages: {
    common: {
      required: (context) =>
        context.label ? `${context.label} הוא שדה חובה` : 'שדה זה הוא חובה',
      invalidType: (context) =>
        `${fieldLabel(context, 'שדה זה')} חייב להיות ${context.expected ?? 'ערך תקין'}`,
      objectType: (context) =>
        `${fieldLabel(context, 'שדה זה')} חייב להיות אובייקט`,
      arrayType: (context) =>
        `${fieldLabel(context, 'שדה זה')} חייב להיות רשימה`,
      unknownKey: (context) =>
        `${fieldLabel(context, 'שדה זה')} אינו מותר`,
      custom: (context) =>
        `${fieldLabel(context, 'שדה זה')} אינו תקין`,
    },
    array: {
      min: (context) =>
        `${fieldLabel(context, 'שדה זה')} חייב להכיל לפחות ${context.minimum} פריטים`,
      max: (context) =>
        `${fieldLabel(context, 'שדה זה')} חייב להכיל לכל היותר ${context.maximum} פריטים`,
    },
    string: {
      min: (context) =>
        `${fieldLabel(context, 'שדה זה')} חייב להכיל לפחות ${context.minimum} תווים`,
      max: (context) =>
        `${fieldLabel(context, 'שדה זה')} חייב להכיל לכל היותר ${context.maximum} תווים`,
      email: (context) =>
        `${fieldLabel(context, 'שדה זה')} חייב להיות כתובת אימייל תקינה`,
    },
    enum: {
      invalid: (context) =>
        `${fieldLabel(context, 'שדה זה')} חייב להיות אחד מהבאים: ${formatOptions(context)}`,
    },
    number: {
      min: (context) =>
        `${fieldLabel(context, 'שדה זה')} חייב להיות גדול או שווה ל-${context.minimum}`,
      max: (context) =>
        `${fieldLabel(context, 'שדה זה')} חייב להיות קטן או שווה ל-${context.maximum}`,
      integer: (context) =>
        `${fieldLabel(context, 'שדה זה')} חייב להיות מספר שלם`,
    },
  },
};
