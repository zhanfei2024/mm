const _ = require('lodash');

class Acl {
  constructor(roles) {
    this.roles = roles || [];
  }

  /**
   * HasRole check
   * @param name
   * @param requireAll
   * @returns {boolean}
   */
  hasRole(name, requireAll = false) {
    let self = this;
    let found = false;
    if (_.isArray(name)) {
      _.every(name, function (value, index) {
        if (self.hasRole(value) && (!requireAll || (requireAll && index === (name.length - 1)))) {
          found = true;
          return false;
        } else {
          return true;
        }
      });
    } else {
      _.every(this.roles, function (value, index) {
        if (value.name === name) {
          found = true;
          return false;
        } else {
          return true;
        }
      });
    }
    return found;
  }

  /**
   * can acl
   * @param permission
   * @param requireAll
   * @returns {boolean}
   */
  can(permission, requireAll = false) {
    let self = this;
    let found = false;
    if (_.isArray(permission)) {
      _.every(permission, function (value, index) {
        if (self.can(value) && (!requireAll || (requireAll && index === (permission.length - 1)))) {
          found = true;
          return false;
        } else {
          return true;
        }
      });
    } else {
      _.every(this.roles, function (role, index) {
        _.every(role.permissions, function (value, index) {
          if (value.name === permission) {
            found = true;
            return false;
          } else {
            return true;
          }
        });
        return !found;
      });
    }
    return found;
  }

  /**
   * ability function
   * @param roles
   * @param permissions
   * @param options
   * @returns {boolean}
   */
  ability(roles, permissions, options = {}) {
    // Convert string to array if that's what is passed in.
    if (!_.isArray(roles)) {
      roles = roles.split(',');
    }
    if (!_.isArray(permissions)) {
      permissions = permissions.split(',');
    }

    // Set up default values and validate options.
    if (typeof options.validateAll !== 'undefined') {
      options.validateAll = false;
    }

    // Loop through roles and permissions and check each.
    let checkedRoles = {};
    let checkedPermissions = {};
    let validateAll = false;
    _.each(roles, function (role) {
      if (Acl.hasRole(role)) {
        checkedRoles.push(role);
      }
    });
    _.each(permissions, function (permission) {
      if (Acl.can(permission)) {
        checkedPermissions.push(permission);
      }
    });

    // If validate all and there is a false in either
    // Check that if validate all, then there should not be any false.
    // Check that if not validate all, there must be at least one true.
    if ((options.validateAll &&
      !(checkedRoles.length === roles.length || checkedPermissions.length === permissions.length)) ||
      (!options.validateAll && (checkedRoles.length > 0 || checkedPermissions.length > 0))
    ) {
      validateAll = true;
    } else {
      validateAll = false;
    }

    return validateAll;
  }
}

module.exports = Acl;
