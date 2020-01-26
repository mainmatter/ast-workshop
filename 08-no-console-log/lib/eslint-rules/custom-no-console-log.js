module.exports = {
  create: function(context) {
    return {
      CallExpression(node) {
        let { callee } = node;
        if (callee.type !== 'MemberExpression') return;

        let { object, property } = callee;
        if (object.type !== 'Identifier' || object.name !== 'console') return;
        if (property.type !== 'Identifier' || property.name !== 'log') return;

        context.report({
          node,
          message: 'Unexpected console.log() expression',
        });
      }
    };
  }
};
