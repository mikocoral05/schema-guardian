import { Schema, type InternalParseOptions } from './schema';

export class BooleanSchema<TOutput = boolean> extends Schema<TOutput, boolean> {
  optional(): BooleanSchema<TOutput | undefined> {
    const clone = this.clone() as BooleanSchema<TOutput | undefined>;
    clone.isOptional = true;
    return clone;
  }

  protected clone(): this {
    return this.copyBaseStateTo(new BooleanSchema()) as this;
  }

  protected parseValue(value: unknown, options: InternalParseOptions): boolean {
    if (typeof value !== 'boolean') {
      throw this.createError('invalid_type', 'common.invalidType', options, {
        expected: 'boolean',
        received: this.describeType(value),
      });
    }

    return value;
  }
}
