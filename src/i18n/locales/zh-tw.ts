import type { LocaleDefinition } from '../types';
import { fieldLabel, formatOptions } from './helpers';

export const zhTW: LocaleDefinition = {
  code: 'zh-TW',
  dir: 'ltr',
  messages: {
    common: {
      required: (context) =>
        context.label ? `${context.label}為必填項` : '此欄位為必填項',
      invalidType: (context) =>
        `${fieldLabel(context, '此欄位')}必須為${context.expected ?? '有效值'}`,
      objectType: (context) =>
        `${fieldLabel(context, '此欄位')}必須為物件`,
      arrayType: (context) =>
        `${fieldLabel(context, '此欄位')}必須為陣列`,
      unknownKey: (context) =>
        `${fieldLabel(context, '此欄位')}不被允許`,
      custom: (context) =>
        `${fieldLabel(context, '此欄位')}無效`,
    },
    array: {
      min: (context) =>
        `${fieldLabel(context, '此欄位')}至少需要包含${context.minimum}項`,
      max: (context) =>
        `${fieldLabel(context, '此欄位')}最多只能包含${context.maximum}項`,
    },
    string: {
      min: (context) =>
        `${fieldLabel(context, '此欄位')}至少需要${context.minimum}個字元`,
      max: (context) =>
        `${fieldLabel(context, '此欄位')}最多只能有${context.maximum}個字元`,
      email: (context) =>
        `${fieldLabel(context, '此欄位')}必須是有效的電子郵件地址`,
    },
    enum: {
      invalid: (context) =>
        `${fieldLabel(context, '此欄位')}必須是以下值之一：${formatOptions(context)}`,
    },
    number: {
      min: (context) =>
        `${fieldLabel(context, '此欄位')}必須大於或等於${context.minimum}`,
      max: (context) =>
        `${fieldLabel(context, '此欄位')}必須小於或等於${context.maximum}`,
      integer: (context) =>
        `${fieldLabel(context, '此欄位')}必須是整數`,
    },
  },
};
