import type { LocaleDefinition } from '../types';
import { fieldLabel, formatOptions } from './helpers';

export const fr: LocaleDefinition = {
  code: 'fr',
  dir: 'ltr',
  messages: {
    common: {
      required: (context) =>
        context.label ? `${context.label} est requis` : 'Ce champ est requis',
      invalidType: (context) =>
        `${fieldLabel(context, 'Ce champ')} doit être de type ${context.expected ?? 'valide'}`,
      objectType: (context) =>
        `${fieldLabel(context, 'Ce champ')} doit être un objet`,
      arrayType: (context) =>
        `${fieldLabel(context, 'Ce champ')} doit être une liste`,
      unknownKey: (context) =>
        `${fieldLabel(context, 'Ce champ')} n'est pas autorisé`,
      custom: (context) =>
        `${fieldLabel(context, 'Ce champ')} est invalide`,
    },
    array: {
      min: (context) =>
        `${fieldLabel(context, 'Ce champ')} doit contenir au moins ${context.minimum} éléments`,
      max: (context) =>
        `${fieldLabel(context, 'Ce champ')} doit contenir au maximum ${context.maximum} éléments`,
    },
    string: {
      min: (context) =>
        `${fieldLabel(context, 'Ce champ')} doit contenir au moins ${context.minimum} caractères`,
      max: (context) =>
        `${fieldLabel(context, 'Ce champ')} doit contenir au maximum ${context.maximum} caractères`,
      email: (context) =>
        `${fieldLabel(context, 'Ce champ')} doit être une adresse e-mail valide`,
    },
    enum: {
      invalid: (context) =>
        `${fieldLabel(context, 'Ce champ')} doit être l'une des valeurs suivantes : ${formatOptions(context)}`,
    },
    number: {
      min: (context) =>
        `${fieldLabel(context, 'Ce champ')} doit être supérieur ou égal à ${context.minimum}`,
      max: (context) =>
        `${fieldLabel(context, 'Ce champ')} doit être inférieur ou égal à ${context.maximum}`,
      integer: (context) =>
        `${fieldLabel(context, 'Ce champ')} doit être un entier`,
    },
  },
};
