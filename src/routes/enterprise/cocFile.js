// core
const debug = require('debug')('APP:ENTERPRISE_COC_FILE');


// library
const cocFileRoute = require('../../routes/mm/cocFile');

/**
 * @api {post} /enterprise/enterprises/coc-file/:cocId([0-9]+)/upload-file 上传文件
 * @apiName uploadFile
 * @apiGroup coc upload
 *
 * @apiParam {array} file 文件列表
 *
 * @apiSuccess {number} id 文件id号
 * @apiSuccess {string} type 文件类型
 * @apiSuccess {string} path 文件路径
 * @apiSuccess {number} size 文件大小
 * @apiSuccess {string} name 上传的文件名
 * @apiSuccess {string} extension 文件拓展名
 * @apiSuccess {string} mime 文件mime类型
 * @apiSuccess {date} createdAt 数据创建日期
 * @apiSuccess {date} updatedAt 数据更新日期
 * @apiSuccess {string} url 文件的url地址
 */
function uploadFile(req, res, next) {
  debug('ENTER uploadFile method!');

  return cocFileRoute.uploadFile(req, res, next);
}


/**
 * @api {post} /enterprise/enterprises/coc-file/:cocId([0-9]+)/upload-image 上传图片
 * @apiName uploadImage
 * @apiGroup coc upload
 *
 * @apiParam {array} file 图片列表
 *
 * @apiSuccess {number} id 图片id号
 * @apiSuccess {string} type 图片类型
 * @apiSuccess {string} path 图片路径
 * @apiSuccess {number} size 图片大小
 * @apiSuccess {string} name 上传的图片名
 * @apiSuccess {string} extension 图片拓展名
 * @apiSuccess {string} mime 图片mime类型
 * @apiSuccess {date} createdAt 数据创建日期
 * @apiSuccess {date} updatedAt 数据更新日期
 * @apiSuccess {string} url 图片的url地址
 */
function uploadImage(req, res, next) {
  debug('ENTER uploadImage method!');

  return cocFileRoute.uploadImage(req, res, next);
}

module.exports = {
  uploadFile,
  uploadImage
};
