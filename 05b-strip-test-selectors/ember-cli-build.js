'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  const highlightedLanguages = [
    'bash',
    'clike',
    'glsl',
    'go',
    'ini',
    'javascript',
    'json',
    'markup',
    'protobuf',
    'ruby',
    'rust',
    'scss',
    'sql',
    'yaml',
  ];

  let app = new EmberApp(defaults, {
    name: 'cargo',

    babel6: {
      plugins: ['transform-object-rest-spread'],
    },
    'ember-prism': {
      theme: 'twilight',
      components: highlightedLanguages,
    },
    sassOptions: {
      includePaths: ['node_modules/normalize.css'],
    },
    cssModules: {
      extension: 'module.scss',
      intermediateOutputPath: 'app/styles/_modules.scss',
    },
    fingerprint: {
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'svg', 'ttf', 'woff', 'woff2'],
    },
  });

  class StripTestSelectorsTransform {
    transform(ast) {
      this.syntax.traverse(ast, {
        ElementNode(node) {
          node.attributes = node.attributes
            .filter(it => !it.name.startsWith('data-test-'));
        }
      });

      return ast;
    }
  }

  app.registry.add('htmlbars-ast-plugin', {
    name: 'strip-test-selectors',
    plugin: StripTestSelectorsTransform,
  });

  return app.toTree();
};
