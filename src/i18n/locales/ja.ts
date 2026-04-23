import type { LocaleDefinition } from '../types';
import { fieldLabel, formatOptions } from './helpers';

export const ja: LocaleDefinition = {
  code: 'ja',
  dir: 'ltr',
  messages: {
    common: {
      required: (context) =>
        context.label ? `${context.label}は必須です` : 'この項目は必須です',
      invalidType: (context) =>
        `${fieldLabel(context, 'この項目')}は${context.expected ?? '正しい値'}で入力してください`,
      objectType: (context) =>
        `${fieldLabel(context, 'この項目')}はオブジェクトである必要があります`,
      arrayType: (context) =>
        `${fieldLabel(context, 'この項目')}は配列である必要があります`,
      unknownKey: (context) =>
        `${fieldLabel(context, 'この項目')}は許可されていません`,
      custom: (context) =>
        `${fieldLabel(context, 'この項目')}の値が正しくありません`,
    },
    array: {
      min: (context) =>
        `${fieldLabel(context, 'この項目')}は少なくとも${context.minimum}件必要です`,
      max: (context) =>
        `${fieldLabel(context, 'この項目')}は${context.maximum}件以内で入力してください`,
    },
    string: {
      min: (context) =>
        `${fieldLabel(context, 'この項目')}は${context.minimum}文字以上で入力してください`,
      max: (context) =>
        `${fieldLabel(context, 'この項目')}は${context.maximum}文字以内で入力してください`,
      email: (context) =>
        `${fieldLabel(context, 'この項目')}は有効なメールアドレスで入力してください`,
    },
    enum: {
      invalid: (context) =>
        `${fieldLabel(context, 'この項目')}は次のいずれかで入力してください: ${formatOptions(context)}`,
    },
    number: {
      min: (context) =>
        `${fieldLabel(context, 'この項目')}は${context.minimum}以上である必要があります`,
      max: (context) =>
        `${fieldLabel(context, 'この項目')}は${context.maximum}以下である必要があります`,
      integer: (context) =>
        `${fieldLabel(context, 'この項目')}は整数である必要があります`,
    },
  },
};
