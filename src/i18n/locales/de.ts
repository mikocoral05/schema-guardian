import type { LocaleDefinition } from '../types';
import { fieldLabel, formatOptions } from './helpers';

export const de: LocaleDefinition = {
  code: 'de',
  dir: 'ltr',
  messages: {
    common: {
      required: (context) =>
        context.label ? `${context.label} ist erforderlich` : 'Dieses Feld ist erforderlich',
      invalidType: (context) =>
        `${fieldLabel(context, 'Dieses Feld')} muss ein ${context.expected ?? 'gueltiger Wert'} sein`,
      objectType: (context) =>
        `${fieldLabel(context, 'Dieses Feld')} muss ein Objekt sein`,
      arrayType: (context) =>
        `${fieldLabel(context, 'Dieses Feld')} muss eine Liste sein`,
      unknownKey: (context) =>
        `${fieldLabel(context, 'Dieses Feld')} ist nicht erlaubt`,
      custom: (context) =>
        `${fieldLabel(context, 'Dieses Feld')} ist ungueltig`,
    },
    array: {
      min: (context) =>
        `${fieldLabel(context, 'Dieses Feld')} muss mindestens ${context.minimum} Eintraege enthalten`,
      max: (context) =>
        `${fieldLabel(context, 'Dieses Feld')} darf hoechstens ${context.maximum} Eintraege enthalten`,
    },
    string: {
      min: (context) =>
        `${fieldLabel(context, 'Dieses Feld')} muss mindestens ${context.minimum} Zeichen haben`,
      max: (context) =>
        `${fieldLabel(context, 'Dieses Feld')} darf hoechstens ${context.maximum} Zeichen haben`,
      email: (context) =>
        `${fieldLabel(context, 'Dieses Feld')} muss eine gueltige E-Mail-Adresse sein`,
    },
    enum: {
      invalid: (context) =>
        `${fieldLabel(context, 'Dieses Feld')} muss einer der folgenden Werte sein: ${formatOptions(context)}`,
    },
    number: {
      min: (context) =>
        `${fieldLabel(context, 'Dieses Feld')} muss groesser oder gleich ${context.minimum} sein`,
      max: (context) =>
        `${fieldLabel(context, 'Dieses Feld')} muss kleiner oder gleich ${context.maximum} sein`,
      integer: (context) =>
        `${fieldLabel(context, 'Dieses Feld')} muss eine ganze Zahl sein`,
    },
  },
};
