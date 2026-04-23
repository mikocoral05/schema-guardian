import { beforeEach, describe, expect, it } from 'vitest';
import { S, i18n } from '../src';

describe('BooleanSchema', () => {
  beforeEach(() => {
    i18n.setLocale('en');
  });

  it('validates booleans', () => {
    const schema = S.boolean();

    expect(schema.parse(true)).toBe(true);

    const result = schema.safeParse('true');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.message).toBe('This field must be a boolean');
    }
  });

  it('supports custom refinement messages', () => {
    const schema = S.boolean()
      .label('Terms')
      .refine((value) => value, 'Terms must be accepted');

    const result = schema.safeParse(false);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.message).toBe('Terms must be accepted');
    }
  });
});
