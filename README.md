# schema-guardian

`schema-guardian` is a TypeScript-first validation library for global products. It ships with built-in translations, locale negotiation, and RTL-aware errors so teams can validate once and return user-facing messages in English, French, Japanese, Tagalog, or Arabic without maintaining dozens of message catalogs by hand.

## Highlights

- Built-in i18n for validation messages
- Automatic locale negotiation from browser languages or `Accept-Language`
- `dir` metadata for perfect RTL rendering
- Context-aware messages using field labels or schema paths
- Structured errors with `issues` and `flatten()`
- Immutable-style schema builders for safer reuse

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
}).strict();

const result = signupSchema.safeParse(
  {
    name: 'Aya',
    email: 'invalid-email',
  },
  {
    acceptLanguage: 'ja-JP,fr;q=0.8,en;q=0.7',
  },
);

if (!result.success) {
  console.log(result.error.message);
  console.log(result.error.dir);
  console.log(result.error.flatten());
}
```

## Locale control

The library resolves locales in this order:

1. `safeParse(..., { locale })`
2. `i18n.setLocale(...)`
3. `browserLanguages` or `navigator.languages`
4. `acceptLanguage`
5. Default locale, which is English by default

```ts
import { i18n } from 'schema-guardian';

i18n.setDefaultLocale('fr');
i18n.setLocale('ar');
```

## Built-in locales

- `en`
- `fr`
- `ja`
- `tl` with `fil` alias support
- `ar`

## Custom locales

```ts
import { i18n, type LocaleDefinition } from 'schema-guardian';

const es: LocaleDefinition = {
  code: 'es',
  dir: 'ltr',
  messages: {
    common: {
      required: (context) => context.label ? `${context.label} es obligatorio` : 'Este campo es obligatorio',
      invalidType: (context) => `${context.label ?? 'Este campo'} debe ser ${context.expected ?? 'válido'}`,
      objectType: (context) => `${context.label ?? 'Este campo'} debe ser un objeto`,
      unknownKey: (context) => `${context.label ?? 'Este campo'} no está permitido`,
    },
    string: {
      min: (context) => `${context.label ?? 'Este campo'} debe tener al menos ${context.minimum} caracteres`,
      max: (context) => `${context.label ?? 'Este campo'} debe tener como máximo ${context.maximum} caracteres`,
      email: (context) => `${context.label ?? 'Este campo'} debe ser un correo válido`,
    },
    number: {
      min: (context) => `${context.label ?? 'Este campo'} debe ser mayor o igual que ${context.minimum}`,
      max: (context) => `${context.label ?? 'Este campo'} debe ser menor o igual que ${context.maximum}`,
      integer: (context) => `${context.label ?? 'Este campo'} debe ser un número entero`,
    },
  },
};

i18n.register(es);
```
