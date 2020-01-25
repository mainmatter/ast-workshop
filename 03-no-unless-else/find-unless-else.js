const fs = require('fs');
const globby = require('globby');
const glimmer = require('@glimmer/syntax');

// find all template files in the `app/` folder
let templatePaths = globby.sync('app/**/*.hbs', {
  cwd: __dirname,
  absolute: true,
});

for (let templatePath of templatePaths) {
  // read the file content
  let template = fs.readFileSync(templatePath, 'utf8');

  // parse the file content into an AST
  let root = glimmer.preprocess(template);

  // use `traverse()` to "visit" all of the nodes in the AST
  glimmer.traverse(root, {
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
        // if so, we print a warning to the console
        console.log(`Found unless/else in ${templatePath}:${node.loc.start.line}:${node.loc.start.column}`);
      }
    }
  })
}
