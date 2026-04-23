import type { LocaleDefinition } from '../types';
import { fieldLabel, formatOptions } from './helpers';

export const nl: LocaleDefinition = {
  code: 'nl',
  dir: 'ltr',
  messages: {
    common: {
      required: (context) =>
        context.label ? `${context.label} is verplicht` : 'Dit veld is verplicht',
      invalidType: (context) =>
        `${fieldLabel(context, 'Dit veld')} moet een ${context.expected ?? 'geldige waarde'} zijn`,
      objectType: (context) =>
        `${fieldLabel(context, 'Dit veld')} moet een object zijn`,
      arrayType: (context) =>
        `${fieldLabel(context, 'Dit veld')} moet een lijst zijn`,
      unknownKey: (context) =>
        `${fieldLabel(context, 'Dit veld')} is niet toegestaan`,
      custom: (context) =>
        `${fieldLabel(context, 'Dit veld')} is ongeldig`,
    },
    array: {
      min: (context) =>
        `${fieldLabel(context, 'Dit veld')} moet minstens ${context.minimum} items bevatten`,
      max: (context) =>
        `${fieldLabel(context, 'Dit veld')} mag maximaal ${context.maximum} items bevatten`,
    },
    string: {
      min: (context) =>
        `${fieldLabel(context, 'Dit veld')} moet minstens ${context.minimum} tekens bevatten`,
      max: (context) =>
        `${fieldLabel(context, 'Dit veld')} mag maximaal ${context.maximum} tekens bevatten`,
      email: (context) =>
        `${fieldLabel(context, 'Dit veld')} moet een geldig e-mailadres zijn`,
    },
    enum: {
      invalid: (context) =>
        `${fieldLabel(context, 'Dit veld')} moet een van de volgende waarden zijn: ${formatOptions(context)}`,
    },
    number: {
      min: (context) =>
        `${fieldLabel(context, 'Dit veld')} moet groter dan of gelijk aan ${context.minimum} zijn`,
      max: (context) =>
        `${fieldLabel(context, 'Dit veld')} moet kleiner dan of gelijk aan ${context.maximum} zijn`,
      integer: (context) =>
        `${fieldLabel(context, 'Dit veld')} moet een geheel getal zijn`,
    },
  },
};
