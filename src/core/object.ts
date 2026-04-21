import type { ValidationIssue } from '../types';
import { ValidationError } from './error';
import { Schema, type InternalParseOptions } from './schema';

type AnySchema = Schema<unknown, unknown>;

export type ObjectShape = Record<string, AnySchema>;

type InferSchema<TSchema> = TSchema extends Schema<infer TOutput> ? TOutput : never;

type OptionalKeys<TShape extends ObjectShape> = {
  [TKey in keyof TShape]: undefined extends InferSchema<TShape[TKey]> ? TKey : never;
}[keyof TShape];

type RequiredKeys<TShape extends ObjectShape> = Exclude<keyof TShape, OptionalKeys<TShape>>;

export type ObjectOutput<TShape extends ObjectShape> = {
  [TKey in RequiredKeys<TShape>]: Exclude<InferSchema<TShape[TKey]>, undefined>;
} & {
  [TKey in OptionalKeys<TShape>]?: Exclude<InferSchema<TShape[TKey]>, undefined>;
};

export class ObjectSchema<
  TShape extends ObjectShape,
  TOutput = ObjectOutput<TShape>,
> extends Schema<TOutput, ObjectOutput<TShape>> {
  private strictMode = false;

  constructor(private readonly shape: TShape) {
    super();
  }

  optional(): ObjectSchema<TShape, TOutput | undefined> {
    const clone = this.clone() as ObjectSchema<TShape, TOutput | undefined>;
    clone.isOptional = true;
    return clone;
  }

  strict(): this {
    const clone = this.clone();
    clone.strictMode = true;
    return clone;
  }

  protected clone(): this {
    const clone = this.copyBaseStateTo(new ObjectSchema(this.shape)) as this;
    (clone as ObjectSchema<TShape, TOutput>).strictMode = this.strictMode;
    return clone;
  }

  protected parseValue(
    value: unknown,
    options: InternalParseOptions,
  ): ObjectOutput<TShape> {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      throw this.createError('invalid_object', 'common.objectType', options, {
        expected: 'object',
        received: this.describeType(value),
      });
    }

    const input = value as Record<string, unknown>;
    const output: Partial<ObjectOutput<TShape>> = {};
    const issues: ValidationIssue[] = [];

    for (const key of Object.keys(this.shape) as Array<keyof TShape>) {
      const schema = this.shape[key];
      if (!schema) {
        continue;
      }

      const keyName = String(key);
      const result = schema.safeParse(input[keyName], {
        ...options,
        path: [...(options.path ?? []), keyName],
        resolvedLocale: options.resolvedLocale,
      });

      if (result.success) {
        if (result.data !== undefined) {
          (output as Record<string, unknown>)[keyName] = result.data;
        }
      } else {
        issues.push(...result.error.issues);
      }
    }

    if (this.strictMode) {
      for (const key of Object.keys(input)) {
        if (!(key in this.shape)) {
          issues.push(
            this.createIssue('unknown_key', 'common.unknownKey', {
              ...options,
              path: [...(options.path ?? []), key],
            }),
          );
        }
      }
    }

    if (issues.length > 0) {
      throw new ValidationError(
        issues,
        options.resolvedLocale ?? this.toInternalOptions(options).resolvedLocale!,
      );
    }

    return output as ObjectOutput<TShape>;
  }
}
