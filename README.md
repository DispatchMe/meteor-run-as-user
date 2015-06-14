dispatch:run-as
===============

Allow server and client to run as user in restricted mode.

API:
* `Meteor.runAs(userId, func)`
* `Meteor.restricted()`


#### Examples
```js
  Meteor.runAs(userId, function() {
    // Run method as user on both client or server
    Meteor.call('getUserId');
  });
```
*Client cannot set other userId that it's current user*

```js
  foo = new Mongo.Collection('foo-collection');

  foo.allow({
    insert: function(userId) { return !!userId; }
  });

  Meteor.runAs(userId, function() {
    // This will throw errors on both client and server if
    // not allowed
    foo.insert({ name: 'foo'});
  });
```

```js
  Meteor.runAs(userId, function() {
    if (Meteor.isRestricted()) {
      // Something in restricted mode
      console.log(Meteor.userId());
    } else {
      // Safe mode
    }
  });
```