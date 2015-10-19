# unsetTimeout

Your mocha tests use setTimeout or setInterval? Not sure how to get proper test isolation? Simply put this in your mocha test:

```js
require('unset-timeout');
```

unsetTimeout will reset all the `setTimeout` and `setInterval` calls after each mocha test, so you can be sure that one test doesn't bleed into another.
