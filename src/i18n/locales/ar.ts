import type { LocaleDefinition } from '../types';
import { fieldLabel, formatOptions } from './helpers';

export const ar: LocaleDefinition = {
  code: 'ar',
  dir: 'rtl',
  messages: {
    common: {
      required: (context) =>
        context.label ? `${context.label} مطلوب` : 'هذا الحقل مطلوب',
      invalidType: (context) =>
        `${fieldLabel(context, 'هذا الحقل')} يجب أن يكون ${context.expected ?? 'قيمة صالحة'}`,
      objectType: (context) =>
        `${fieldLabel(context, 'هذا الحقل')} يجب أن يكون كائنا`,
      arrayType: (context) =>
        `${fieldLabel(context, 'هذا الحقل')} يجب أن يكون قائمة`,
      unknownKey: (context) =>
        `${fieldLabel(context, 'هذا الحقل')} غير مسموح به`,
      custom: (context) =>
        `${fieldLabel(context, 'هذا الحقل')} غير صالح`,
    },
    array: {
      min: (context) =>
        `${fieldLabel(context, 'هذا الحقل')} يجب أن يحتوي على ${context.minimum} عناصر على الأقل`,
      max: (context) =>
        `${fieldLabel(context, 'هذا الحقل')} يجب ألا يحتوي على أكثر من ${context.maximum} عناصر`,
    },
    string: {
      min: (context) =>
        `${fieldLabel(context, 'هذا الحقل')} يجب أن يتكون من ${context.minimum} أحرف على الأقل`,
      max: (context) =>
        `${fieldLabel(context, 'هذا الحقل')} يجب ألا يزيد على ${context.maximum} أحرف`,
      email: (context) =>
        `${fieldLabel(context, 'هذا الحقل')} يجب أن يكون بريدا إلكترونيا صالحا`,
    },
    enum: {
      invalid: (context) =>
        `${fieldLabel(context, 'هذا الحقل')} يجب أن يكون واحدا من: ${formatOptions(context)}`,
    },
    number: {
      min: (context) =>
        `${fieldLabel(context, 'هذا الحقل')} يجب أن يكون أكبر من أو يساوي ${context.minimum}`,
      max: (context) =>
        `${fieldLabel(context, 'هذا الحقل')} يجب أن يكون أقل من أو يساوي ${context.maximum}`,
      integer: (context) =>
        `${fieldLabel(context, 'هذا الحقل')} يجب أن يكون عددا صحيحا`,
    },
  },
};
