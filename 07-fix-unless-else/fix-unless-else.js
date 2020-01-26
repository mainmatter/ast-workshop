const fs = require('fs');
const globby = require('globby');
const recast = require('ember-template-recast');

// find all template files in the `app/` folder
let templatePaths = globby.sync('app/**/*.hbs', {
  cwd: __dirname,
  absolute: true,
});

for (let templatePath of templatePaths) {
  // read the file content
  let template = fs.readFileSync(templatePath, 'utf8');

  // parse the file content into an AST
  let root = recast.parse(template);

  // use `traverse()` to "visit" all of the nodes in the AST
  recast.traverse(root, {
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
        let { program, inverse } = node;

        // swap `program` and `inverse` blocks
        node.program = inverse;
        node.inverse = program;

        // change the block statement from `unless` to `if`
        node.path.original = 'if';
      }
    }
  });

  // convert the AST back into text
  let newTemplate = recast.print(root);

  // if necessary, write the changes back to the original file
  if (newTemplate !== template) {
    fs.writeFileSync(templatePath, newTemplate, 'utf8')
  }
}
