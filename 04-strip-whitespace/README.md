```js
module.exports = function() {
  return {
    name: 'ast-transform',

    visitor: {
      TextNode(node) {
        node.chars = node.chars.replace(/[ \r\n]+/g, ' ');
      }
    }
  };
};
```
