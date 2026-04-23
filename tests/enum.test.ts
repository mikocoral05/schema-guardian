import { beforeEach, describe, expect, it } from 'vitest';
import { S, i18n } from '../src';

describe('EnumSchema', () => {
  beforeEach(() => {
    i18n.setLocale('en');
  });

  it('validates enum members', () => {
    const schema = S.enum(['draft', 'published', 'archived'] as const).label('Status');

    expect(schema.parse('draft')).toBe('draft');

    const result = schema.safeParse('deleted');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.message).toBe('Status must be one of: draft, published, archived');
    }
  });
});
