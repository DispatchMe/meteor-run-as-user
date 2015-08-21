Meteor.methods({
  'test.is.invocation': function() {
    return !!DDP._CurrentInvocation.get();
  },
  'test.is.outside.invocation': function() {
    return Meteor.runOutsideInvocation(function() {
      return !!DDP._CurrentInvocation.get();
    });
  }
});

Tinytest.addAsync('Dispatch run-as-user - in invocation', function(test, done) {

  Meteor.call('test.is.invocation', function(err, invocation) {
    test.isTrue(invocation, 'Should be in invocation');

    done();
  });

});

Tinytest.addAsync('Dispatch run-as-user - outside invocation', function(test, done) {

  Meteor.call('test.is.outside.invocation', function(err, invocation) {
    test.isFalse(invocation, 'Not be in invocation');
    done();
  });

});
