dispatch:run-as-user
===============

Allow server and client to run as user in restricted mode.

API:
* `Meteor.runAsUser(userId, func)`
* `Meteor.runAsRestrictedUser(userId, func)`
* `Meteor.runRestricted(func)`
* `Meteor.runUnrestricted(func)`
* `Meteor.isRestricted()`


#### Examples
```js
  Meteor.runAsUser(userId, function() {
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

  Meteor.runAsUserRestricted(userId, function() {
    // This will throw errors on both client and server if
    // not allowed
    foo.insert({ name: 'foo'});
  });
```

```js
  Meteor.runAsRestrictedUser(userId, function() {
    if (Meteor.isRestricted()) {
      // Something in restricted mode
      console.log(Meteor.userId());
    } else {
      // Safe mode
    }
  });
```

#### Restrictions API:
```js
  Meteor.runRestricted(function() {
    // Meteor.isRestricted() === true
    Meteor.runUnrestricted(function() {
      // Meteor.isRestricted() === false
    });
  });
```

#### Run outside an invocation
```js
  // On the client
  Meteor.methods({
    'foo': function() {    
      DDP._CurrentInvocation.get(); // Invocation object
      Meteor.runOutsideInvocation(function() {
        DDP._CurrentInvocation.get(); // Invocation object
      });
    }
  });

  // On the server
  Meteor.methods({
    'foo': function() {    
      DDP._CurrentInvocation.get(); // Invocation object
      Meteor.runOutsideInvocation(function() {
        DDP._CurrentInvocation.get(); // null
      });
    }
  });
```

#### Run as `admin`
Like `restricted`/`unrestricted` can be useful a flag `isAdmin` can be used more generally.
```js
  Meteor.isAdmin(); // false
  Meteor.runAsAdmin(function() {
    Meteor.isAdmin(); // true
    });
```