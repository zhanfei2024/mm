// debug
const debug = require('debug')('APP:ROLE');

// model
const models = require('../../models/index');

// validate
const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');

// library
const _ = require('lodash');

// method
const modelHelper = require('../../methods/model');

async function index(req, res, next) {
  debug('Enter index method!');

  const rules = {
    search: 'nullable|string|min:1',
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const filter = await res.paginatorHelper.initFilter2(req.query);
  if (!_.isNil(req.query.search) && req.query.search !== '') {
    filter.where = {
      name: {
        $iLike: `${req.query.search}%`,
      },
    };
  }


  try {
    // const result = await models.Role.findAndCountAll(filter);
    const result = await modelHelper.findAll('Role', [], filter, []);

    return res.paginatorLimitPlusStyle(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}

async function show(req, res, next) {
  debug('Enter show method!');

  try {
    const result = await models.Role.scope(['includePermissions', 'includeEmployee']).findOne({
      where: {
        id: req.params.roleId,
        teamId: res.locals.team.id
      }
    });
    if (_.isNull(result)) return res.error('common', 'notFound');

    return res.item(result);
  } catch (err) {
    return next(err);
  }
}

async function store(req, res, next) {
  debug('Enter store method!');

  const rules = {
    name: 'required|min:1',
    description: 'nullable|string|max:50000',
    permissionIds: 'required|array',
    'permissionIds.*': 'required|integer|exists:Permission,id',
    employeeIds: 'nullable|array',
    'employeeIds.*': 'integer|exists:Employee,id',
    groupIds: 'nullable|array',
    'groupIds.*': 'integer|exists:Group,id'
  };

  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    if (_.isNil(input.employeeIds)) input.employeeIds = [];
    if (!_.isNil(input.groupIds)) {
      const scope = [{method: ['includeGroupsWithSearchIds', input.groupIds]}];
      const result = await models.Employee.scope(scope).findAll({
        where: {
          teamId: res.locals.team.id
        },
        transaction: t
      });
      if (!_.isNull(result)) input.employeeIds = _.concat(input.employeeIds, _.map(result, (item) => +item.id));
    }
    input.employeeIds = _.uniq(input.employeeIds);

    input.teamId = res.locals.team.id;
    const role = await models.Role.create(input, {transaction: t});

    input.permissionIds = _.uniq(input.permissionIds);
    if (input.permissionIds.length > 0) {
      const permissions = await models.Permission.findAll({
        where: {
          id: {
            $in: input.permissionIds
          }
        },
        transaction: t,
      });
      await role.addPermissions(permissions, {
        through: {
          teamId: role.teamId,
        },
        transaction: t
      });
    }

    if (input.employeeIds.length > 0) {
      // await models.RoleEmployee.destroy({
      //   where: {
      //     employeeId: {
      //       $in: input.employeeIds,
      //     },
      //     teamId: role.teamId,
      //   },
      //   transaction: t,
      // });

      const employees = await models.Employee.findAll({
        where: {
          id: {
            $in: input.employeeIds
          },
          teamId: res.locals.team.id
        },
        transaction: t,
      });
      await role.addEmployees(employees, {
        through: {
          teamId: role.teamId,
        },
        transaction: t
      });
    }

    await t.commit();

    req.params.roleId = role.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function update(req, res, next) {
  debug('Enter update method!');

  const rules = {
    name: 'required|min:1',
    description: 'nullable|string|min:1|max:50000',
    permissionIds: 'required|array|min:1',
    'permissionIds.*': 'required|integer|exists:Permission,id',
    employeeIds: 'nullable|array',
    'employeeIds.*': 'integer|exists:Employee,id',
    groupIds: 'nullable|array',
    'groupIds.*': 'integer|exists:Group,id'
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    if (_.isNil(input.employeeIds)) input.employeeIds = [];
    if (!_.isNil(input.groupIds)) {
      const scope = [{method: ['includeGroupsWithSearchIds', input.groupIds]}];
      const result = await models.Employee.scope(scope).findAll({
        where: {
          teamId: res.locals.team.id
        },
        transaction: t
      });
      if (!_.isNull(result)) input.employeeIds = _.concat(input.employeeIds, _.map(result, (item) => +item.id));
    }
    input.employeeIds = _.uniq(input.employeeIds);

    const role = await models.Role.findOne({
      where: {
        id: req.params.roleId,
        teamId: res.locals.team.id
      },
      transaction: t,
    });
    if (_.isNull(role)) throw new MainError('common', 'notFound');

    await role.updateAttributes(input, {transaction: t});

    input.permissionIds = _.uniq(input.permissionIds);
    const permissions = await models.Permission.findAll({
      where: {
        id: {
          $in: input.permissionIds
        }
      },
      transaction: t,
    });
    await role.setPermissions(permissions, {
      through: {
        teamId: res.locals.team.id,
      },
      transaction: t
    });

    if (!_.isNil(input.employeeIds)) input.employeeIds = _.uniq(input.employeeIds);
    if (!_.isNil(input.employeeIds) && input.employeeIds.length > 0) {
      const employees = await models.Employee.findAll({
        where: {
          id: {
            $in: input.employeeIds
          },
          teamId: res.locals.team.id
        },
        transaction: t,
      });

      await role.setEmployees(employees, {
        through: {
          teamId: role.teamId,
        },
        transaction: t
      });
    } else {
      await role.setEmployees(null, {
        through: {
          teamId: role.teamId,
        },
        transaction: t
      });
    }

    await t.commit();

    req.params.roleId = role.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function destroy(req, res, next) {
  debug('Enter destroy method!');

  const t = await models.sequelize.transaction();
  try {
    const result = await models.Role.findOne({
      where: {
        id: req.params.roleId,
        teamId: res.locals.team.id
      },
      transaction: t,
    });
    if (_.isNull(result)) throw new MainError('common', 'notFound');

    await result.destroy({transaction: t});
    await t.commit();

    return res.return();
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
