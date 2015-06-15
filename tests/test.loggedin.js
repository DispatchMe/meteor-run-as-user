if (Meteor.isClient) {

  userScope('Dispatch run-as-user - runAsUser loggedin', function(user) {

    Tinytest.add('Dispatch run-as-user - runAsUser loggedin - test', function(test) {
      test.equal(Meteor.userId(), user(), 'User not logged in...');

      test.isFalse(Meteor.isRestricted(), 'Meteor.isRestricted should be false when outside a runAsUser');

      Meteor.runAsUser(null, function() {
        test.isTrue(Meteor.isRestricted(), 'Meteor.isRestricted should be true when in a runAsUser');

        test.equal(Meteor.userId(), user(), 'When running on the client userId should match the loggedin user');
      });

      test.isFalse(Meteor.isRestricted(), 'Meteor.isRestricted should be false when outside a runAsUser');

      Meteor.runAsUser('ID', function() {
        test.isTrue(Meteor.isRestricted(), 'Meteor.isRestricted should be true when in a runAsUser');

        test.equal(Meteor.userId(), user(), 'When running on the client userId should match the loggedin user');
      });

      test.isFalse(Meteor.isRestricted(), 'Meteor.isRestricted should be false when outside a runAsUser');

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
