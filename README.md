# schema-guardian

`schema-guardian` is a TypeScript-first validation library for global products. It ships with built-in translations, locale negotiation, and RTL-aware errors so teams can validate once and return user-facing messages in the right language without maintaining a huge error-message catalog by hand.

## Highlights

- Built-in i18n for validation messages
- Automatic locale negotiation from explicit locale, browser hints, or `Accept-Language`
- `dir` metadata for clean RTL rendering
- Context-aware messages using field labels and schema paths
- Structured errors with `issues` and `flatten()`
- Immutable-style schema builders for safer reuse
- Production scripts and CI workflows for build, typecheck, test, and pack validation

## Installation

```bash
npm install schema-guardian
```

## Quick start

```ts
import { S } from 'schema-guardian';

const signupSchema = S.object({
  name: S.string().label('Name').trim().min(5),
  email: S.string().label('Email').trim().email(),
  age: S.number().label('Age').integer().min(18).optional(),
  roles: S.array(S.enum(['admin', 'editor', 'viewer'] as const)).min(1),
  acceptedTerms: S.boolean().label('Terms').refine((value) => value, 'Terms must be accepted'),
}).strict();

const result = signupSchema.safeParse(
  {
    name: 'Aya',
    email: 'invalid-email',
    roles: [],
    acceptedTerms: false,
  },
  {
    acceptLanguage: 'ja-JP,fr;q=0.8,en;q=0.7',
  },
);

if (!result.success) {
  console.log(result.error.message);
  console.log(result.error.locale);
  console.log(result.error.dir);
  console.log(result.error.flatten());
}
```

## API overview

```ts
import { S } from 'schema-guardian';

S.string().trim().min(3).max(20).email().optional();
S.number().integer().min(0).max(100);
S.boolean();
S.enum(['draft', 'published'] as const);
S.array(S.string()).min(1).max(10);
S.object({
  id: S.string(),
  tags: S.array(S.string()).optional(),
});
```

All schemas support:

- `.label('Field name')`
- `.optional()`
- `.refine((value) => boolean, message?)`
- `.parse(value, options?)`
- `.safeParse(value, options?)`

## Locale resolution

Locales are resolved in this order:

1. `safeParse(..., { locale })`
2. `i18n.setLocale(...)`
3. `safeParse(..., { browserLanguages })`
4. `safeParse(..., { acceptLanguage })`
5. Runtime browser languages from `navigator.languages`
6. Default locale, which is English by default

```ts
import { i18n } from 'schema-guardian';

i18n.setDefaultLocale('fr');
i18n.setLocale('ar');
```

## Built-in locales

The package currently ships with these bundled locales:

- `ar`
- `de`
- `en`
- `es`
- `fr`
- `he`
- `hi`
- `id`
- `it`
- `ja`
- `ko`
- `nl`
- `pt`
- `ru`
- `tl` with `fil` alias support
- `tr`
- `vi`
- `zh-CN`
- `zh-TW`

You can import all locale exports:

```ts
import { es, fr, ja, zhCN } from 'schema-guardian/locales';
```

Or import a specific locale file:

```ts
import { pt } from 'schema-guardian/locales/pt';
```

## Custom locales

```ts
import { i18n, type LocaleDefinition } from 'schema-guardian';

const pirate: LocaleDefinition = {
  code: 'pirate',
  dir: 'ltr',
  messages: {
    common: {
      required: (context) => context.label ? `${context.label} be required` : 'This field be required',
      invalidType: (context) => `${context.label ?? 'This field'} must be ${context.expected ?? 'valid cargo'}`,
      objectType: (context) => `${context.label ?? 'This field'} must be an object`,
      arrayType: (context) => `${context.label ?? 'This field'} must be an array`,
      unknownKey: (context) => `${context.label ?? 'This field'} be forbidden`,
      custom: (context) => `${context.label ?? 'This field'} be invalid`,
    },
    array: {
      min: (context) => `${context.label ?? 'This field'} must contain at least ${context.minimum} items`,
      max: (context) => `${context.label ?? 'This field'} must contain at most ${context.maximum} items`,
    },
    string: {
      min: (context) => `${context.label ?? 'This field'} must be at least ${context.minimum} characters`,
      max: (context) => `${context.label ?? 'This field'} must be at most ${context.maximum} characters`,
      email: (context) => `${context.label ?? 'This field'} must be a valid email address`,
    },
    enum: {
      invalid: (context) => `${context.label ?? 'This field'} must be one of: ${(context.options ?? []).join(', ')}`,
    },
    number: {
      min: (context) => `${context.label ?? 'This field'} must be greater than or equal to ${context.minimum}`,
      max: (context) => `${context.label ?? 'This field'} must be less than or equal to ${context.maximum}`,
      integer: (context) => `${context.label ?? 'This field'} must be a whole number`,
    },
  },
};

i18n.register(pirate);
```

## Production workflow

```bash
npm run validate
npm run pack:check
```

Those commands run:

- typecheck
- tests
- build
- `npm pack --dry-run`

GitHub Actions are included for CI and publish flows under `.github/workflows`.
