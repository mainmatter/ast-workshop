const Rule = require('ember-template-lint').Rule;

module.exports = class extends Rule {
  visitor() {
    return {
      BlockStatement(node) {
        if (
          // first we make sure that `node.path` is really a `PathExpression`
          // since there are a few edge cases where it might not be
          node.path.type === 'PathExpression' &&

          // then we check if this is an `unless` block
          node.path.original === 'unless' &&

          // and finally, we check if the block has an `else` block too
          node.inverse
        ) {
          // if so, report a template-lint warning
          this.log({
            message: 'Found unless/else',
            line: node.loc && node.loc.start.line,
            column: node.loc && node.loc.start.column,
            source: this.sourceForNode(node)
          });
        }
      },
    };
  }
};
