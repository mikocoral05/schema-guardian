import type { LocaleDefinition } from '../types';
import { fieldLabel, formatOptions } from './helpers';

export const tl: LocaleDefinition = {
  code: 'tl',
  aliases: ['fil'],
  dir: 'ltr',
  messages: {
    common: {
      required: (context) =>
        context.label ? `Kinakailangan ang ${context.label}` : 'Kinakailangan ang field na ito',
      invalidType: (context) =>
        `${fieldLabel(context, 'Ang field na ito')} ay dapat isang ${context.expected ?? 'wastong halaga'}`,
      objectType: (context) =>
        `${fieldLabel(context, 'Ang field na ito')} ay dapat isang object`,
      arrayType: (context) =>
        `${fieldLabel(context, 'Ang field na ito')} ay dapat isang listahan`,
      unknownKey: (context) =>
        `Hindi pinapayagan ang ${fieldLabel(context, 'field na ito')}`,
      custom: (context) =>
        `${fieldLabel(context, 'Ang field na ito')} ay hindi wasto`,
    },
    array: {
      min: (context) =>
        `${fieldLabel(context, 'Ang field na ito')} ay dapat may hindi bababa sa ${context.minimum} item`,
      max: (context) =>
        `${fieldLabel(context, 'Ang field na ito')} ay dapat may hindi hihigit sa ${context.maximum} item`,
    },
    string: {
      min: (context) =>
        `${fieldLabel(context, 'Ang field na ito')} ay dapat may hindi bababa sa ${context.minimum} character`,
      max: (context) =>
        `${fieldLabel(context, 'Ang field na ito')} ay dapat may hindi hihigit sa ${context.maximum} character`,
      email: (context) =>
        `${fieldLabel(context, 'Ang field na ito')} ay dapat isang wastong email address`,
    },
    enum: {
      invalid: (context) =>
        `${fieldLabel(context, 'Ang field na ito')} ay dapat isa sa mga sumusunod: ${formatOptions(context)}`,
    },
    number: {
      min: (context) =>
        `${fieldLabel(context, 'Ang field na ito')} ay dapat mas malaki o katumbas ng ${context.minimum}`,
      max: (context) =>
        `${fieldLabel(context, 'Ang field na ito')} ay dapat mas maliit o katumbas ng ${context.maximum}`,
      integer: (context) =>
        `${fieldLabel(context, 'Ang field na ito')} ay dapat isang buong numero`,
    },
  },
};
