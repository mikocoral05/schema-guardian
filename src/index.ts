import { ArraySchema } from './core/array';
import { BooleanSchema } from './core/boolean';
import { EnumSchema } from './core/enum';
import { NumberSchema } from './core/number';
import { ObjectSchema, type ObjectShape } from './core/object';
import type { Schema } from './core/schema';
import { StringSchema } from './core/string';
import { i18n } from './i18n';
import type { EnumValue } from './types';

export const S = {
  array: <TItemSchema extends Schema<unknown, unknown>>(item: TItemSchema) => new ArraySchema(item),
  boolean: () => new BooleanSchema(),
  enum: <TValues extends readonly [EnumValue, ...EnumValue[]]>(values: TValues) =>
    new EnumSchema(values),
  string: () => new StringSchema(),
  number: () => new NumberSchema(),
  object: <TShape extends ObjectShape>(shape: TShape) => new ObjectSchema(shape),
};

export { ArraySchema } from './core/array';
export { BooleanSchema } from './core/boolean';
export { EnumSchema } from './core/enum';
export { ValidationError } from './core/error';
export { NumberSchema } from './core/number';
export { ObjectSchema } from './core/object';
export { StringSchema } from './core/string';
export { i18n };
export * from './i18n';
export * from './types';
