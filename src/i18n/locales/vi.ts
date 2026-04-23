import type { LocaleDefinition } from '../types';
import { fieldLabel, formatOptions } from './helpers';

export const vi: LocaleDefinition = {
  code: 'vi',
  dir: 'ltr',
  messages: {
    common: {
      required: (context) =>
        context.label ? `${context.label} la bat buoc` : 'Truong nay la bat buoc',
      invalidType: (context) =>
        `${fieldLabel(context, 'Truong nay')} phai la ${context.expected ?? 'gia tri hop le'}`,
      objectType: (context) =>
        `${fieldLabel(context, 'Truong nay')} phai la mot doi tuong`,
      arrayType: (context) =>
        `${fieldLabel(context, 'Truong nay')} phai la mot danh sach`,
      unknownKey: (context) =>
        `${fieldLabel(context, 'Truong nay')} khong duoc phep`,
      custom: (context) =>
        `${fieldLabel(context, 'Truong nay')} khong hop le`,
    },
    array: {
      min: (context) =>
        `${fieldLabel(context, 'Truong nay')} phai co it nhat ${context.minimum} muc`,
      max: (context) =>
        `${fieldLabel(context, 'Truong nay')} chi duoc toi da ${context.maximum} muc`,
    },
    string: {
      min: (context) =>
        `${fieldLabel(context, 'Truong nay')} phai co it nhat ${context.minimum} ky tu`,
      max: (context) =>
        `${fieldLabel(context, 'Truong nay')} chi duoc toi da ${context.maximum} ky tu`,
      email: (context) =>
        `${fieldLabel(context, 'Truong nay')} phai la dia chi email hop le`,
    },
    enum: {
      invalid: (context) =>
        `${fieldLabel(context, 'Truong nay')} phai la mot trong cac gia tri sau: ${formatOptions(context)}`,
    },
    number: {
      min: (context) =>
        `${fieldLabel(context, 'Truong nay')} phai lon hon hoac bang ${context.minimum}`,
      max: (context) =>
        `${fieldLabel(context, 'Truong nay')} phai nho hon hoac bang ${context.maximum}`,
      integer: (context) =>
        `${fieldLabel(context, 'Truong nay')} phai la so nguyen`,
    },
  },
};
