const debug = require('debug')('APP:FILE');

// model
const models = require('../../models');

// library
const Storage = require('../../modules/storage');
const _ = require('lodash');
const pathHelper = require('path');

// library for resizer
const ImageResizer = require('image-resizer');

const ImageResizerImg = ImageResizer.img;
const ImageResizerStream = ImageResizer.streams;

const fs = require('fs');
const jwtConfig = require('../../config/auth');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategyOption = {
  jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
  secretOrKey: jwtConfig.secret,
  issuer: jwtConfig.issuer,
  audience: 'yoov.com',
  algorithms: 'HS256',
  expiresIn: 30, // minutes
};

function passportJwtStrategy(options = {}) {
  return new JwtStrategy(_.extend(JwtStrategyOption, options), async (jwtPayload, done) => {
    if (jwtPayload.type === 'user') {
      try {
        const result = await models.User.findOne({where: {id: jwtPayload.subjectId}});
        if (result === null) return done(null, false);
        return done(null, result);
      } catch (err) {
        return done(err, false);
      }
    } else if (jwtPayload.type === 'admin') {
      try {
        const result = await models.Admin.findOne({where: {id: jwtPayload.subjectId}});
        if (result === null) return done(null, false);
        return done(null, result, 'admin');
      } catch (err) {
        return done(err, false);
      }
    } else if (jwtPayload.type === 'enterprise') {
      try {
        const result = await models.Enterprise.findOne({where: {id: jwtPayload.subjectId}});
        if (result === null) return done(null, false);
        return done(null, result, 'enterprise');
      } catch (err) {
        return done(err, false);
      }
    }

  });
}

function getResizeImage(req, res, next) {
  try {
    res.setHeader('Cache-Control', 'public, max-age=2592000');

    const path = req.path.replace(/\/files/g, '');
    const image = new ImageResizerImg(req, path);

    image.getFile()
    // .pipe(new ImageResizerStream.identify())
    // .pipe(new ImageResizerStream.resize())
    // .pipe(new ImageResizerStream.filter())
    // .pipe(new ImageResizerStream.optimize())
      .pipe(ImageResizerStream.response(req, res));
  } catch (err) {
    next(err);
  }
}

async function getFile(req, res, next) {
  debug('Enter get file from s3 method!');
  debug(req.params, 'req.params');
  try {
    const file = await models.CocFile.findOne({
      where: {
        cocId: req.params.cocId,
        key: req.params.key,
      },
    });
    if (file === null || file.key !== req.params.key) throw new MainError('common', 'notFound');

    const stream = await Storage.disk('s3').getStream(`coc/${file.cocId}/file/${file.key}.${file.extension}`);
    res.type(stream.headers['content-type']);
    res.setHeader('Content-type', stream.headers['content-type']);
    stream.pipe(res);
    stream.on('end', function () {
      res.end();
    });
  } catch (err) {
    debug('ERROR %j', err);
    return next(err);
  }
}


async function getLogo(req, res, next) {
  debug('Enter getLogo Method');
  try {
    fs.readFile("src/views/logo.ico", "binary", function (error, file) {
      if (error) {
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.write(error + "\n");
        res.end();
      } else {
        res.writeHead(200, {"Content-Type": "image/png"});
        res.write(file, "binary");
        res.end();
      }
    });
  } catch (err) {
    debug('ERROR %j', err);
    return next(err);
  }
}


function getLocalImage(req, res, next) {
  debug('Get local image.');
  try {
    res.setHeader('Cache-Control', 'public, max-age=2592000');
    const path = req.path.replace(/\/files/g, '');

    fs.readFile(pathHelper.join(__dirname, `../../../${path}`), "binary", function (error, file) {
      if (error) {
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.write(error + "\n");
        res.end();
      } else {
        res.writeHead(200, {"Content-Type": "image/png"});
        res.write(file, "binary");
        res.end();
      }
    });
  } catch (err) {
    debug('ERROR %j', err);
    return next(err);
  }
}


module.exports = {
  getResizeImage,
  getFile,
  getLogo,
  passportJwtStrategy,
  getLocalImage
};
