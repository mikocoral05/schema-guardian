import type { EnumValue } from '../types';
import { Schema, type InternalParseOptions } from './schema';

export class EnumSchema<
  TValues extends readonly [EnumValue, ...EnumValue[]],
  TOutput = TValues[number],
> extends Schema<TOutput, TValues[number]> {
  constructor(private readonly values: TValues) {
    super();
  }

  optional(): EnumSchema<TValues, TOutput | undefined> {
    const clone = this.clone() as EnumSchema<TValues, TOutput | undefined>;
    clone.isOptional = true;
    return clone;
  }

  valuesList(): readonly TValues[number][] {
    return [...this.values];
  }

  protected clone(): this {
    return this.copyBaseStateTo(new EnumSchema(this.values)) as this;
  }

  protected parseValue(value: unknown, options: InternalParseOptions): TValues[number] {
    if (this.values.some((candidate) => Object.is(candidate, value))) {
      return value as TValues[number];
    }

    throw this.createError('invalid_enum_value', 'enum.invalid', options, {
      options: [...this.values],
    });
  }
}
