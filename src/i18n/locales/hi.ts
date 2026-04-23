import type { LocaleDefinition } from '../types';
import { fieldLabel, formatOptions } from './helpers';

export const hi: LocaleDefinition = {
  code: 'hi',
  dir: 'ltr',
  messages: {
    common: {
      required: (context) =>
        context.label ? `${context.label} आवश्यक है` : 'यह फ़ील्ड आवश्यक है',
      invalidType: (context) =>
        `${fieldLabel(context, 'यह फ़ील्ड')} को ${context.expected ?? 'सही मान'} होना चाहिए`,
      objectType: (context) =>
        `${fieldLabel(context, 'यह फ़ील्ड')} एक ऑब्जेक्ट होना चाहिए`,
      arrayType: (context) =>
        `${fieldLabel(context, 'यह फ़ील्ड')} एक सूची होनी चाहिए`,
      unknownKey: (context) =>
        `${fieldLabel(context, 'यह फ़ील्ड')} की अनुमति नहीं है`,
      custom: (context) =>
        `${fieldLabel(context, 'यह फ़ील्ड')} मान्य नहीं है`,
    },
    array: {
      min: (context) =>
        `${fieldLabel(context, 'यह फ़ील्ड')} में कम से कम ${context.minimum} आइटम होने चाहिए`,
      max: (context) =>
        `${fieldLabel(context, 'यह फ़ील्ड')} में अधिकतम ${context.maximum} आइटम होने चाहिए`,
    },
    string: {
      min: (context) =>
        `${fieldLabel(context, 'यह फ़ील्ड')} कम से कम ${context.minimum} अक्षरों का होना चाहिए`,
      max: (context) =>
        `${fieldLabel(context, 'यह फ़ील्ड')} अधिकतम ${context.maximum} अक्षरों का होना चाहिए`,
      email: (context) =>
        `${fieldLabel(context, 'यह फ़ील्ड')} एक मान्य ईमेल पता होना चाहिए`,
    },
    enum: {
      invalid: (context) =>
        `${fieldLabel(context, 'यह फ़ील्ड')} इन मानों में से एक होना चाहिए: ${formatOptions(context)}`,
    },
    number: {
      min: (context) =>
        `${fieldLabel(context, 'यह फ़ील्ड')} ${context.minimum} से बड़ा या बराबर होना चाहिए`,
      max: (context) =>
        `${fieldLabel(context, 'यह फ़ील्ड')} ${context.maximum} से छोटा या बराबर होना चाहिए`,
      integer: (context) =>
        `${fieldLabel(context, 'यह फ़ील्ड')} पूर्णांक होना चाहिए`,
    },
  },
};
