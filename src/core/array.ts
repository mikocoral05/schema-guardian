import type { Infer, ValidationIssue } from '../types';
import { ValidationError } from './error';
import { Schema, type InternalParseOptions, type MessageOverride } from './schema';

interface LengthRule {
  value: number;
  message?: MessageOverride | undefined;
}

type AnySchema = Schema<unknown, unknown>;

export class ArraySchema<
  TItemSchema extends AnySchema,
  TOutput = Array<Infer<TItemSchema>>,
> extends Schema<TOutput, Array<Infer<TItemSchema>>> {
  private minLength: LengthRule | undefined = undefined;
  private maxLength: LengthRule | undefined = undefined;

  constructor(private readonly itemSchema: TItemSchema) {
    super();
  }

  optional(): ArraySchema<TItemSchema, TOutput | undefined> {
    const clone = this.clone() as ArraySchema<TItemSchema, TOutput | undefined>;
    clone.isOptional = true;
    return clone;
  }

  min(length: number, message?: MessageOverride): this {
    const clone = this.clone();
    clone.minLength = message === undefined ? { value: length } : { value: length, message };
    return clone;
  }

  max(length: number, message?: MessageOverride): this {
    const clone = this.clone();
    clone.maxLength = message === undefined ? { value: length } : { value: length, message };
    return clone;
  }

  protected clone(): this {
    const clone = this.copyBaseStateTo(new ArraySchema(this.itemSchema)) as this;
    const arrayClone = clone as ArraySchema<TItemSchema, TOutput>;
    arrayClone.minLength = this.minLength ? { ...this.minLength } : undefined;
    arrayClone.maxLength = this.maxLength ? { ...this.maxLength } : undefined;
    return clone;
  }

  protected parseValue(value: unknown, options: InternalParseOptions): Array<Infer<TItemSchema>> {
    if (!Array.isArray(value)) {
      throw this.createError('invalid_type', 'common.arrayType', options, {
        expected: 'array',
        received: this.describeType(value),
      });
    }

    const issues: ValidationIssue[] = [];
    const output: Array<Infer<TItemSchema>> = [];

    if (this.minLength && value.length < this.minLength.value) {
      issues.push(
        this.createIssue(
          'too_small',
          'array.min',
          options,
          { minimum: this.minLength.value },
          this.minLength.message,
        ),
      );
    }

    if (this.maxLength && value.length > this.maxLength.value) {
      issues.push(
        this.createIssue(
          'too_big',
          'array.max',
          options,
          { maximum: this.maxLength.value },
          this.maxLength.message,
        ),
      );
    }

    value.forEach((item, index) => {
      const result = this.itemSchema.safeParse(item, {
        ...options,
        path: [...(options.path ?? []), index],
        resolvedLocale: options.resolvedLocale,
      });

      if (result.success) {
        output.push(result.data as Infer<TItemSchema>);
      } else {
        issues.push(...result.error.issues);
      }
    });

    if (issues.length > 0) {
      throw new ValidationError(
        issues,
        options.resolvedLocale ?? this.toInternalOptions(options).resolvedLocale!,
      );
    }

    return output;
  }
}
