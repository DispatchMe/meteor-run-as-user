var testUsername = 'test-run-as';
var testUser = null;

if (Meteor.isServer) {
  Meteor.users.remove({ username: testUsername });

  Meteor.methods({
    'remove me': function() {
      Meteor.users.remove({ _id: this.userId });
    }
  });

  userScope = function(name, f) {
    throw new Error('userScope only run on client');
  };
} else {

var getTestUser = function() {
  return testUser;
};

// Add tests with a logged in user
userScope = function(name, f) {

    Tinytest.addAsync(name + ' - create test user', function(test, complete) {

      Accounts.createUser({
        username: testUsername,
        password: 'test'
      });

      var timeout = null;

      var computation = Meteor.autorun(function(c) {
        if (Meteor.userId()) {
          testUser = Meteor.userId();
          if (timeout) Meteor.clearTimeout(timeout);
          c.stop();
          complete();
        }
      });

      timeout = Meteor.setTimeout(function() {
        if (!computation.stopped) {
          timeout = null;
          computation.stop();
          test.fail({ type: 'timeout', message: 'user login failed'});
          complete();
        }
      }, 5000);

    });

    // Allow the user to add tests here
    f(getTestUser);

    Tinytest.addAsync(name + ' - remove test user', function(test, complete) {
      Meteor.call('remove me', function(err) {
        if (err) {
          test.fail({ type: 'cleanup', message: 'could not remove test user ' + err});
        }
        complete();
      });
    })

  }
};

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
