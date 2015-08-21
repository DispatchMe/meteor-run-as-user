Meteor.methods({
  'test.is.not.admin': function() {
    return Meteor.isAdmin();
  },
  'test.is.admin': function() {
    return Meteor.runAsAdmin(function() {
      return Meteor.isAdmin();
    });
  }
});

Tinytest.addAsync('Dispatch run-as-user - isAdmin', function(test, done) {

  test.isFalse(Meteor.isAdmin(), 'Meteor.isAdmin should be false');

  Meteor.call('test.is.not.admin', function(err, isAdmin) {
    test.isFalse(isAdmin, 'Meteor.isAdmin should be false');

    done();
  });

});

Tinytest.addAsync('Dispatch run-as-user - runAsAdmin', function(test, done) {

  test.isFalse(Meteor.isAdmin(), 'Meteor.isAdmin should be false');

  Meteor.call('test.is.admin', function(err, isAdmin) {
    test.isFalse(isAdmin, 'Meteor.isAdmin should be false');
    done();
  });

});
