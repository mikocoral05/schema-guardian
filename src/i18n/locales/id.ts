import type { LocaleDefinition } from '../types';
import { fieldLabel, formatOptions } from './helpers';

export const id: LocaleDefinition = {
  code: 'id',
  aliases: ['in'],
  dir: 'ltr',
  messages: {
    common: {
      required: (context) =>
        context.label ? `${context.label} wajib diisi` : 'Kolom ini wajib diisi',
      invalidType: (context) =>
        `${fieldLabel(context, 'Kolom ini')} harus berupa ${context.expected ?? 'nilai yang valid'}`,
      objectType: (context) =>
        `${fieldLabel(context, 'Kolom ini')} harus berupa objek`,
      arrayType: (context) =>
        `${fieldLabel(context, 'Kolom ini')} harus berupa daftar`,
      unknownKey: (context) =>
        `${fieldLabel(context, 'Kolom ini')} tidak diizinkan`,
      custom: (context) =>
        `${fieldLabel(context, 'Kolom ini')} tidak valid`,
    },
    array: {
      min: (context) =>
        `${fieldLabel(context, 'Kolom ini')} harus berisi minimal ${context.minimum} item`,
      max: (context) =>
        `${fieldLabel(context, 'Kolom ini')} harus berisi maksimal ${context.maximum} item`,
    },
    string: {
      min: (context) =>
        `${fieldLabel(context, 'Kolom ini')} harus memiliki minimal ${context.minimum} karakter`,
      max: (context) =>
        `${fieldLabel(context, 'Kolom ini')} harus memiliki maksimal ${context.maximum} karakter`,
      email: (context) =>
        `${fieldLabel(context, 'Kolom ini')} harus berupa alamat email yang valid`,
    },
    enum: {
      invalid: (context) =>
        `${fieldLabel(context, 'Kolom ini')} harus salah satu dari: ${formatOptions(context)}`,
    },
    number: {
      min: (context) =>
        `${fieldLabel(context, 'Kolom ini')} harus lebih besar atau sama dengan ${context.minimum}`,
      max: (context) =>
        `${fieldLabel(context, 'Kolom ini')} harus lebih kecil atau sama dengan ${context.maximum}`,
      integer: (context) =>
        `${fieldLabel(context, 'Kolom ini')} harus berupa bilangan bulat`,
    },
  },
};
