import type { LocaleDefinition } from '../types';
import { fieldLabel, formatOptions } from './helpers';

export const ru: LocaleDefinition = {
  code: 'ru',
  dir: 'ltr',
  messages: {
    common: {
      required: (context) =>
        context.label ? `${context.label} обязательно` : 'Это поле обязательно',
      invalidType: (context) =>
        `${fieldLabel(context, 'Это поле')} должно быть ${context.expected ?? 'корректным значением'}`,
      objectType: (context) =>
        `${fieldLabel(context, 'Это поле')} должно быть объектом`,
      arrayType: (context) =>
        `${fieldLabel(context, 'Это поле')} должно быть списком`,
      unknownKey: (context) =>
        `${fieldLabel(context, 'Это поле')} не допускается`,
      custom: (context) =>
        `${fieldLabel(context, 'Это поле')} недействительно`,
    },
    array: {
      min: (context) =>
        `${fieldLabel(context, 'Это поле')} должно содержать не менее ${context.minimum} элементов`,
      max: (context) =>
        `${fieldLabel(context, 'Это поле')} должно содержать не более ${context.maximum} элементов`,
    },
    string: {
      min: (context) =>
        `${fieldLabel(context, 'Это поле')} должно содержать не менее ${context.minimum} символов`,
      max: (context) =>
        `${fieldLabel(context, 'Это поле')} должно содержать не более ${context.maximum} символов`,
      email: (context) =>
        `${fieldLabel(context, 'Это поле')} должно быть корректным адресом электронной почты`,
    },
    enum: {
      invalid: (context) =>
        `${fieldLabel(context, 'Это поле')} должно быть одним из следующих значений: ${formatOptions(context)}`,
    },
    number: {
      min: (context) =>
        `${fieldLabel(context, 'Это поле')} должно быть больше или равно ${context.minimum}`,
      max: (context) =>
        `${fieldLabel(context, 'Это поле')} должно быть меньше или равно ${context.maximum}`,
      integer: (context) =>
        `${fieldLabel(context, 'Это поле')} должно быть целым числом`,
    },
  },
};
