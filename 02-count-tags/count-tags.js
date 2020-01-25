const fs = require('fs');
const globby = require('globby');
const glimmer = require('@glimmer/syntax');

let tagCounter = new Map();

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
    ElementNode(node) {
      // read the tag name from the `ElementNode`
      let { tag } = node;

      // read the current count for that tag name
      let previousCount = tagCounter.get(tag) || 0;

      // increase the counter by 1
      tagCounter.set(tag, previousCount + 1);
    }
  })
}

// output the raw results
console.log(tagCounter);
