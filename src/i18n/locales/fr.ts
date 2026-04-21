import type { LocaleDefinition, MessageContext } from '../types';

function fieldLabel(context: MessageContext, fallback: string): string {
  return context.label ?? fallback;
}

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
      unknownKey: (context) =>
        `${fieldLabel(context, 'Ce champ')} n'est pas autorisé`,
    },
    string: {
      min: (context) =>
        `${fieldLabel(context, 'Ce champ')} doit contenir au moins ${context.minimum} caractères`,
      max: (context) =>
        `${fieldLabel(context, 'Ce champ')} doit contenir au maximum ${context.maximum} caractères`,
      email: (context) =>
        `${fieldLabel(context, 'Ce champ')} doit être une adresse e-mail valide`,
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
