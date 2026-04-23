import type { Schema } from './core/schema';
import type { ValidationError } from './core/error';
import type { LocaleDetectionOptions } from './i18n/types';

export type PathSegment = string | number;
export type EnumValue = string | number | boolean;

export type ValidationIssueCode =
  | 'required'
  | 'invalid_type'
  | 'invalid_object'
  | 'too_small'
  | 'too_big'
  | 'invalid_email'
  | 'not_integer'
  | 'unknown_key'
  | 'invalid_enum_value'
  | 'custom';

export interface ValidationIssue {
  code: ValidationIssueCode;
  path: PathSegment[];
  message: string;
  label?: string | undefined;
  expected?: string | undefined;
  received?: string | undefined;
  minimum?: number | undefined;
  maximum?: number | undefined;
  options?: readonly EnumValue[] | undefined;
}

export interface ParseOptions extends LocaleDetectionOptions {}

export interface ParseSuccess<T> {
  success: true;
  data: T;
}

export interface ParseError {
  success: false;
  error: ValidationError;
}

export interface FlattenedValidationErrors {
  formErrors: string[];
  fieldErrors: Record<string, string[]>;
}

export type SafeParseResult<T> = ParseSuccess<T> | ParseError;
export type Infer<TSchema extends Schema<unknown, unknown>> =
  TSchema extends Schema<infer TOutput, unknown> ? TOutput : never;
