import type { LocaleDefinition, MessageContext } from '../types';

function fieldLabel(context: MessageContext, fallback: string): string {
  return context.label ?? fallback;
}

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
      unknownKey: (context) =>
        `Hindi pinapayagan ang ${fieldLabel(context, 'field na ito')}`,
    },
    string: {
      min: (context) =>
        `${fieldLabel(context, 'Ang field na ito')} ay dapat may hindi bababa sa ${context.minimum} character`,
      max: (context) =>
        `${fieldLabel(context, 'Ang field na ito')} ay dapat may hindi hihigit sa ${context.maximum} character`,
      email: (context) =>
        `${fieldLabel(context, 'Ang field na ito')} ay dapat isang wastong email address`,
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
