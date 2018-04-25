const debug = require('debug')('APP:USER_BILL');

// model
const models = require('../../models');


// validate
const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');

const modelHelper = require('../../methods/model');


// library
const _ = require('lodash');

async function index(req, res, next) {
  debug('ENTER index method!');

  const filter = await res.paginatorHelper.initFilter2(req.query);
  filter.where.userId = req.params.userId;
  filter.order = [['id', 'DESC']];

  try {
    const result = await modelHelper.findAll('Bills', [], filter, []);

    return res.paginatorLimitPlusStyle(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}

async function show(req, res, next) {
  debug('ENTER show method!');

  const filter = {
    where: {
      id: req.params.billsId
    }
  };

  try {
    const result = await models.Bills.findOne(filter);
    return res.item(result);
  } catch (err) {
    return next(err);
  }

}

async function create(req, res, next) {
  debug('ENTER create method!');

  const rules = {
    userId: 'required|integer|min:1|exists:User,id',
    description: 'nullable|string|max:255',
    currency: 'required|numeric',
    type: 'string|in:invitation,liberties',
    amount: 'required|integer|min:1',
    billdAt:'date'
  };
  const input = validateHelper.pick(req.body, rules);

  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }
  debug('ENTER create method!');

  const t = await models.sequelize.transaction();
  try {
    const result = await models.Bills.create(input, {transaction: t});
    await  t.commit();
    req.params.billsId = result.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function update(req, res, next) {
  debug('ENTER update method!');

  const rules = {
    userId: 'required|integer|min:1|exists:User,id',
    description: 'nullable|string|max:255',
    currency: 'nullable|numeric',
    type: 'nullable|string|in:invitation,liberties',
    amount: 'nullable|integer',
    billdAt:'nullable|date'
  };
  const filter = {
    where: {
      userId: req.body.userId,
      id:req.params.billsId
    }
  };
  const input = validateHelper.pick(req.body, rules, [], Object.keys(rules));
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const result = await models.Bills.findOne(filter, {
      transaction: t
    });
    if (_.isNull(result)) throw new MainError('common', 'notFound');
    await result.updateAttributes(input, {transaction: t});
    await t.commit();

    req.params.billsId = result.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function destroy(req, res, next) {
  debug('ENTER destroy method!');

  const filter = {
    where: {
      id: req.params.billsId,
      userId:req.params.userId
    }
  };
  const t = await models.sequelize.transaction();
  try {
    const result = await models.Bills.findOne(filter, {transaction: t});
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
  create,
  update,
  destroy
};


