Meteor.methods({
  'this userId': function() {
    return this.userId;
  },
  // Issue #1 replication
  'recursive this userId': function(userId) {
    return Meteor.runAsRestrictedUser(userId, function() {
      var user = Meteor.call('this userId');
      return user;
    });
  }
});

Tinytest.addAsync('Dispatch run-as-user - method call - outside', function(test, complete) {
  Meteor.call('this userId', function(err, result) {
    if (!err) {
      test.equal(result, null, 'Calling method outside a runAsRestrictedUser should set userId to null');
    }

    complete(err);
  });
});

Tinytest.addAsync('Dispatch run-as-user - method call - in runAsRestrictedUser', function(test, complete) {

  Meteor.runAsRestrictedUser('TEST', function() {

    Meteor.call('this userId', function(err, result) {
      if (!err) {

        if (Meteor.isClient) {
          test.equal(result, null, 'Calling method in a runAsRestrictedUser should set userId to null');
        } else {
          test.equal(result, 'TEST', 'Calling method in a runAsRestrictedUser should set userId to "TEST"');
        }
      }

      complete(err);
    });

  });
});

if (Meteor.isClient) {

  userScope('Dispatch run-as-user - method call - runAsRestrictedUser loggedin', function(user) {


    Tinytest.addAsync('Dispatch run-as-user - method call - runAsRestrictedUser loggedin - in runAsRestrictedUser', function(test, complete) {

      test.equal(Meteor.userId(), user(), 'User is not logged in');

      Meteor.runAsRestrictedUser('TEST', function() {

        test.equal(Meteor.userId(), user(), 'We should not be able to run as other users on client');

        Meteor.call('this userId', function(err, result) {
          if (!err) {

            test.equal(result, user(), 'Calling method in a runAsRestrictedUser should set userId to current user');
          }

          complete(err);
        });

      });
    });
  });


}

Tinytest.add('Dispatch run-as-user - method call - runAsRestrictedUser', function(test) {

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

Tinytest.addAsync('Dispatch run-as-user - method call - recursive method issue #1 null', function(test, complete) {

  Meteor.call('recursive this userId', null, function(err, result) {
    if (!err) {

      if (Meteor.isClient) {
        test.equal(result, null, 'Calling method in a runAsRestrictedUser should set userId to null');
      } else {
        test.equal(result, null, 'Calling method in a runAsRestrictedUser should set userId to null');
      }
    }

    complete(err);
  });

});

Tinytest.addAsync('Dispatch run-as-user - method call - recursive method issue #1 "TEST"', function(test, complete) {

  Meteor.call('recursive this userId', 'TEST', function(err, result) {
    if (!err) {

      if (Meteor.isClient) {
        test.equal(result, 'TEST', 'Calling method in a runAsRestrictedUser should set userId to "TEST"');
      } else {
        test.equal(result, 'TEST', 'Calling method in a runAsRestrictedUser should set userId to "TEST"');
      }
    }

    complete(err);
  });

});

if (Meteor.isClient) {
  userScope('Dispatch run-as-user - method call - recursive method issue #1 "TEST" loggedin', function(user) {


    Tinytest.addAsync('Dispatch run-as-user - method call - recursive method issue #1 "TEST" loggedin - in runAsRestrictedUser', function(test, complete) {

      Meteor.call('recursive this userId', 'TEST', function(err, result) {
        if (!err) {

          if (Meteor.isClient) {
            test.equal(result, 'TEST', 'Calling method in a runAsRestrictedUser should set userId to "TEST"');
          } else {
            test.equal(result, 'TEST', 'Calling method in a runAsRestrictedUser should set userId to "TEST"');
          }
        }

        complete(err);
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
