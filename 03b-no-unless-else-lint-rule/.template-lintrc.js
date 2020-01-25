'use strict';

/* eslint-env node */

module.exports = {
  plugins: [
    {
      name: 'custom',
      rules: {
        'custom/no-unless-else': require('./lib/template-lint-rules/no-unless-else')
      }
    },
  ],

  extends: 'octane',

  rules: {
    'custom/no-unless-else': true,

    'require-valid-alt-text': false,
    'no-action': false,
    'no-curly-component-invocation': false,
    'simple-unless': false,
  },
};
