import type { LocaleDefinition, MessageContext } from '../types';

function fieldLabel(context: MessageContext, fallback: string): string {
  return context.label ?? fallback;
}

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
      unknownKey: (context) =>
        `${fieldLabel(context, 'هذا الحقل')} غير مسموح به`,
    },
    string: {
      min: (context) =>
        `${fieldLabel(context, 'هذا الحقل')} يجب أن يتكون من ${context.minimum} أحرف على الأقل`,
      max: (context) =>
        `${fieldLabel(context, 'هذا الحقل')} يجب ألا يزيد على ${context.maximum} أحرف`,
      email: (context) =>
        `${fieldLabel(context, 'هذا الحقل')} يجب أن يكون بريدا إلكترونيا صالحا`,
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
