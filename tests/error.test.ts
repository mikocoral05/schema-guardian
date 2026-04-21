import { describe, expect, it } from 'vitest';
import { ValidationError } from '../src';

describe('ValidationError', () => {
  it('stores the first issue message and locale metadata', () => {
    const err = new ValidationError(
      [
        {
          code: 'required',
          path: ['email'],
          message: 'Email is required',
        },
      ],
      { code: 'ar', dir: 'rtl' },
    );

    expect(err.message).toBe('Email is required');
    expect(err.dir).toBe('rtl');
    expect(err.locale).toBe('ar');
    expect(err.name).toBe('ValidationError');
  });

  it('flattens issues into form and field buckets', () => {
    const err = new ValidationError(
      [
        {
          code: 'required',
          path: [],
          message: 'Form is invalid',
        },
        {
          code: 'required',
          path: ['email'],
          message: 'Email is required',
        },
      ],
      { code: 'en', dir: 'ltr' },
    );

    expect(err.flatten()).toEqual({
      formErrors: ['Form is invalid'],
      fieldErrors: {
        email: ['Email is required'],
      },
    });
  });
});
