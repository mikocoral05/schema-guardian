import type { LocaleDefinition } from '../types';
import { fieldLabel, formatOptions } from './helpers';

export const it: LocaleDefinition = {
  code: 'it',
  dir: 'ltr',
  messages: {
    common: {
      required: (context) =>
        context.label ? `${context.label} e obbligatorio` : 'Questo campo e obbligatorio',
      invalidType: (context) =>
        `${fieldLabel(context, 'Questo campo')} deve essere un ${context.expected ?? 'valore valido'}`,
      objectType: (context) =>
        `${fieldLabel(context, 'Questo campo')} deve essere un oggetto`,
      arrayType: (context) =>
        `${fieldLabel(context, 'Questo campo')} deve essere una lista`,
      unknownKey: (context) =>
        `${fieldLabel(context, 'Questo campo')} non e consentito`,
      custom: (context) =>
        `${fieldLabel(context, 'Questo campo')} non e valido`,
    },
    array: {
      min: (context) =>
        `${fieldLabel(context, 'Questo campo')} deve contenere almeno ${context.minimum} elementi`,
      max: (context) =>
        `${fieldLabel(context, 'Questo campo')} deve contenere al massimo ${context.maximum} elementi`,
    },
    string: {
      min: (context) =>
        `${fieldLabel(context, 'Questo campo')} deve contenere almeno ${context.minimum} caratteri`,
      max: (context) =>
        `${fieldLabel(context, 'Questo campo')} deve contenere al massimo ${context.maximum} caratteri`,
      email: (context) =>
        `${fieldLabel(context, 'Questo campo')} deve essere un indirizzo email valido`,
    },
    enum: {
      invalid: (context) =>
        `${fieldLabel(context, 'Questo campo')} deve essere uno dei seguenti valori: ${formatOptions(context)}`,
    },
    number: {
      min: (context) =>
        `${fieldLabel(context, 'Questo campo')} deve essere maggiore o uguale a ${context.minimum}`,
      max: (context) =>
        `${fieldLabel(context, 'Questo campo')} deve essere minore o uguale a ${context.maximum}`,
      integer: (context) =>
        `${fieldLabel(context, 'Questo campo')} deve essere un numero intero`,
    },
  },
};
