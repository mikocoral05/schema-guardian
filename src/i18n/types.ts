import type { EnumValue, PathSegment } from '../types';

export type TextDirection = 'ltr' | 'rtl';

export interface MessageContext {
  label?: string | undefined;
  path: readonly PathSegment[];
  expected?: string | undefined;
  received?: string | undefined;
  minimum?: number | undefined;
  maximum?: number | undefined;
  options?: readonly EnumValue[] | undefined;
}

export type MessageValue = string | ((context: MessageContext) => string);

export interface ValidationMessages {
  common: {
    required: MessageValue;
    invalidType: MessageValue;
    objectType: MessageValue;
    arrayType: MessageValue;
    unknownKey: MessageValue;
    custom: MessageValue;
  };
  array: {
    min: MessageValue;
    max: MessageValue;
  };
  string: {
    min: MessageValue;
    max: MessageValue;
    email: MessageValue;
  };
  enum: {
    invalid: MessageValue;
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
