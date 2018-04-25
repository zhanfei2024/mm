const debug = require('debug')('APP:SETTING');

// model
const models = require('../../models');
const modelHelper = require('../../methods/model');


// validate
const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');

// library
const _ = require('lodash');
const path = require('path');
const randomstring = require("randomstring");
const Storage = require('../../modules/storage');

/**
 * @api {get} /admin/setting 获取平台设置信息
 * @apiName show
 * @apiGroup admin setting
 *
 * @apiSuccess {number} id id
 * @apiSuccess {string} logoUrl logo图片地址
 * @apiSuccess {object} global 配置信息
 * @apiSuccess {string} global.name 名称
 * @apiSuccess {string} global.title 标题
 * @apiSuccess {string} global.description 描述
 * @apiSuccess {string} global.keywords 关键字
 * @apiSuccess {string} global.key logo文件名
 * @apiSuccess {string} global.extension logo拓展名
 * @apiSuccess {string} global.footer 公用底部
 * @apiSuccess {string} global.statisticsCode 代码统计
 */
async function show(req, res, next) {
    debug('Enter show method!');

    try {
        const result = await models.Setting.findOne();
        if (!_.isNull(result)) result.global = JSON.parse(result.global);

        return res.item(result);
    } catch (err) {
        return next(err);
    }

}

/**
 * @api {put} /admin/setting 设置平台信息
 * @apiName update
 * @apiGroup admin setting
 *
 * @apiParam {string} [name] 名称
 * @apiParam {string} [title] 标题
 * @apiParam {string} [description] 描述
 * @apiParam {string} [keywords] 关键字
 * @apiParam {string} [footer] 公用底部
 * @apiParam {string} [statisticsCode] 代码统计
 * @apiParam {file} [file] logo图片
 *
 * @apiSuccess {number} id id
 * @apiSuccess {string} logoUrl logo图片地址
 * @apiSuccess {object} global 配置信息
 * @apiSuccess {string} global.name 名称
 * @apiSuccess {string} global.title 标题
 * @apiSuccess {string} global.description 描述
 * @apiSuccess {string} global.keywords 关键字
 * @apiSuccess {string} global.key logo文件名
 * @apiSuccess {string} global.extension logo拓展名
 * @apiSuccess {string} global.footer 公用底部
 * @apiSuccess {string} global.statisticsCode 代码统计
 */
async function update(req, res, next) {
    debug('Enter update method!');

    const rules = {
        name: 'nullable|string|min:1',
        title: 'nullable|string|min:1',
        description: 'nullable|string|min:1',
        keywords: 'nullable|string|min:1',
        footer: 'nullable|string|min:1',
        statisticsCode: 'nullable|string|min:1',
        file: 'nullable|array',
        'file.*': 'required_if:file|file|image'
    };

    const input = validateHelper.pick(req.body, rules, ['file.*']);
    try {
        await inputCheck.validate(input, rules, res.validatorMessage);
    } catch (err) {
        return res.validateError(err);
    }

    try {
        const result = await models.Setting.findOne();
        if (_.isNull(result)) throw new MainError('common', 'notFound');
        let g = JSON.parse(result.global);
        delete input.file;
        _.assign(g, input);


        await result.updateAttributes({ global: JSON.stringify(g) });

        if (_.isEmpty(req.body.file)) {
            return show(req, res, next);
        } else {
            req.params.settingId = result.id;
            uploadLogo(req, res, next);
        }

    } catch (err) {
        return next(err);
    }
}

async function uploadLogo(req, res, next) {
    debug('ENTER upload logo method!');

    const rules = {
        file: 'required|array',
        'file.*': 'file|image'
    };
    const input = validateHelper.pick(req.body, rules, ['file.*']);
    try {
        await inputCheck.validate(input, rules, res.validatorMessage);
    } catch (err) {
        return res.validateError(err);
    }

    const t = await models.sequelize.transaction();
    try {
        const setting = await models.Setting.findOne({
            where: {
                id: req.params.settingId
            },
            transaction: t
        });
        if (_.isNull(setting)) throw new MainError('common', 'notFound');
        const g = JSON.parse(setting.global);

        const fileKey = randomstring.generate(24);
        const extname = path.extname(input.file[0].originalname).toLowerCase();
        // 云地址
        const cloundPath = `/uploads/setting/${setting.id}/image/${fileKey}${extname}`;
        // upload files
        await Storage.disk('local').put(input.file[0].path, cloundPath);
        // 只能保存一张
        await Storage.disk('local').delete(g.path);
    
        // 更新
        g.key = fileKey;
        g.extension = extname.substring(1);
        g.path = cloundPath;
        await setting.updateAttributes({ global: JSON.stringify(g) }, { transaction: t });
        await t.commit();

        return show(req, res, next);
    } catch (err) {
        await t.rollback();
        return next(err);
    }
}

module.exports = {
    show,
    update,
    uploadLogo
}


