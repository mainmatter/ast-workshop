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

  // TODO write your implementation here

  let newTemplate = /* ... */ template;

  // if necessary, write the changes back to the original file
  if (newTemplate !== template) {
    fs.writeFileSync(templatePath, newTemplate, 'utf8')
  }
}
