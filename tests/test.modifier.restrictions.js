// Test how allow and deny rules apply when working with the db

var foo = new Mongo.Collection('run-as-test-collection');

if (Meteor.isServer) {
  foo.remove({});
}

// foo._insecure = false;
// foo._restricted = true;

foo.allow({
  insert: function(userId) {
    return !!userId;
  },
  update: function(userId) {
    return !!userId;
  },
  remove: function(userId) {
    return !!userId;
  }
});

var modify = function() {
  var id = foo.insert({ name: 'foo' });

  foo.update({ _id: id }, { $set: { name: 'bar' } });

  foo.remove({ _id: id });
};


Tinytest.add('Dispatch run-as - modify db - not logged in', function(test) {

  test.isFalse(Meteor.isRestricted(), 'Meteor.isRestricted should be false when outside a runAs');

  Meteor.runAs(null, function() {
    test.isTrue(Meteor.isRestricted(), 'Meteor.isRestricted should be true when in a runAs');

    test.isNull(Meteor.userId(), 'Meteor.userId() should be null');

    test.throws(modify);

  });

});


Tinytest.add('Dispatch run-as - modify db - fake userId', function(test) {

  test.isFalse(Meteor.isRestricted(), 'Meteor.isRestricted should be false when outside a runAs');

  Meteor.runAs('TEST', function() {
    test.isTrue(Meteor.isRestricted(), 'Meteor.isRestricted should be true when in a runAs');


    if (Meteor.isClient) {
      // Client can't have a fake userId
      test.equal(Meteor.userId(), null, 'Meteor.userId() should be null');
      test.throws(modify);
    } else {
      test.equal(Meteor.userId(), 'TEST', 'Meteor.userId() should be "TEST"');
      modify();
    }

  });

});

if (Meteor.isClient) {
  userScope('Dispatch run-as - modify db', function(user) {
    Tinytest.add('Dispatch run-as - modify db - real userId', function(test) {

      test.isFalse(Meteor.isRestricted(), 'Meteor.isRestricted should be false when outside a runAs');

      Meteor.runAs(user(), function() {
        test.isTrue(Meteor.isRestricted(), 'Meteor.isRestricted should be true when in a runAs');

        test.equal(Meteor.userId(), user(), 'Meteor.userId() should match current user');

      });

    });
  });
}

// Ref: http://vowsjs.org/#reference
//
// test.ok({ message: 'Ok' })
// test.expect_fail()
// test.fail({type: 'foo', expected: '', actual: '', message: ''})
// test.exception(exception)
// test.runId()
// test.equal(actual, expected, message, not)
// test.notEqual(actual, expected, message)
// test.instanceOf(obj, klass, message)
// test.notInstanceOf(obj, klass, message)
// test.matches(actual, regexp, message)
// test.notMatches(actual, regexp, message)
// test.throws(f, expected)
// test.isTrue(v, msg)
// test.isFalse(v, msg)
// test.isNull(v, msg)
// test.isNotNull(v, msg)
// test.isUndefined(v, msg)
// test.isNotUndefined(v, msg)
// test.isNaN(v, msg)
// test.isNotNaN(v, msg)
// test.include(s, v, message, not)
// test.notInclude(s, v, message)
// test.length(obj, expected_length, msg)
// test._stringEqual(actual, expected, message) EXPERIMENTAL
