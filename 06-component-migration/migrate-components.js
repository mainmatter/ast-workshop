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
    ElementNode(node) {
      // read the tag name from the `ElementNode`
      let { tag } = node;

      // filter out non-MenuItem elements
      if (tag !== 'MenuItem') return;

      // change the tag name to `NewMenuItem`
      node.tag = 'NewMenuItem';

      // find the `@caption` attribute
      let content = node.attributes.find(it => it.name === '@caption').value;
      if (content) {
        // work around https://github.com/ember-template-lint/ember-template-recast/issues/203
        if (content.type === 'TextNode') {
          content = recast.builders.text(content.chars);
        }

        // move the `@caption` value into the element's `children`
        node.children = [content];
      }

      // remove `@caption` attribute
      node.attributes = node.attributes.filter(it => it.name !== '@caption');
    }
  });

  // convert the AST back into text
  let newTemplate = recast.print(root);

  // if necessary, write the changes back to the original file
  if (newTemplate !== template) {
    fs.writeFileSync(templatePath, newTemplate, 'utf8')
  }
}
