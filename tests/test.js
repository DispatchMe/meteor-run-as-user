Tinytest.add('Dispatch run-as-user - not loggedin - runAsUser', function(test) {

  test.isFalse(Meteor.isRestricted(), 'Meteor.isRestricted should be false when outside a runAsUser');

  Meteor.runAsUser(null, function() {
    test.isFalse(Meteor.isRestricted(), 'Meteor.isRestricted should be false when in a runAsUser');

    test.isNull(Meteor.userId(), 'Meteor.userId() should be null');
  });

  test.isFalse(Meteor.isRestricted(), 'Meteor.isRestricted should be false when outside a runAsUser');

  Meteor.runAsUser('ID', function() {
    test.isFalse(Meteor.isRestricted(), 'Meteor.isRestricted should be false when in a runAsUser');

    if (Meteor.isServer) {
      test.equal(Meteor.userId(), 'ID', 'Meteor.userId() should be "ID" in this runAsUser');
    } else {
      test.isNull(Meteor.userId(), 'Meteor.userId() should be null on the client');
    }
  });

  test.isFalse(Meteor.isRestricted(), 'Meteor.isRestricted should be false when outside a runAsUser');

});

Tinytest.add('Dispatch run-as-user - not loggedin - runAsRestrictedUser', function(test) {

  test.isFalse(Meteor.isRestricted(), 'Meteor.isRestricted should be false when outside a runAsRestrictedUser');

  Meteor.runAsRestrictedUser(null, function() {
    test.isTrue(Meteor.isRestricted(), 'Meteor.isRestricted should be true when in a runAsRestrictedUser');

    test.isNull(Meteor.userId(), 'Meteor.userId() should be null');
  });

  test.isFalse(Meteor.isRestricted(), 'Meteor.isRestricted should be false when outside a runAsRestrictedUser');

  Meteor.runAsRestrictedUser('ID', function() {
    test.isTrue(Meteor.isRestricted(), 'Meteor.isRestricted should be true when in a runAsRestrictedUser');

    if (Meteor.isServer) {
      test.equal(Meteor.userId(), 'ID', 'Meteor.userId() should be "ID" in this runAsRestrictedUser');
    } else {
      test.isNull(Meteor.userId(), 'Meteor.userId() should be null on the client');
    }
  });

  test.isFalse(Meteor.isRestricted(), 'Meteor.isRestricted should be false when outside a runAsRestrictedUser');

});

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
