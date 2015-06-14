/**
 * Run as a user
 * @param  {String} userId The id of user to run as
 * @param  {Function} f      Function to run as user
 */
Meteor.runAs = function(userId, f) {
  var currentInvocation = DDP._CurrentInvocation.get();

  // Create a new method invocation
  var invocation = new DDPCommon.MethodInvocation(
    (currentInvocation)? currentInvocation: {
      connection: null
    }
  );

  // Now run as user on this invocation
  invocation.setUserId(userId);

  // Since this is called by runAs we set the restricted
  invocation.isRestricted = true;

  return DDP._CurrentInvocation.withValue(invocation, function () {
    return f.apply(invocation, [userId]);
  });
};

/**
 * Returns true if inside a runAs user scope
 * @return {Boolean} True if in a runAs user scope
 */
Meteor.isRestricted = function() {
  var currentInvocation = DDP._CurrentInvocation.get();

  if (currentInvocation) {
    return !!currentInvocation.isRestricted;
  }

  return false;
};


// inRunAs = new Meteor.EnvironmentVariable;
// inRunAs.withValue()?
