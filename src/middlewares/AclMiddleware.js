/**
 * @description employee acl
 * @public
 */
function acl(functionName, ...args) {
  return (req, res, next) => {
    if (
      (functionName === 'hasRole' && res.locals.adminAuth.acl().hasRole(args[0], args[1]) === true) ||
      (functionName === 'can' && res.locals.adminAuth.acl().can(args[0], args[1]) === true)
    ) {
      return next();
    }

    return next(new MainError('auth', 'doNotHavePermissionAccess'));
  };
}

module.exports = acl;
