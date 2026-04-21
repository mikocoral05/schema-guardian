import type { LocaleDefinition, MessageContext } from '../types';

function fieldLabel(context: MessageContext, fallback: string): string {
  return context.label ?? fallback;
}

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
      unknownKey: (context) =>
        `${fieldLabel(context, 'この項目')}は許可されていません`,
    },
    string: {
      min: (context) =>
        `${fieldLabel(context, 'この項目')}は${context.minimum}文字以上で入力してください`,
      max: (context) =>
        `${fieldLabel(context, 'この項目')}は${context.maximum}文字以内で入力してください`,
      email: (context) =>
        `${fieldLabel(context, 'この項目')}は有効なメールアドレスで入力してください`,
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
