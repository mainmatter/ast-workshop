```js
module.exports = function() {
  return {
    name: 'ast-transform',

    visitor: {
      ElementNode(node) {
        node.attributes = node.attributes
          .filter(it => !it.name.startsWith('data-test-'));
      }
    }
  };
};
```
