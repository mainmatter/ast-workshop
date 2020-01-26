module.exports = {
  create: function(context) {
    return {
      Property(node) {
        let { key, value } = node;
        if (key.type !== 'Identifier') return;
        if (value.type !== 'CallExpression') return;

        let { callee, arguments: args } = value;
        if (callee.type !== 'Identifier') return;
        if (!['inject', 'service'].includes(callee.name)) return;
        if (args.length !== 1) return;

        let arg = args[0];
        if (arg.type !== 'Literal') return;

        if (arg.value === key.name) {
          context.report({
            node: arg,
            message: 'Unnecessary injection argument',
          });
        }
      }
    };
  }
};
