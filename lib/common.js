// This file adds the actual "Meteor.runAsUser" and "Meteor.isRestricted" api
//
// It's done by using a DDP method invocation, setting a user id and a
// "isRestricted" flag on it.
//
// If run inside of an existing DDP invocation a nested version will be created.

/**
 * Run as a user
 * @param  {String} userId The id of user to run as
 * @param  {Function} f      Function to run as user
 */
Meteor.runAsUser = function (userId, f) {
  var currentInvocation = DDP._CurrentInvocation.get();

  // Create a new method invocation
  var invocation = new DDPCommon.MethodInvocation(
    (currentInvocation) ? currentInvocation : {
      connection: null
    }
  );

  // Now run as user on this invocation
  invocation.setUserId(userId);

  // Since this is called by runAsUser we set the restricted
  invocation.isRestricted = true;

  return DDP._CurrentInvocation.withValue(invocation, function () {
    return f.apply(invocation, [userId]);
  });
};

/**
 * Returns true if inside a runAsUser user scope
 * @return {Boolean} True if in a runAsUser user scope
 */
Meteor.isRestricted = function () {
  var currentInvocation = DDP._CurrentInvocation.get();

  if (currentInvocation) {
    return !!currentInvocation.isRestricted;
  }

  return false;
};

// inRunAs = new Meteor.EnvironmentVariable;
// inRunAs.withValue()?
