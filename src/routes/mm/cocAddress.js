const debug = require('debug')('APP:COC_ADDRESS');

// model
const models = require('../../models');
const modelHelper = require('../../methods/model');


// validate
const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');

// library
const _ = require('lodash');

async function index(req, res, next) {
  debug('Enter index method!');

  const rules = {
    cocId: 'nullable|integer|min:1|exists:Coc,id'
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch(err) {
    return res.validateError(err);
  }

  const filter = await res.paginatorHelper.initFilter2(req.query);
  filter.order = [['createdAt', 'DESC']];

  if(!_.isNil(input.cocId)) filter.where.cocId = req.query.cocId;

  try {
    const result = await modelHelper.findAll('Address', [], filter, []);
    return res.paginatorLimitPlusStyle(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}

async function show(req, res, next) {
  debug('Enter show method!');

  const filter = {
    where:{
      id:req.params.addressId,
      cocId:req.params.cocId
    }
  };

  try{
    const result = await models.Address.findOne(filter);
    return res.item(result);
  }catch(err){
    return next(err);
  }

}

async function create(req, res, next) {
  debug('Enter create method!');

  const rules = {
    enterpriseId:'required|integer|min:1',
    cocId:'required|integer|min:1',
    address:'required|string|min:1|max:255',
    phone:'required|string|min:1|max:255',
    fax:'required|string|min:1|max:255',
    email:'required|string|min:1|max:255',
    isActive:'required|boolean',
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  }catch(err){
    return res.validateError(err);
  }
  const t = await models.sequelize.transaction();
  try {
    const  result = await models.Address.create(input, {transaction: t});
    await  t.commit();
    req.params.addressId = result.id;
    return show(req, res, next);
  }catch (err){
    await t.rollback();
    return next(err);
  }
}

async function update(req, res, next) {
  debug('Enter update method!');

  const rules = {
    enterpriseId:'required|integer|min:1',
    cocId:'required|integer|min:1',
    address:'nullable|string|max:255',
    phone:'nullable|string|max:255',
    fax:'nullable|string|max:255',
    email:'nullable|string|max:255',
    isActive:'nullable|boolean',
  };
  const input = validateHelper.pick(req.body, rules, [], Object.keys(rules));
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const result = await models.Address.findById(req.params.addressId, {
      transaction: t
    });
    if (_.isNull(result)) throw new MainError('common', 'notFound');
    await result.updateAttributes(input, {transaction: t});
    await t.commit();

    req.params.addressId = result.id;
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
    const userResult = await models.Address.findOne({where:{
        id:req.params.addressId,
        cocId:req.params.cocId}},
      {transaction: t});
    if (_.isNull(userResult)) throw new MainError('common', 'notFound');

    await userResult.destroy({transaction: t});
    await t.commit();

    return res.return();
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

module.exports={
  index,
  create,
  show,
  update,
  destroy
}


