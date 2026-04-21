import { NumberSchema } from './core/number';
import { ObjectSchema, type ObjectShape } from './core/object';
import { StringSchema } from './core/string';
import { i18n } from './i18n';

export const S = {
  string: () => new StringSchema(),
  number: () => new NumberSchema(),
  object: <TShape extends ObjectShape>(shape: TShape) => new ObjectSchema(shape),
};

export { ValidationError } from './core/error';
export { NumberSchema } from './core/number';
export { ObjectSchema } from './core/object';
export { StringSchema } from './core/string';
export { i18n };
export * from './i18n';
export * from './types';
