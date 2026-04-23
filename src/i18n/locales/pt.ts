import type { LocaleDefinition } from '../types';
import { fieldLabel, formatOptions } from './helpers';

export const pt: LocaleDefinition = {
  code: 'pt',
  aliases: ['pt-br', 'pt-pt'],
  dir: 'ltr',
  messages: {
    common: {
      required: (context) =>
        context.label ? `${context.label} e obrigatorio` : 'Este campo e obrigatorio',
      invalidType: (context) =>
        `${fieldLabel(context, 'Este campo')} deve ser um ${context.expected ?? 'valor valido'}`,
      objectType: (context) =>
        `${fieldLabel(context, 'Este campo')} deve ser um objeto`,
      arrayType: (context) =>
        `${fieldLabel(context, 'Este campo')} deve ser uma lista`,
      unknownKey: (context) =>
        `${fieldLabel(context, 'Este campo')} nao e permitido`,
      custom: (context) =>
        `${fieldLabel(context, 'Este campo')} nao e valido`,
    },
    array: {
      min: (context) =>
        `${fieldLabel(context, 'Este campo')} deve conter pelo menos ${context.minimum} itens`,
      max: (context) =>
        `${fieldLabel(context, 'Este campo')} deve conter no maximo ${context.maximum} itens`,
    },
    string: {
      min: (context) =>
        `${fieldLabel(context, 'Este campo')} deve ter pelo menos ${context.minimum} caracteres`,
      max: (context) =>
        `${fieldLabel(context, 'Este campo')} deve ter no maximo ${context.maximum} caracteres`,
      email: (context) =>
        `${fieldLabel(context, 'Este campo')} deve ser um endereco de email valido`,
    },
    enum: {
      invalid: (context) =>
        `${fieldLabel(context, 'Este campo')} deve ser um dos seguintes valores: ${formatOptions(context)}`,
    },
    number: {
      min: (context) =>
        `${fieldLabel(context, 'Este campo')} deve ser maior ou igual a ${context.minimum}`,
      max: (context) =>
        `${fieldLabel(context, 'Este campo')} deve ser menor ou igual a ${context.maximum}`,
      integer: (context) =>
        `${fieldLabel(context, 'Este campo')} deve ser um numero inteiro`,
    },
  },
};
