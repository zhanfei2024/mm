// core
const debug = require('debug')('APP:TASK_EMAIL');
const logger = require('../../modules/logger');

// config
const commonConfig = require('../../config/common');

// model
const models = require('../../models');

// library
const _ = require('lodash');
const moment = require('moment');
const viewMethod = require('../../methods/ViewMethod');
const mailModule = require('../../modules/mail');

const defaultTemplateData = {
  siteUrl: commonConfig.baseUrl,
  siteTitle: commonConfig.siteTitle,
  siteTeamName: commonConfig.systemTeamName,
  siteSupportEmail: commonConfig.siteSupportEmail,
  currentYear: moment().format('YYYY'),
  sourceUrl: commonConfig.sourceUrl,
};

const prefix = 'email';

module.exports = (queue) => {


  /**
   * @description send email to admin,forget password.
   * @method user forget password
   * @return {Boolean}
   * @public
   */
  queue.process(`${prefix}::auth::forget_password`, 1, async (job, done) => {
    debug('running task forget password...');

    const send = async () => {
      const data = job.data;
      let lang = job.data.lang;
      switch (lang) {
        case '1':
          lang = 'en';
          break;
        case '2':
          lang = 'hk';
          break;
        case '3':
          lang = 'cn';
          break;
        default:
          lang = 'hk';
          break;
      }

      const path = `mail/auth/forget_password_${lang}.hbs`;
      try {
        const template = await viewMethod.inlineCssCompile(path, _.extend(defaultTemplateData, {
          fullName: `${data.admin.firstName} ${data.admin.lastName}`,
          email: data.admin.email,
          token: data.token
        }));
        await mailModule.sendMail({
          email: data.admin.email,
          lastName: data.admin.lastName,
          firstName: data.admin.firstName,
        }, `[${commonConfig.siteTitle}]:  ${data.admin.email} reset your password!`, template);

        debug('send email successed');
        return Promise.resolve();
      } catch (err) {
        debug('send email failed', err);
        return Promise.reject(err);
      }
    };
    try {
      await send();
      return done();
    } catch (err) {
      return done(err);
    }
  });

  /**
   * @description send email to user,forget password.
   * @method user forget password
   * @return {Boolean}
   * @public
   */
  queue.process(`${prefix}::auth::user_forget_password`, 1, async (job, done) => {
    debug('running task forget password...');

    const send = async () => {
      const data = job.data;
      let lang = job.data.lang;
      switch (lang) {
        case '1':
          lang = 'en';
          break;
        case '2':
          lang = 'hk';
          break;
        case '3':
          lang = 'cn';
          break;
        default:
          lang = 'hk';
          break;
      }

      const path = `mail/auth/forget_password_${lang}.hbs`;
      try {
        const template = await viewMethod.inlineCssCompile(path, _.extend(defaultTemplateData, {
          fullName: `${data.user.firstName} ${data.user.lastName}`,
          email: data.user.email,
          token: data.token
        }));
        await mailModule.sendMail({
          email: data.user.email,
          lastName: data.user.lastName,
          firstName: data.user.firstName,
        }, `[${commonConfig.siteTitle}]:  ${data.user.email} reset your password!`, template);

        debug('send email successed');
        return Promise.resolve();
      } catch (err) {
        debug('send email failed', err);
        return Promise.reject(err);
      }
    };
    try {
      await send();
      return done();
    } catch (err) {
      return done(err);
    }
  });


  /**
   * @description send email to enterprise,forget password.
   * @method enterprise forget password
   * @return {Boolean}
   * @public
   */
  queue.process(`${prefix}::auth::enterprise_forget_password`, 1, async (job, done) => {
    debug('running task forget password...');

    const send = async () => {
      const data = job.data;
      let lang = job.data.lang;
      switch (lang) {
        case '1':
          lang = 'en';
          break;
        case '2':
          lang = 'hk';
          break;
        case '3':
          lang = 'cn';
          break;
        default:
          lang = 'hk';
          break;
      }

      const path = `mail/auth/forget_password_${lang}.hbs`;
      try {
        const template = await viewMethod.inlineCssCompile(path, _.extend(defaultTemplateData, {
          fullName: `${data.enterprise.firstName} ${data.enterprise.lastName}`,
          email: data.enterprise.email,
          token: data.token
        }));

        await mailModule.sendMail({
          email: data.enterprise.email,
          lastName: data.enterprise.lastName,
          firstName: data.enterprise.firstName,
        }, `[${commonConfig.siteTitle}]:  ${data.enterprise.email} reset your password!`, template);

        debug('send email successed');
        return Promise.resolve();
      } catch (err) {
        debug('send email failed', err);
        return Promise.reject(err);
      }
    };
    try {
      await send();
      return done();
    } catch (err) {
      return done(err);
    }
  });


  /**
   * @description Send mail to Enterprise user, apply COC notice.
   * @method Apply COC
   * @return {Boolean}
   * @public
   */
  queue.process(`${prefix}::apply_coc_notice`, 1, async (job, done) => {
    debug('running task apply COC notice...');

    const send = async () => {
      const data = job.data;
      let lang = job.data.lang;
      switch (lang) {
        case '1':
          lang = 'en';
          break;
        case '2':
          lang = 'hk';
          break;
        case '3':
          lang = 'cn';
          break;
        default:
          lang = 'hk';
          break;
      }

      //TODO 需要更换模板
      const path = `mail/enterprise/apply_coc_notice_${lang}.hbs`;
      try {

        // Base data
        const user = await models.User.findById(job.data.candidate.userId);

        const enterprise = await models.Enterprise.findById(job.data.candidate.enterpriseId);

        const template = await viewMethod.inlineCssCompile(path, _.extend(defaultTemplateData, {
          fullName: `${enterprise.firstName} ${enterprise.lastName}`,
          email: enterprise.email,
          enterprise: enterprise,
          user:user
        }));

        await mailModule.sendMail({
          email: enterprise.email,
          lastName: enterprise.lastName,
          firstName: enterprise.firstName,
        }, `[${commonConfig.siteTitle}]: Apply COC Notification.`, template);

        debug('send email successed');
        return Promise.resolve();
      } catch (err) {
        debug('send email failed', err);
        return Promise.reject(err);
      }
    };
    try {
      await send();
      return done();
    } catch (err) {
      return done(err);
    }
  });


  /**
   * @description Send mail to user, review pass.
   * @method Review pass
   * @return {Boolean}
   * @public
   */
  queue.process(`${prefix}::review_pass_notice`, 1, async (job, done) => {
    debug('running task review pass notice...');
    const send = async () => {
      const data = job.data;
      let lang = job.data.lang;
      switch (lang) {
        case '1':
          lang = 'en';
          break;
        case '2':
          lang = 'hk';
          break;
        case '3':
          lang = 'cn';
          break;
        default:
          lang = 'hk';
          break;
      }

      //TODO 需要更换模板
      const path = `mail/enterprise/review_pass_notice_${lang}.hbs`;
      try {

        // Base data
        const coc = await models.Coc.findById(job.data.candidate.cocId);

        const template = await viewMethod.inlineCssCompile(path, _.extend(defaultTemplateData, {
          fullName: `${data.user.firstName} ${data.user.lastName}`,
          email: data.user.email,
          coc: coc
        }));

        await mailModule.sendMail({
          email: data.user.email,
          lastName: data.user.lastName,
          firstName: data.user.firstName,
        }, `[${commonConfig.siteTitle}]: Review pass, COC Notification.`, template);

        debug('send email successed');
        return Promise.resolve();
      } catch (err) {
        debug('send email failed', err);
        return Promise.reject(err);
      }
    };
    try {
      await send();
      return done();
    } catch (err) {
      return done(err);
    }
  });


  /**
   * @description Send mail to user, review not pass.
   * @method Review pass
   * @return {Boolean}
   * @public
   */
  queue.process(`${prefix}::review_not_pass_notice`, 1, async (job, done) => {
    debug('running task review not pass notice...');

    const send = async () => {
      const data = job.data;
      let lang = job.data.lang;
      switch (lang) {
        case '1':
          lang = 'en';
          break;
        case '2':
          lang = 'hk';
          break;
        case '3':
          lang = 'cn';
          break;
        default:
          lang = 'hk';
          break;
      }

      //TODO 需要更换模板
      const path = `mail/enterprise/review_not_pass_notice_${lang}.hbs`;
      try {

        // Base data
        const coc = await models.Coc.findById(job.data.candidate.cocId);

        const template = await viewMethod.inlineCssCompile(path, _.extend(defaultTemplateData, {
          fullName: `${data.user.firstName} ${data.user.lastName}`,
          email: data.user.email,
          coc: coc,
          failContent: data.content
        }));
        await mailModule.sendMail({
          email: data.user.email,
          lastName: data.user.lastName,
          firstName: data.user.firstName,
        }, `[${commonConfig.siteTitle}]: Review not pass, COC Notification.`, template);

        debug('send email successed');
        return Promise.resolve();
      } catch (err) {
        debug('send email failed', err);
        return Promise.reject(err);
      }
    };
    try {
      await send();
      return done();
    } catch (err) {
      return done(err);
    }
  });


  /**
   * @description Send mail to enterprise user, payment notice.
   * @method Payment notice.
   * @return {Boolean}
   * @public
   */
  queue.process(`${prefix}::apply_coc_payment_notice`, 1, async (job, done) => {
    debug('running task apply coc payment notice...');

    const send = async () => {
      const data = job.data;
      let lang = job.data.lang;
      switch (lang) {
        case '1':
          lang = 'en';
          break;
        case '2':
          lang = 'hk';
          break;
        case '3':
          lang = 'cn';
          break;
        default:
          lang = 'hk';
          break;
      }

      //TODO 需要更换模板
      const path = `mail/resignation/dismiss_employee_${lang}.hbs`;
      try {

        // Base data
        const enterprise = await models.Enterprise.findById(job.data.candidate.enterpriseId);

        const coc = await models.Coc.findById(job.data.candidate.cocId);

        const template = await viewMethod.inlineCssCompile(path, _.extend(defaultTemplateData, {
          fullName: `${enterprise.firstName} ${enterprise.lastName}`,
          email: enterprise.email,
          coc: coc
        }));

        await mailModule.sendMail({
          email: enterprise.email,
          lastName: enterprise.lastName,
          firstName: enterprise.firstName,
        }, `[${commonConfig.siteTitle}]: Apply COC member，payment Notification.`, template);

        debug('send email successed');
        return Promise.resolve();
      } catch (err) {
        debug('send email failed', err);
        return Promise.reject(err);
      }
    };
    try {
      await send();
      return done();
    } catch (err) {
      return done(err);
    }
  });


  /**
   * @description Send mail to  member  notice.
   * @method Payment notice.
   * @return {Boolean}
   * @public
   */
  queue.process(`${prefix}::invitation_notice`, 1, async (job, done) => {
    debug('running task invitation notice...');

    const send = async () => {
      const data = job.data.candidate;
      let lang = data.lang;
      const isExisted = data.isExisted;
      switch (lang) {
        case '1':
          lang = 'en';
          break;
        case '2':
          lang = 'hk';
          break;
        case '3':
          lang = 'cn';
          break;
        default:
          lang = 'hk';
          break;
      }

      // 根据邮箱是否注册选择模板
      const path = isExisted === true ? `mail/invite_exist_user.hbs` : `mail/invite.hbs`;
      try {
        // Base data
        const template = await viewMethod.inlineCssCompile(path, _.extend(defaultTemplateData, {
          email: data.email,
          candidate: data
        }));

        await mailModule.sendMail({
          email: data.email,
        }, `[${commonConfig.siteTitle}]: invitation success`, template);

        debug('send email successed');
        return Promise.resolve();
      } catch (err) {
        debug('send email failed', err);
        return Promise.reject(err);
      }
    };
    try {
      await send();
      return done();
    } catch (err) {
      return done(err);
    }
  });



  /**
   * @description Send mail to enterprise user, payment notice.
   * @method Payment notice.
   * @return {Boolean}
   * @public
   */
  queue.process(`${prefix}::apply_activity_payment_notice`, 1, async (job, done) => {
    debug('running task apply coc payment notice...');

    const send = async () => {
      const data = job.data;
      let lang = job.data.lang;
      switch (lang) {
        case '1':
          lang = 'en';
          break;
        case '2':
          lang = 'hk';
          break;
        case '3':
          lang = 'cn';
          break;
        default:
          lang = 'hk';
          break;
      }

      //TODO 需要更换模板
      const path = `mail/resignation/dismiss_employee_${lang}.hbs`;
      try {

        // Base data
        const enterprise = await models.Enterprise.findById(job.data.candidate.enterpriseId);

        const activity = await models.Activity.findById(job.data.candidate.activityId);

        const template = await viewMethod.inlineCssCompile(path, _.extend(defaultTemplateData, {
          fullName: `${enterprise.firstName} ${enterprise.lastName}`,
          email: enterprise.email,
          activity: activity
        }));

        await mailModule.sendMail({
          email: enterprise.email,
          lastName: enterprise.lastName,
          firstName: enterprise.firstName,
        }, `[${commonConfig.siteTitle}]: Apply activity member，payment Notification.`, template);

        debug('send email successed');
        return Promise.resolve();
      } catch (err) {
        debug('send email failed', err);
        return Promise.reject(err);
      }
    };
    try {
      await send();
      return done();
    } catch (err) {
      return done(err);
    }
  });

  /**
   * @description Send mail to Enterprise user, apply activity notice.
   * @method Apply COC
   * @return {Boolean}
   * @public
   */
  queue.process(`${prefix}::apply_activity_notice`, 1, async (job, done) => {
    debug('running task apply activity notice...');
    const send = async () => {
      const data = job.data;
      let lang = job.data.lang;
      switch (lang) {
        case '1':
          lang = 'en';
          break;
        case '2':
          lang = 'hk';
          break;
        case '3':
          lang = 'cn';
          break;
        default:
          lang = 'hk';
          break;
      }

      //TODO 需要更换模板
      const path = `mail/activity/apply_activity_notice_${lang}.hbs`;
      try {

        // Base data
        const userProfile = await models.UserProfile.findOne({ where: { userId: job.data.candidate.userId }});

        const enterprise = await models.Enterprise.findById(job.data.candidate.enterpriseId);

        const activity = await models.Activity.findById(job.data.candidate.activityId);

        const template = await viewMethod.inlineCssCompile(path, _.extend(defaultTemplateData, {
          fullName: `${enterprise.firstName} ${enterprise.lastName}`,
          email: enterprise.email,
          enterprise: enterprise,
          activity:activity,
          userName:`${userProfile.name}`
        }));

        await mailModule.sendMail({
          email: enterprise.email,
          lastName: enterprise.lastName,
          firstName: enterprise.firstName,
        }, `[${commonConfig.siteTitle}]: Apply activity Notification.`, template);

        debug('send email successed');
        return Promise.resolve();
      } catch (err) {
        debug('send email failed', err);
        return Promise.reject(err);
      }
    };
    try {
      await send();
      return done();
    } catch (err) {
      return done(err);
    }
  });


  /**
   * @description Send mail to Enterprise user, apply activity notice.
   * @method Apply activity
   * @return {Boolean}
   * @public
   */
  queue.process(`${prefix}::apply_activity_pass`, 1, async (job, done) => {
    debug('running task apply activity notice...');

    const send = async () => {
      const data = job.data;
      let lang = job.data.lang;
      switch (lang) {
        case '1':
          lang = 'en';
          break;
        case '2':
          lang = 'hk';
          break;
        case '3':
          lang = 'cn';
          break;
        default:
          lang = 'hk';
          break;
      }

      //TODO 需要更换模板
      const path = `mail/activity/apply_activity_pass_${lang}.hbs`;
      try {

        // Base data
        const user = await models.User.findById(job.data.candidate.userId);

        const enterprise = await models.Enterprise.findById(job.data.candidate.enterpriseId);

        const activity = await models.Activity.findById(job.data.candidate.activityId);

        const template = await viewMethod.inlineCssCompile(path, _.extend(defaultTemplateData, {
          fullName: `${enterprise.firstName} ${enterprise.lastName}`,
          email: enterprise.email,
          enterprise: enterprise,
          activity:activity,
          userName:`${user.firstName} ${user.lastName}`
        }));

        await mailModule.sendMail({
          email: user.email,
          lastName: user.lastName,
          firstName: user.firstName,
        }, `[${commonConfig.siteTitle}]: Apply activity pass.`, template);

        debug('send email successed');
        return Promise.resolve();
      } catch (err) {
        debug('send email failed', err);
        return Promise.reject(err);
      }
    };
    try {
      await send();
      return done();
    } catch (err) {
      return done(err);
    }
  });

  /**
   * @description Send mail to Enterprise user, apply activity notice.
   * @method Apply activity
   * @return {Boolean}
   * @public
   */
  queue.process(`${prefix}::apply_activity_not_pass`, 1, async (job, done) => {
    debug('running task apply activity notice...');

    const send = async () => {
      const data = job.data;
      let lang = job.data.lang;
      switch (lang) {
        case '1':
          lang = 'en';
          break;
        case '2':
          lang = 'hk';
          break;
        case '3':
          lang = 'cn';
          break;
        default:
          lang = 'hk';
          break;
      }

      //TODO 需要更换模板
      const path = `mail/activity/apply_activity_not_pass_${lang}.hbs`;
      try {

        // Base data
        const user = await models.User.findById(job.data.candidate.userId);

        const enterprise = await models.Enterprise.findById(job.data.candidate.enterpriseId);

        const activity = await models.Activity.findById(job.data.candidate.activityId);

        const template = await viewMethod.inlineCssCompile(path, _.extend(defaultTemplateData, {
          fullName: `${enterprise.firstName} ${enterprise.lastName}`,
          email: enterprise.email,
          enterprise: enterprise,
          activity:activity,
          description:job.data.content,
          userName:`${user.firstName} ${user.lastName}`
        }));

        await mailModule.sendMail({
          email: user.email,
          lastName: user.lastName,
          firstName: user.firstName,
        }, `[${commonConfig.siteTitle}]: Apply activity not pass.`, template);

        debug('send email successed');
        return Promise.resolve();
      } catch (err) {
        debug('send email failed', err);
        return Promise.reject(err);
      }
    };
    try {
      await send();
      return done();
    } catch (err) {
      return done(err);
    }
  });


};
