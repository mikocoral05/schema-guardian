import type { LocaleDefinition } from '../types';
import { fieldLabel, formatOptions } from './helpers';

export const es: LocaleDefinition = {
  code: 'es',
  dir: 'ltr',
  messages: {
    common: {
      required: (context) =>
        context.label ? `${context.label} es obligatorio` : 'Este campo es obligatorio',
      invalidType: (context) =>
        `${fieldLabel(context, 'Este campo')} debe ser un ${context.expected ?? 'valor valido'}`,
      objectType: (context) =>
        `${fieldLabel(context, 'Este campo')} debe ser un objeto`,
      arrayType: (context) =>
        `${fieldLabel(context, 'Este campo')} debe ser una lista`,
      unknownKey: (context) =>
        `${fieldLabel(context, 'Este campo')} no esta permitido`,
      custom: (context) =>
        `${fieldLabel(context, 'Este campo')} no es valido`,
    },
    array: {
      min: (context) =>
        `${fieldLabel(context, 'Este campo')} debe contener al menos ${context.minimum} elementos`,
      max: (context) =>
        `${fieldLabel(context, 'Este campo')} debe contener como maximo ${context.maximum} elementos`,
    },
    string: {
      min: (context) =>
        `${fieldLabel(context, 'Este campo')} debe tener al menos ${context.minimum} caracteres`,
      max: (context) =>
        `${fieldLabel(context, 'Este campo')} debe tener como maximo ${context.maximum} caracteres`,
      email: (context) =>
        `${fieldLabel(context, 'Este campo')} debe ser un correo electronico valido`,
    },
    enum: {
      invalid: (context) =>
        `${fieldLabel(context, 'Este campo')} debe ser uno de los siguientes valores: ${formatOptions(context)}`,
    },
    number: {
      min: (context) =>
        `${fieldLabel(context, 'Este campo')} debe ser mayor o igual que ${context.minimum}`,
      max: (context) =>
        `${fieldLabel(context, 'Este campo')} debe ser menor o igual que ${context.maximum}`,
      integer: (context) =>
        `${fieldLabel(context, 'Este campo')} debe ser un numero entero`,
    },
  },
};
