import type { LocaleDefinition } from '../types';
import { fieldLabel, formatOptions } from './helpers';

export const ko: LocaleDefinition = {
  code: 'ko',
  dir: 'ltr',
  messages: {
    common: {
      required: (context) =>
        context.label ? `${context.label}은(는) 필수입니다` : '이 항목은 필수입니다',
      invalidType: (context) =>
        `${fieldLabel(context, '이 항목')}은(는) ${context.expected ?? '올바른 값'}이어야 합니다`,
      objectType: (context) =>
        `${fieldLabel(context, '이 항목')}은(는) 객체여야 합니다`,
      arrayType: (context) =>
        `${fieldLabel(context, '이 항목')}은(는) 배열이어야 합니다`,
      unknownKey: (context) =>
        `${fieldLabel(context, '이 항목')}은(는) 허용되지 않습니다`,
      custom: (context) =>
        `${fieldLabel(context, '이 항목')}이(가) 올바르지 않습니다`,
    },
    array: {
      min: (context) =>
        `${fieldLabel(context, '이 항목')}에는 최소 ${context.minimum}개 항목이 필요합니다`,
      max: (context) =>
        `${fieldLabel(context, '이 항목')}에는 최대 ${context.maximum}개 항목만 허용됩니다`,
    },
    string: {
      min: (context) =>
        `${fieldLabel(context, '이 항목')}은(는) 최소 ${context.minimum}자 이상이어야 합니다`,
      max: (context) =>
        `${fieldLabel(context, '이 항목')}은(는) 최대 ${context.maximum}자 이하여야 합니다`,
      email: (context) =>
        `${fieldLabel(context, '이 항목')}은(는) 올바른 이메일 주소여야 합니다`,
    },
    enum: {
      invalid: (context) =>
        `${fieldLabel(context, '이 항목')}은(는) 다음 값 중 하나여야 합니다: ${formatOptions(context)}`,
    },
    number: {
      min: (context) =>
        `${fieldLabel(context, '이 항목')}은(는) ${context.minimum} 이상이어야 합니다`,
      max: (context) =>
        `${fieldLabel(context, '이 항목')}은(는) ${context.maximum} 이하여야 합니다`,
      integer: (context) =>
        `${fieldLabel(context, '이 항목')}은(는) 정수여야 합니다`,
    },
  },
};
