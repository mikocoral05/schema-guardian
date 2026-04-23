import type { LocaleDefinition } from '../types';
import { fieldLabel, formatOptions } from './helpers';

export const zhCN: LocaleDefinition = {
  code: 'zh-CN',
  dir: 'ltr',
  messages: {
    common: {
      required: (context) =>
        context.label ? `${context.label}为必填项` : '此字段为必填项',
      invalidType: (context) =>
        `${fieldLabel(context, '此字段')}必须为${context.expected ?? '有效值'}`,
      objectType: (context) =>
        `${fieldLabel(context, '此字段')}必须为对象`,
      arrayType: (context) =>
        `${fieldLabel(context, '此字段')}必须为数组`,
      unknownKey: (context) =>
        `${fieldLabel(context, '此字段')}不被允许`,
      custom: (context) =>
        `${fieldLabel(context, '此字段')}无效`,
    },
    array: {
      min: (context) =>
        `${fieldLabel(context, '此字段')}至少需要包含${context.minimum}项`,
      max: (context) =>
        `${fieldLabel(context, '此字段')}最多只能包含${context.maximum}项`,
    },
    string: {
      min: (context) =>
        `${fieldLabel(context, '此字段')}至少需要${context.minimum}个字符`,
      max: (context) =>
        `${fieldLabel(context, '此字段')}最多只能有${context.maximum}个字符`,
      email: (context) =>
        `${fieldLabel(context, '此字段')}必须是有效的电子邮箱地址`,
    },
    enum: {
      invalid: (context) =>
        `${fieldLabel(context, '此字段')}必须是以下值之一：${formatOptions(context)}`,
    },
    number: {
      min: (context) =>
        `${fieldLabel(context, '此字段')}必须大于或等于${context.minimum}`,
      max: (context) =>
        `${fieldLabel(context, '此字段')}必须小于或等于${context.maximum}`,
      integer: (context) =>
        `${fieldLabel(context, '此字段')}必须是整数`,
    },
  },
};
