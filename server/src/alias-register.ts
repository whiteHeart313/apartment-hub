// src/alias-register.ts
// Intentionally using require for module-alias registration.
// This file will be ignored by the linter.
if (process.env.NODE_ENV !== 'development' || !process.env.IS_TS_NODE) {
  require('module-alias/register');
}
