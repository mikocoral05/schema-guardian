import type { LocaleDefinition } from '../types';
import { fieldLabel, formatOptions } from './helpers';

export const tr: LocaleDefinition = {
  code: 'tr',
  dir: 'ltr',
  messages: {
    common: {
      required: (context) =>
        context.label ? `${context.label} zorunludur` : 'Bu alan zorunludur',
      invalidType: (context) =>
        `${fieldLabel(context, 'Bu alan')} ${context.expected ?? 'gecerli bir deger'} olmalidir`,
      objectType: (context) =>
        `${fieldLabel(context, 'Bu alan')} bir nesne olmalidir`,
      arrayType: (context) =>
        `${fieldLabel(context, 'Bu alan')} bir liste olmalidir`,
      unknownKey: (context) =>
        `${fieldLabel(context, 'Bu alan')} izin verilmiyor`,
      custom: (context) =>
        `${fieldLabel(context, 'Bu alan')} gecersiz`,
    },
    array: {
      min: (context) =>
        `${fieldLabel(context, 'Bu alan')} en az ${context.minimum} oge icermelidir`,
      max: (context) =>
        `${fieldLabel(context, 'Bu alan')} en fazla ${context.maximum} oge icermelidir`,
    },
    string: {
      min: (context) =>
        `${fieldLabel(context, 'Bu alan')} en az ${context.minimum} karakter olmalidir`,
      max: (context) =>
        `${fieldLabel(context, 'Bu alan')} en fazla ${context.maximum} karakter olmalidir`,
      email: (context) =>
        `${fieldLabel(context, 'Bu alan')} gecerli bir e-posta adresi olmalidir`,
    },
    enum: {
      invalid: (context) =>
        `${fieldLabel(context, 'Bu alan')} su degerlerden biri olmalidir: ${formatOptions(context)}`,
    },
    number: {
      min: (context) =>
        `${fieldLabel(context, 'Bu alan')} ${context.minimum} degerinden buyuk veya esit olmalidir`,
      max: (context) =>
        `${fieldLabel(context, 'Bu alan')} ${context.maximum} degerinden kucuk veya esit olmalidir`,
      integer: (context) =>
        `${fieldLabel(context, 'Bu alan')} tam sayi olmalidir`,
    },
  },
};
