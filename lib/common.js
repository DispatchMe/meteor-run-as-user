// This file adds the actual "Meteor.runAsUser" and "Meteor.isRestricted" api
//
// It's done by using a DDP method invocation, setting a user id and a
// "isRestricted" flag on it.
//
// If run inside of an existing DDP invocation a nested version will be created.

var restrictedMode = new Meteor.EnvironmentVariable();

/**
 * Run code restricted
 * @param  {Function} f Code to run in restricted mode
 * @return {Any}   Result of code running
 */
Meteor.runRestricted = function(f) {
  return restrictedMode.withValue(true, f);
};

/**
 * Run code unrestricted
 * @param  {Function} f Code to run in restricted mode
 * @return {Any}   Result of code running
 */
Meteor.runUnrestricted = function(f) {
  return restrictedMode.withValue(false, f);
};

/**
 * Returns true if inside a runAsUser user scope
 * @return {Boolean} True if in a runAsUser user scope
 */
Meteor.isRestricted = function () {
  return !!restrictedMode.get();
};

/**
 * Run as a user
 * @param  {String} userId The id of user to run as
 * @param  {Function} f      Function to run as user
 * @return {Any} Returns function result
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

  return DDP._CurrentInvocation.withValue(invocation, function () {
    return f.apply(invocation, [userId]);
  });
};

/**
 * Run as restricted user
 * @param  {Function} f Function to run unrestricted
 * @return {Any}   Returns function result
 */
Meteor.runAsRestrictedUser = function(userId, f) {
  return Meteor.runRestricted(function() {
    return Meteor.runAsUser(userId, f);
  });
};
