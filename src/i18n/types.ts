import type { PathSegment } from '../types';

export type TextDirection = 'ltr' | 'rtl';

export interface MessageContext {
  label?: string | undefined;
  path: readonly PathSegment[];
  expected?: string | undefined;
  received?: string | undefined;
  minimum?: number | undefined;
  maximum?: number | undefined;
}

export type MessageValue = string | ((context: MessageContext) => string);

export interface ValidationMessages {
  common: {
    required: MessageValue;
    invalidType: MessageValue;
    objectType: MessageValue;
    unknownKey: MessageValue;
  };
  string: {
    min: MessageValue;
    max: MessageValue;
    email: MessageValue;
  };
  number: {
    min: MessageValue;
    max: MessageValue;
    integer: MessageValue;
  };
}

export interface LocaleDefinition {
  code: string;
  dir: TextDirection;
  aliases?: readonly string[] | undefined;
  messages: ValidationMessages;
}

export interface LocaleDetectionOptions {
  locale?: string;
  acceptLanguage?: string | readonly string[];
  browserLanguages?: readonly string[];
}

export interface ResolvedLocale {
  code: string;
  dir: TextDirection;
  locale: LocaleDefinition;
}
