Tinytest.add('Dispatch run-as-user - restrictions', function(test) {

  test.isFalse(Meteor.isRestricted(), 'Meteor.isRestricted should be false when outside a runRestricted');

  Meteor.runRestricted(function() {
    test.isTrue(Meteor.isRestricted(), 'Meteor.isRestricted should be true when inside a runRestricted');
    Meteor.runUnrestricted(function() {
      test.isFalse(Meteor.isRestricted(), 'Meteor.isRestricted should be false when inside runUnrestricted');
      Meteor.runRestricted(function() {
        test.isTrue(Meteor.isRestricted(), 'Meteor.isRestricted should be true when inside a runRestricted');
        Meteor.runUnrestricted(function() {
          test.isFalse(Meteor.isRestricted(), 'Meteor.isRestricted should be false when inside runUnrestricted');
        });
      });
    });
  });

  test.isFalse(Meteor.isRestricted(), 'Meteor.isRestricted should be false when outside a runRestricted');

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
