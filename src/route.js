// Core
const debug = require('debug')('APP:ROUTES');

// Library
const _ = require('lodash');
const moment = require('moment');
const acl = require('./middlewares/AclMiddleware');
const rateLimitMethod = require('./methods/RateLimitMethod');


// Config
const commonConfig = require('./config/common');


// Middleware define
const jwtMiddleware = require('./middlewares/AdminJwtAuthMiddleware');
const adminJwtAuthMiddleware = require('./middlewares/GetAdminMiddleware');
const passportMiddleware = require('./middlewares/PassportMiddleware');

// Paths
const apiPublicPath = `${commonConfig.apiPath}/public`;
const apiEnterprisePath = `${commonConfig.apiPath}/enterprise`;
const apiAdminPath = `${commonConfig.apiPath}/admin`;
const apiUserPath = `${commonConfig.apiPath}/user`;

// Routes
// 文件系统文件
const fromS3GetFileRoute = require('./routes/mm/fromS3GetFile');

// 公开文件
const publicTagRoute = require('./routes/mm/tag');
const publicLocationRoute = require('./routes/mm/location');
const publicCountryRoute = require('./routes/country');
const publicCurrencyRoute = require('./routes/currency');
const publicLanguageRoute = require('./routes/language');
const publicCocRoute = require('./routes/public/coc');
const publicPostRoute = require('./routes/public/post');
const publicPostCategoryRoute = require('./routes/public/postCategory');
const publicIndustryRoute = require('./routes/public/industry');
const publicActivityCategoriesRoute = require('./routes/public/activityCategories');
const publicActivityRoute = require('./routes/public/activity');
const publicSlideShowRoute = require('./routes/public/slideShow');
const publicLinkRoute = require('./routes/public/link');
const publicJointWorkRoute = require('./routes/public/jointWork');
const publicHistoryRoute = require('./routes/public/history');
const publicAnnouncementRoute = require('./routes/public/announcement');
const publicRulesRoute = require('./routes/public/rules');
const publicBankRoute = require('./routes/public/bank');
const publicGroupRoute = require('./routes/public/group');
const publicSettingRoute = require('./routes/public/setting');
const publicUserRoute = require('./routes/user');
const publicTabRoute = require('./routes/mm/tab');
const publicPositionRoute = require('./routes/public/memberRating');


// 用户文件
const userAuthRoute = require('./routes/user/auth');
const userSelfRoute = require('./routes/user/user');
const userExperience = require("./routes/user/userExperience");
const userProfile = require("./routes/user/userProfile");
const userCompany = require("./routes/user/userCompany");
const userBillRoute = require("./routes/user/bills");
const userCandidateRoute = require("./routes/user/userCandidate");
const userInvitationRoute = require("./routes/user/userInvitation");
const userActivityCandidateRoute = require("./routes/user/activityCandidate");
const userBankRoute = require('./routes/user/bank');
const userEducationRoute = require('./routes/user/userEducation');
const userMessageRoute = require('./routes/user/message');
const userCocRoute = require('./routes/user/coc.js');
const userAnnouncementRoute = require('./routes/user/announcement');


// 企业文件
const enterpriseAuthRoute = require('./routes/enterprise/auth');
const enterpriseSelfRoute = require('./routes/enterprise/enterprise');
const enterpriseCocRouter = require('./routes/enterprise/coc');
const enterprisePostRoute = require('./routes/enterprise/post');
const enterprisePostImageRoute = require('./routes/enterprise/postImage');
const enterpriseAnnouncementRoute = require('./routes/enterprise/announcement');
const enterpriseGroupRoute = require('./routes/enterprise/group');
const enterpriseMemberRoute = require('./routes/enterprise/member');
const enterpriseCocHistoryRoute = require('./routes/enterprise/cocHistory');
const enterpriseCocRulesRoute = require('./routes/enterprise/cocRules');
const enterpriseCocAddressRoute = require('./routes/enterprise/cocAddress');
const enterpriseInvitationRoute = require('./routes/enterprise/invitation');
const enterpriseApplyRoute = require('./routes/enterprise/apply');
const enterpriseCocFileRoute = require('./routes/enterprise/cocFile');
const enterpriseActivityRoute = require('./routes/enterprise/activity');
const enterpriseActivityAttachmentRoute = require('./routes/enterprise/activityAttachment');
const enterpriseActivityCandidateRoute = require("./routes/enterprise/activityCandidate");
const enterpriseCandidateRoute = require('./routes/enterprise/candidate');
const enterpriseBankRoute = require('./routes/enterprise/bank');
const enterpriseSlideShowRoute = require('./routes/enterprise/slideShow');
const enterpriseJointWorkRoute = require('./routes/enterprise/jointWork');
const enterpriseMessageRoute = require('./routes/enterprise/message');
const enterpriseStatisticsRoute = require('./routes/enterprise/statistics');
const enterpriseTabRoute = require('./routes/enterprise/tab');
const enterprisePositionRoute = require('./routes/enterprise/memberRating');

// 后台文件
const adminStatisticsRoute = require('./routes/admin/statistics');
const adminSettingRoute = require('./routes/admin/setting');
const adminAuthRoute = require('./routes/admin/auth');
const adminSelfRoute = require('./routes/admin/admin');
const adminUserRoute = require('./routes/admin/user');
const adminInvitationRoute = require('./routes/admin/invitation');
const adminCocRouter = require('./routes/admin/coc');
const adminCocAnnouncementRoute = require('./routes/admin/cocAnnouncement');
const adminCocRuleRoute = require('./routes/admin/cocRule');
const adminCocMessageRoute = require('./routes/admin/cocMessage');
const adminBankRoute = require('./routes/admin/cocBank');
const adminEnterpriseRoute = require('./routes/admin/enterprise');
const adminPostRoute = require('./routes/admin/post');
const adminPostCategoryRoute = require('./routes/admin/postCategory');
const adminIndustryRoute = require('./routes/admin/industry');
const adminCandidateRoute = require('./routes/admin/candidate');
const adminActivityRoute = require('./routes/admin/activity');
const adminActivityCandidateRoute = require('./routes/admin/activityCandidate');
const adminActivityCategoriesRoute = require('./routes/admin/activityCategories');
const adminSlideShowRoute = require('./routes/admin/slideShow');
const adminLinkRoute = require('./routes/admin/link');

/**
 * Method
 * @module Method
 */
function bootstrapRoute(app) {


  /** *********************************************
   *
   *
   * 文件系统路由
   *
   *
   ***********************************************/
  // 使用中
  app.get('/files/uploads/setting/:settingId([0-9]+)/image/:key.:ext', fromS3GetFileRoute.getLocalImage);
  app.get('/files/uploads/coc/:cocId([0-9]+)/file/:key.:ext', fromS3GetFileRoute.getFile);
  app.get('/files/uploads/activity/:activityId([0-9]+)/file/:key/*?.:ext', fromS3GetFileRoute.getLocalImage);
  app.get('/files/uploads/coc/:cocId([0-9]+)/image/:key.:ext', fromS3GetFileRoute.getLocalImage);
  app.get('/files/uploads/post/:postId([0-9]+)/image/:key/original.:ext', fromS3GetFileRoute.getLocalImage);
  app.get('/files/uploads/candidate/:candidateId([0-9]+)/voucher/:key.:ext', passportMiddleware.passportAuthenticateFileJWT(), fromS3GetFileRoute.getLocalImage);
  app.get('/files/uploads/userProfile/:userId([0-9]+)/image/:key.:ext', fromS3GetFileRoute.getLocalImage);
  app.get('/files/uploads/link/:linkId([0-9]+)/image/:key.:ext', fromS3GetFileRoute.getLocalImage);
  app.get('/files/uploads/coc/:cocId([0-9]+)/logo/:key.:ext', fromS3GetFileRoute.getLocalImage);
  app.get('/files/uploads/coc/:cocId([0-9]+)/coverImage/:key.:ext', fromS3GetFileRoute.getLocalImage);
  app.get('/files/uploads/joint-work/:jointWorkId/image/:key.:ext', fromS3GetFileRoute.getLocalImage);
  app.get(`/files/uploads/userProfile/:userProfileId([0-9]+)/image/:key.:ext`, fromS3GetFileRoute.getLocalImage);
  app.get(`/files/uploads/slideShow/:slideShowId([0-9]+)/image/:key.:ext`, fromS3GetFileRoute.getLocalImage);
  app.get(`/files/uploads/enterprise/:enterpriseId([0-9]+)/IDBack/image/:key.:ext`, fromS3GetFileRoute.getLocalImage);
  app.get(`/files/uploads/enterprise/:enterpriseId([0-9]+)/IDFront/image/:key.:ext`, fromS3GetFileRoute.getLocalImage);
  app.get(`/files/uploads/coc/:cocId([0-9]+)/qualification/:key.:ext`, fromS3GetFileRoute.getLocalImage);
  app.get('/files/uploads/post/static/:year([0-9]+){4}/:month([0-9]+){2}/:key.:ext', fromS3GetFileRoute.getLocalImage);


  /** *********************************************
   *
   *
   * 公共路由
   *
   *
   ***********************************************/

  // 商会
  app.get(`${apiPublicPath}/cocs`, publicCocRoute.indexcocs);
  app.get(`${apiPublicPath}/cocs/:cocId([0-9]+)`, publicCocRoute.showCoc);

  // 文章
  app.get(`${apiPublicPath}/posts`, publicPostRoute.indexPosts);
  app.get(`${apiPublicPath}/posts/:postId([0-9]+)`, publicPostRoute.showPost);

  // 行业
  app.get(`${apiPublicPath}/industries`, publicIndustryRoute.indexIndustries);
  app.get(`${apiPublicPath}/industries/:industryId([0-9]+)`, publicIndustryRoute.showIndustry);

  // 地区
  app.get(`${apiPublicPath}/locations`, publicLocationRoute.index);
  app.get(`${apiPublicPath}/locations/tree`, publicLocationRoute.indexTree);
  app.get(`${apiPublicPath}/locations/:locationId([0-9]+)`, publicLocationRoute.show);

  // 文章种类
  app.get(`${apiPublicPath}/post/categories`, publicPostCategoryRoute.indexPostCategories);
  app.get(`${apiPublicPath}/post/categories/indexTree`, publicPostCategoryRoute.indexTrees);
  app.get(`${apiPublicPath}/post/categories/:categoryId([0-9]+)`, publicPostCategoryRoute.showPostCategory);


  // 活动
  app.get(`${apiPublicPath}/activities`, publicActivityRoute.indexActivities);
  app.get(`${apiPublicPath}/activities/:activityId([0-9]+)`, publicActivityRoute.showActivitie);


  // 活动种类
  app.get(`${apiPublicPath}/activities/categories`, publicActivityCategoriesRoute.indexCategories);
  app.get(`${apiPublicPath}/activities/categories/tree`, publicActivityCategoriesRoute.indexTrees);
  app.get(`${apiPublicPath}/activities/categories/:categoryId([0-9]+)`, publicActivityCategoriesRoute.showCategory);


  // 合作商会
  app.get(`${apiPublicPath}/cocs/:cocId([0-9]+)/joint-work`, publicJointWorkRoute.indexJoinWork);

  // 商会历程
  app.get(`${apiPublicPath}/cocs/:cocId([0-9]+)/coc-histories`, publicHistoryRoute.indexHistories);
  app.get(`${apiPublicPath}/cocs/:cocId([0-9]+)/coc-histories/:cocHistoryId([0-9]+)`, publicHistoryRoute.showHistory);


  // 商会公告
  app.get(`${apiPublicPath}/cocs/:cocId([0-9]+)/announcements`, publicAnnouncementRoute.indexAnnouncements);
  app.get(`${apiPublicPath}/cocs/:cocId([0-9]+)/announcements/:announcementId([0-9]+)`, publicAnnouncementRoute.showAnnouncement);

  // 入会须知和注意事项
  app.get(`${apiPublicPath}/cocs/:cocId([0-9]+)/rules`, publicRulesRoute.indexRules);
  app.get(`${apiPublicPath}/cocs/:cocId([0-9]+)/rules/:ruleId([0-9]+)`, publicRulesRoute.showRule);

  // 银行账户
  app.get(`${apiPublicPath}/cocs/:cocId([0-9]+)/bank`, publicBankRoute.indexBanks);
  app.get(`${apiPublicPath}/cocs/:cocId([0-9]+)/bank/:bankId([0-9]+)`, publicBankRoute.showBank);

  // 职位显示
  app.get(`${apiPublicPath}/cocs/:cocId([0-9]+)/groups`, publicGroupRoute.indexGourps);
  app.get(`${apiPublicPath}/cocs/:cocId([0-9]+)/groups/:groupId([0-9]+)`, publicGroupRoute.showGourp);

  // 职务列表
  app.get(`${apiPublicPath}/cocs/:cocId([0-9]+)/member_ratings`, publicPositionRoute.memberRatingIndex);


  // Common API
  app.get(`${apiPublicPath}/tags`, publicTagRoute.index);
  app.get(`${apiPublicPath}/countries`, publicCountryRoute.index);
  app.get(`${apiPublicPath}/currencies`, publicCurrencyRoute.index);
  app.get(`${apiPublicPath}/languages`, publicLanguageRoute.index);
  app.get(`${apiPublicPath}/slide-show`, publicSlideShowRoute.indexSlides);
  app.get(`${apiPublicPath}/links`, publicLinkRoute.indexLinks);
  app.get(`${apiPublicPath}/setting`, publicSettingRoute.showSetting);

  // 检查用户是否存在user 表中
  app.get(`${apiPublicPath}/users`, publicUserRoute.checkUserIsExists);


  // tab单页
  app.get(`${apiPublicPath}/cocs/:cocId([0-9]+)/tabs`, publicTabRoute.index);
  app.get(`${apiPublicPath}/cocs/:cocId([0-9]+)/tabs/:tabId([0-9]+)`, publicTabRoute.show);


  /** *********************************************
   *
   *
   * 商会用户路由
   *
   *
   ***********************************************/

  // 企业用户用户认证
  app.post(`${apiEnterprisePath}/auth/zendesk/login`, enterpriseAuthRoute.loginZendesk);
  app.post(`${apiEnterprisePath}/auth/register`, enterpriseAuthRoute.register);
  app.post(`${apiEnterprisePath}/auth/login`, rateLimitMethod.publicLoginLimitMiddleware, enterpriseAuthRoute.login);
  app.post(`${apiEnterprisePath}/auth/refresh`, passportMiddleware.passportAuthenticateEnterpriseJWT('enterprise-jwt-allow-expired'), enterpriseAuthRoute.refreshToken);
  app.get(`${apiEnterprisePath}/auth/verify-email`, enterpriseAuthRoute.verifyEmail);
  app.post(`${apiEnterprisePath}/auth/forget-password`, enterpriseAuthRoute.forgetPassword);
  app.post(`${apiEnterprisePath}/auth/reset-password`, enterpriseAuthRoute.resetPassword);

  // 企业用户token认证
  app.use(`${apiEnterprisePath}/*`, rateLimitMethod.authApiCallLimitMiddleware, passportMiddleware.passportAuthenticateEnterpriseJWT());


  //企业账户登入资料
  app.get(`${apiEnterprisePath}/enterprises/self`, enterpriseSelfRoute.show);
  app.put(`${apiEnterprisePath}/enterprises/:enterpriseId([0-9]+)`, enterpriseSelfRoute.update);
  app.use(`${apiEnterprisePath}/is-activated`, enterpriseAuthRoute.isActivated);
  app.post(`${apiEnterprisePath}/auth/change-password`, enterpriseAuthRoute.changePassword);
  app.get(`${apiEnterprisePath}/sessions`, enterpriseAuthRoute.indexSession);
  app.delete(`${apiEnterprisePath}/sessions/:enterpriseSessionId([0-9]+)/revoke`, enterpriseAuthRoute.revokeSession);
  app.post(`${apiEnterprisePath}/enterprises/id-front`, enterpriseSelfRoute.uploadIDFront);
  app.post(`${apiEnterprisePath}/enterprises/id-back`, enterpriseSelfRoute.uploadIDBack);

  //商会需要的统计信息
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/statistics`, enterpriseStatisticsRoute.show);


  // 商会管理
  app.get(`${apiEnterprisePath}/enterprises/cocs`, enterpriseCocRouter.index);
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)`, enterpriseCocRouter.show);
  app.post(`${apiEnterprisePath}/enterprises/cocs`, enterpriseCocRouter.create);
  app.post(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/upload-logo`, enterpriseCocRouter.uploadLogo);
  app.post(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/upload-cover`, enterpriseCocRouter.uploadCover);
  app.post(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/upload-qualification`, enterpriseCocRouter.uploadQualification);
  app.put(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)`, enterpriseCocRouter.update);
  app.delete(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)`, enterpriseCocRouter.destroy);


  // 商会历程
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/coc-histories`, enterpriseCocHistoryRoute.index);
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/coc-histories/:cocHistoryId([0-9]+)`, enterpriseCocHistoryRoute.show);
  app.post(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/coc-histories`, enterpriseCocHistoryRoute.create);
  app.put(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/coc-histories/:cocHistoryId([0-9]+)`, enterpriseCocHistoryRoute.update);
  app.delete(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/coc-histories/:cocHistoryId([0-9]+)`, enterpriseCocHistoryRoute.destroy);


  // 商会candidate管理
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/candidates`, enterpriseCandidateRoute.index);
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/candidates/:candidateId([0-9]+)`, enterpriseCandidateRoute.show);


  // 商会规章
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/coc-rules`, enterpriseCocRulesRoute.index);
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/coc-rules/:ruleId([0-9]+)`, enterpriseCocRulesRoute.show);
  app.post(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/coc-rules`, enterpriseCocRulesRoute.create);
  app.put(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/coc-rules/:ruleId([0-9]+)`, enterpriseCocRulesRoute.update);
  app.delete(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/coc-rules/:ruleId([0-9]+)`, enterpriseCocRulesRoute.destroy);


  // 商会地址
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/coc-addresses`, enterpriseCocAddressRoute.index);
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/coc-addresses/:addressId([0-9]+)`, enterpriseCocAddressRoute.show);
  app.post(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/coc-addresses`, enterpriseCocAddressRoute.create);
  app.put(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/coc-addresses/:addressId([0-9]+)`, enterpriseCocAddressRoute.update);
  app.delete(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/coc-addresses/:addressId([0-9]+)`, enterpriseCocAddressRoute.destroy);


  // 文章管理
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/posts`, enterprisePostRoute.index);
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/posts/:postId([0-9]+)`, enterprisePostRoute.show);
  app.post(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/posts`, enterprisePostRoute.create);
  app.put(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/posts/:postId([0-9]+)`, enterprisePostRoute.update);
  app.delete(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/posts/:postId([0-9]+)`, enterprisePostRoute.destroy);


  // 文章图片管理
  app.post(`${apiEnterprisePath}/enterprises/posts/:postId([0-9]+)/upload-image`, enterprisePostImageRoute.uploadImages);
  app.post(`${apiEnterprisePath}/enterprises/posts/:postId([0-9]+)/upload-cover`, enterprisePostImageRoute.uploadCover);


  // 商会文件管理
  app.post(`${apiEnterprisePath}/enterprises/coc-file/:cocId([0-9]+)/upload-file`, enterpriseCocFileRoute.uploadFile);
  app.post(`${apiEnterprisePath}/enterprises/coc-file/:cocId([0-9]+)/upload-image`, enterpriseCocFileRoute.uploadImage);


  // 公告管理
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/announcements`, enterpriseAnnouncementRoute.index);
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/announcements/:announcementId([0-9]+)`, enterpriseAnnouncementRoute.show);
  app.post(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/announcements`, enterpriseAnnouncementRoute.create);
  app.put(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/announcements/:announcementId([0-9]+)`, enterpriseAnnouncementRoute.update);
  app.delete(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/announcements/:announcementId([0-9]+)`, enterpriseAnnouncementRoute.destroy);


  // 会籍管理
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/groups`, enterpriseGroupRoute.index);
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/groups/:groupId([0-9]+)`, enterpriseGroupRoute.show);
  app.post(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/groups`, enterpriseGroupRoute.create);
  app.put(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/groups/:groupId([0-9]+)`, enterpriseGroupRoute.update);
  app.delete(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/groups/:groupId([0-9]+)`, enterpriseGroupRoute.destroy);


  // 职务管理
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/member_ratings`, enterprisePositionRoute.indexRating);
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/member_rating/:memberRatingId([0-9]+)`, enterprisePositionRoute.showDetails);
  app.post(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/member_rating`, enterprisePositionRoute.createRating);
  app.put(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/member_rating/:memberRatingId([0-9]+)`, enterprisePositionRoute.updateRating);
  app.delete(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/member_rating/:memberRatingId([0-9]+)`, enterprisePositionRoute.destroyRating);


  // 会员模块
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/members`, enterpriseMemberRoute.index);
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/members/:memberId([0-9]+)`, enterpriseMemberRoute.show);
  app.put(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/members/:memberId([0-9]+)`, enterpriseMemberRoute.update);
  app.delete(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/members/:memberId([0-9]+)`, enterpriseMemberRoute.destroy);


  // 商会邀请会员
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/invitations`, enterpriseInvitationRoute.index);
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/invitations/:invitationId([0-9]+)`, enterpriseInvitationRoute.show);
  app.post(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/invitations`, enterpriseInvitationRoute.create);


  // 申请商会模块
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/applies`, enterpriseApplyRoute.index);
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/applies/:applyId([0-9]+)`, enterpriseApplyRoute.show);
  app.put(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/applies/:applyId([0-9]+)`, enterpriseApplyRoute.update);


  // 活动模块
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/activities`, enterpriseActivityRoute.index);
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/activities/:activityId([0-9]+)`, enterpriseActivityRoute.show);
  app.post(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/activities`, enterpriseActivityRoute.create);
  app.put(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/activities/:activityId([0-9]+)`, enterpriseActivityRoute.update);
  app.delete(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/activities/:activityId([0-9]+)`, enterpriseActivityRoute.destroy);


  // 活动附件模块
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/activities/:activityId([0-9]+)/attachments`, enterpriseActivityAttachmentRoute.index);
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/activities/:activityId([0-9]+)/attachments/:attachmentId([0-9]+)`, enterpriseActivityAttachmentRoute.show);
  app.post(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/activities/:activityId([0-9]+)/attachments`, enterpriseActivityAttachmentRoute.uploadAttachment);
  app.delete(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/activities/:activityId([0-9]+)/attachments/:attachmentId([0-9]+)`, enterpriseActivityAttachmentRoute.destroy);


  // 活动申请记录模块
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/activities/candidates`, enterpriseActivityCandidateRoute.index);
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/activities/candidates/exports`, enterpriseActivityCandidateRoute.exports);
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/activities/:activityId([0-9]+)/candidates`, enterpriseActivityCandidateRoute.index);
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/activities/:activityId([0-9]+)/candidates/:candidateId([0-9]+)`, enterpriseActivityCandidateRoute.show);
  app.put(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/activities/:activityId([0-9]+)/candidates/:candidateId([0-9]+)`, enterpriseActivityCandidateRoute.update);
  app.delete(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/activities/:activityId([0-9]+)/candidates/:candidateId([0-9]+)`, enterpriseActivityCandidateRoute.destroy);


  // 首页轮播图模块
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/slide-show`, enterpriseSlideShowRoute.index);
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/slide-show/:slideShowId([0-9]+)`, enterpriseSlideShowRoute.show);
  app.post(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/slide-show`, enterpriseSlideShowRoute.create);
  app.put(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/slide-show/:slideShowId([0-9]+)`, enterpriseSlideShowRoute.update);
  app.delete(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/slide-show/:slideShowId([0-9]+)`, enterpriseSlideShowRoute.destroy);
  app.post(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/slide-show/:slideShowId([0-9]+)`, enterpriseSlideShowRoute.uploadSlideShow);


  // 设定收费银行账户模块
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/bank`, enterpriseBankRoute.index);
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/bank/:bankId([0-9]+)`, enterpriseBankRoute.show);
  app.post(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/bank`, enterpriseBankRoute.create);
  app.put(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/bank/:bankId([0-9]+)`, enterpriseBankRoute.update);
  app.delete(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/bank/:bankId([0-9]+)`, enterpriseBankRoute.destroy);

  // 添加合作商会模块
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/joint-work`, enterpriseJointWorkRoute.index);
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/joint-work/:jointWorkId([0-9]+)`, enterpriseJointWorkRoute.show);
  app.post(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/joint-work`, enterpriseJointWorkRoute.create);
  app.post(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/joint-work/:jointWorkId([0-9]+)/upload-logo`, enterpriseJointWorkRoute.uploadLogo);
  app.put(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/joint-work/:jointWorkId([0-9]+)`, enterpriseJointWorkRoute.update);
  app.delete(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/joint-work/:jointWorkId([0-9]+)`, enterpriseJointWorkRoute.destroy);

  // 留言管理
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/message`, enterpriseMessageRoute.index);
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/message/:messageId([0-9]+)`, enterpriseMessageRoute.show);
  app.put(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/message/:messageId([0-9]+)`, enterpriseMessageRoute.update);
  app.delete(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/message/:messageId([0-9]+)`, enterpriseMessageRoute.destroy);


  // tab 管理
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/tabs`, enterpriseTabRoute.index);
  app.get(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/tabs/:tabId([0-9]+)`, enterpriseTabRoute.show);
  app.post(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/tabs`, enterpriseTabRoute.create);
  app.put(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/tabs/:tabId([0-9]+)`, enterpriseTabRoute.update);
  app.delete(`${apiEnterprisePath}/enterprises/cocs/:cocId([0-9]+)/tabs/:tabId([0-9]+)`, enterpriseTabRoute.destroy);
  /** *********************************************
   *
   *
   * 会员用户路由
   *
   *
   ***********************************************/
  // 用户认证
  app.post(`${apiUserPath}/auth/zendesk/login`, userAuthRoute.loginZendesk);
  app.post(`${apiUserPath}/auth/register`, userAuthRoute.register);
  app.post(`${apiUserPath}/auth/login`, rateLimitMethod.publicLoginLimitMiddleware, userAuthRoute.login);
  app.post(`${apiUserPath}/auth/refresh`, passportMiddleware.passportAuthenticateUserJWT('user-jwt-allow-expired'), userAuthRoute.refreshToken);
  app.get(`${apiUserPath}/auth/verify-email`, userAuthRoute.verifyEmail);
  app.post(`${apiUserPath}/auth/forget-password`, userAuthRoute.forgetPassword);
  app.post(`${apiUserPath}/auth/reset-password`, userAuthRoute.resetPassword);

  // 用户token认证
  app.use(`${apiUserPath}/*`, rateLimitMethod.authApiCallLimitMiddleware, passportMiddleware.passportAuthenticateUserJWT());

  // 用户个人资料
  app.get(`${apiUserPath}/users/self`, userSelfRoute.show);
  app.put(`${apiUserPath}/users/:userId([0-9]+)`, userSelfRoute.update);
  app.use(`${apiUserPath}/is-activated`, userAuthRoute.isActivated);
  app.post(`${apiUserPath}/auth/change-password`, userAuthRoute.changePassword);
  app.get(`${apiUserPath}/sessions`, userAuthRoute.indexSession);
  app.delete(`${apiUserPath}/sessions/:userSessionId([0-9]+)/revoke`, userAuthRoute.revokeSession);


  // 用户工作经验
  app.get(`${apiUserPath}/users/experience`, userExperience.index);
  app.get(`${apiUserPath}/users/experience/:experienceId([0-9]+)`, userExperience.show);
  app.post(`${apiUserPath}/users/experience`, userExperience.create);
  app.put(`${apiUserPath}/users/experience/:experienceId([0-9]+)`, userExperience.update);
  app.delete(`${apiUserPath}/users/experience/:experienceId([0-9]+)`, userExperience.destroy);


  // 用户资料
  app.get(`${apiUserPath}/users/user-profile`, userProfile.show);
  app.post(`${apiUserPath}/users/user-profile`, userProfile.create);
  app.put(`${apiUserPath}/users/user-profile`, userProfile.update);
  app.post(`${apiUserPath}/users/user-profile/upload-avatar`, userProfile.avatar);


  // 用户学历
  app.get(`${apiUserPath}/users/user-education`, userEducationRoute.index);
  app.get(`${apiUserPath}/users/user-education/:userEducationId([0-9]+)`, userEducationRoute.show);
  app.post(`${apiUserPath}/users/user-education`, userEducationRoute.create);
  app.put(`${apiUserPath}/users/user-education/:userEducationId([0-9]+)`, userEducationRoute.update);
  app.delete(`${apiUserPath}/users/user-education/:userEducationId([0-9]+)`, userEducationRoute.destroy);


  // 用户公司
  app.get(`${apiUserPath}/users/user-company`, userCompany.index);
  app.get(`${apiUserPath}/users/user-company/:userCompanyId([0-9]+)`, userCompany.show);
  app.post(`${apiUserPath}/users/user-company`, userCompany.create);
  app.put(`${apiUserPath}/users/user-company/:userCompanyId([0-9]+)`, userCompany.update);
  app.delete(`${apiUserPath}/users/user-company/:userCompanyId([0-9]+)`, userCompany.destroy);


  // 用户账单
  app.get(`${apiUserPath}/users/bills`, userBillRoute.index);
  app.get(`${apiUserPath}/users/bills/:billsId([0-9]+)`, userBillRoute.show);
  app.post(`${apiUserPath}/users/bills`, userBillRoute.create);
  app.put(`${apiUserPath}/users/bills/:billsId([0-9]+)`, userBillRoute.update);
  app.delete(`${apiUserPath}/users/bills/:billsId([0-9]+)`, userBillRoute.destroy);


  // 用户加入的商会
  app.get(`${apiUserPath}/users/cocs`, userCocRoute.index);
  app.get(`${apiUserPath}/users/cocs/:cocId([0-9]+)/is-coc-member`, userCocRoute.isCocMember);

  // 获取个人的公告列表
  app.get(`${apiUserPath}/users/cocs/:cocId([0-9]+)/announcements`, userAnnouncementRoute.index);
  app.get(`${apiUserPath}/users/cocs/:cocId([0-9]+)/announcements/:announcementId([0-9]+)`, userAnnouncementRoute.show);

  // 申请商会模块
  app.get(`${apiUserPath}/users/candidates`, userCandidateRoute.index);
  app.get(`${apiUserPath}/users/candidates/:candidateId([0-9]+)`, userCandidateRoute.show);
  app.post(`${apiUserPath}/users/cocs/:cocId([0-9]+)/candidates`, userCandidateRoute.applyCoc);
  app.post(`${apiUserPath}/users/cocs/:cocId([0-9]+)/candidates/:candidateId([0-9]+)/voucher`, userCandidateRoute.uploadVoucher);
  app.post(`${apiUserPath}/users/cocs/:cocId([0-9]+)/candidates/:candidateId([0-9]+)/email-notice`, userCandidateRoute.noticeForEmail);


  // 来自商会的邀请
  app.get(`${apiUserPath}/users/invitations`, userInvitationRoute.index);
  app.get(`${apiUserPath}/users/invitations/:invitationId([0-9]+)+`, userInvitationRoute.show);
  app.put(`${apiUserPath}/users/invitations/:invitationId([0-9]+)`, userInvitationRoute.update);


  // 活动申请记录模块
  app.get(`${apiUserPath}/users/activities/candidates`, userActivityCandidateRoute.index);
  app.get(`${apiUserPath}/users/activities/:activityId([0-9]+)/candidates/:candidateId([0-9]+)`, userActivityCandidateRoute.show);
  app.get(`${apiUserPath}/users/activities/:activityId([0-9]+)/is-joined`, userActivityCandidateRoute.isJoined);
  app.post(`${apiUserPath}/users/activities/:activityId([0-9]+)/candidate`, userActivityCandidateRoute.create);
  app.post(`${apiUserPath}/users/activities/:activityId([0-9]+)/candidates/:candidateId([0-9]+)/upload-voucher`, userActivityCandidateRoute.uploadVoucher);
  app.post(`${apiUserPath}/users/activities/:activityId([0-9]+)/candidates/:candidateId([0-9]+)/notice-email`, userActivityCandidateRoute.noticeForEmail);


  app.get(`${apiUserPath}/users/cocs/:cocId([0-9]+)/bank`, userBankRoute.index);
  app.get(`${apiUserPath}/users/cocs/:cocId([0-9]+)/bank/:bankId([0-9]+)`, userBankRoute.show);

  // 留言管理
  app.get(`${apiUserPath}/users/message`, userMessageRoute.index);
  app.get(`${apiUserPath}/users/message/:messageId([0-9]+)`, userMessageRoute.show);
  app.post(`${apiUserPath}/users/message`, userMessageRoute.create);
  app.delete(`${apiUserPath}/users/message/:messageId([0-9]+)`, userMessageRoute.destroy);

  /** *********************************************
   *
   *
   * 后台管理员路由
   *
   *
   ***********************************************/

  // 后台管理员认证
  // app.post(`${apiAdminPath}/auth/register`, adminAuthRoute.register);
  app.post(`${apiAdminPath}/auth/login`, rateLimitMethod.publicLoginLimitMiddleware, adminAuthRoute.login);
  app.post(`${apiAdminPath}/auth/refresh`, passportMiddleware.passportAuthenticateAdminJWT('admin-jwt-allow-expired'), adminAuthRoute.refreshToken);
  app.get(`${apiAdminPath}/auth/verify-email`, adminAuthRoute.verifyEmail);
  app.post(`${apiAdminPath}/auth/forget-password`, adminAuthRoute.forgetPassword);
  app.post(`${apiAdminPath}/auth/reset-password`, adminAuthRoute.resetPassword);

  // 后台管理员token认证
  app.use(`${apiAdminPath}/*`, rateLimitMethod.authApiCallLimitMiddleware, passportMiddleware.passportAuthenticateAdminJWT(), adminJwtAuthMiddleware);

  // 管理员管理
  app.get(`${apiAdminPath}/admins`, adminSelfRoute.index);
  app.get(`${apiAdminPath}/admins/self`, adminSelfRoute.show);
  app.post(`${apiAdminPath}/admins`, adminSelfRoute.create);
  app.put(`${apiAdminPath}/admins/:adminId([0-9]+)`, adminSelfRoute.update);
  app.delete(`${apiAdminPath}/admins/:adminId([0-9]+)`, adminSelfRoute.destroy);
  app.use(`${apiAdminPath}/is-activated`, adminAuthRoute.isActivated);
  app.post(`${apiAdminPath}/auth/change-password`, adminAuthRoute.changePassword);
  app.get(`${apiAdminPath}/sessions`, adminAuthRoute.indexSession);
  app.delete(`${apiAdminPath}/sessions/:userSessionId([0-9]+)/revoke`, adminAuthRoute.revokeSession);

  // 设置平台信息
  app.get(`${apiAdminPath}/setting`, adminSettingRoute.show);
  app.put(`${apiAdminPath}/setting`, adminSettingRoute.update);

  // 统计信息
  app.get(`${apiAdminPath}/statistics`, adminStatisticsRoute.show);

  // 行业分类管理
  app.get(`${apiAdminPath}/admin/industries`, adminIndustryRoute.index);
  app.get(`${apiAdminPath}/admin/industries/:industryId([0-9]+)`, adminIndustryRoute.show);
  app.put(`${apiAdminPath}/admin/industries/:industryId([0-9]+)`, adminIndustryRoute.update);
  app.post(`${apiAdminPath}/admin/industries`, adminIndustryRoute.create);
  app.delete(`${apiAdminPath}/admin/industries/:industryId([0-9]+)`, adminIndustryRoute.destroy);

  // 文章种类管理
  app.get(`${apiAdminPath}/post/categories`, adminPostCategoryRoute.index);
  app.get(`${apiAdminPath}/post/categories/:categoryId([0-9]+)`, adminPostCategoryRoute.show);
  app.put(`${apiAdminPath}/post/categories/:categoryId([0-9]+)`, adminPostCategoryRoute.update);
  app.post(`${apiAdminPath}/post/categories`, adminPostCategoryRoute.create);
  app.delete(`${apiAdminPath}/post/categories/:categoryId([0-9]+)`, adminPostCategoryRoute.destroy);

  // 活动分类管理
  app.get(`${apiAdminPath}/activities/categories`, adminActivityCategoriesRoute.index);
  app.get(`${apiAdminPath}/activities/categories/:categoryId([0-9]+)`, adminActivityCategoriesRoute.show);
  app.get(`${apiAdminPath}/activities/categories/index-tree`, adminActivityCategoriesRoute.indexTree);
  app.post(`${apiAdminPath}/activities/categories`, adminActivityCategoriesRoute.create);
  app.put(`${apiAdminPath}/activities/categories/:categoryId([0-9]+)`, adminActivityCategoriesRoute.update);
  app.delete(`${apiAdminPath}/activities/categories/:categoryId([0-9]+)`, adminActivityCategoriesRoute.destroy);

  // 轮播图管理
  app.get(`${apiAdminPath}/slide-show`, adminSlideShowRoute.index);
  app.get(`${apiAdminPath}/slide-show/:slideShowId([0-9]+)`, adminSlideShowRoute.show);
  app.post(`${apiAdminPath}/slide-show`, adminSlideShowRoute.create);
  app.put(`${apiAdminPath}/slide-show/:slideShowId([0-9]+)`, adminSlideShowRoute.update);
  app.delete(`${apiAdminPath}/slide-show/:slideShowId([0-9]+)`, adminSlideShowRoute.destroy);
  app.post(`${apiAdminPath}/slide-show/:slideShowId([0-9]+)`, adminSlideShowRoute.uploadSlideShow);

  // 友情链接管理
  app.get(`${apiAdminPath}/links`, adminLinkRoute.index);
  app.get(`${apiAdminPath}/links/:linkId([0-9]+)`, adminLinkRoute.show);
  app.post(`${apiAdminPath}/links`, adminLinkRoute.create);
  app.post(`${apiAdminPath}/links/:linkId([0-9]+)/upload-logo`, adminLinkRoute.uploadLogo);
  app.put(`${apiAdminPath}/links/:linkId([0-9]+)`, adminLinkRoute.update);
  app.delete(`${apiAdminPath}/links/:linkId([0-9]+)`, adminLinkRoute.destroy);

  // 查看用户
  app.get(`${apiAdminPath}/users`, adminUserRoute.index);
  app.get(`${apiAdminPath}/users/:userId([0-9]+)`, adminUserRoute.show);
  app.delete(`${apiAdminPath}/users/:userId([0-9]+)`, adminUserRoute.destroy);


  // 邀请列表
  app.get(`${apiAdminPath}/invitations`, adminInvitationRoute.index);

  // 查看企业账户
  app.get(`${apiAdminPath}/enterprises`, adminEnterpriseRoute.index);
  app.get(`${apiAdminPath}/enterprises/:enterpriseId([0-9]+)`, adminEnterpriseRoute.show);
  app.put(`${apiAdminPath}/enterprises/:enterpriseId([0-9]+)`, adminEnterpriseRoute.update);


  // 入驻审核 商会管理 (通过传isApproved参数区分)
  app.get(`${apiAdminPath}/cocs`, adminCocRouter.index);
  app.get(`${apiAdminPath}/cocs/:cocId([0-9]+)`, adminCocRouter.show);
  app.put(`${apiAdminPath}/cocs/:cocId([0-9]+)`, adminCocRouter.update);
  app.delete(`${apiAdminPath}/cocs/:cocId([0-9]+)`, adminCocRouter.destroy);

  // 文章管理
  app.get(`${apiAdminPath}/posts`, adminPostRoute.index);
  app.put(`${apiAdminPath}/posts/:postId([0-9]+)`, adminPostRoute.update);
  app.delete(`${apiAdminPath}/posts/:postId([0-9]+)`, adminPostRoute.destroy);

  // 商会公告
  app.get(`${apiAdminPath}/announcements`, adminCocAnnouncementRoute.index);
  app.get(`${apiAdminPath}/announcements/:announcementId([0-9]+)`, adminCocAnnouncementRoute.show);
  app.delete(`${apiAdminPath}/announcements/:announcementId([0-9]+)`, adminCocAnnouncementRoute.destroy);

  // 入会须知
  app.get(`${apiAdminPath}/rules`, adminCocRuleRoute.index);
  app.get(`${apiAdminPath}/rules/:ruleId([0-9]+)`, adminCocRuleRoute.index);
  app.delete(`${apiAdminPath}/rules/:ruleId([0-9]+)/coc/:cocId([0-9]+)`, adminCocRuleRoute.destroy);


  // 支付管理
  app.get(`${apiAdminPath}/banks`, adminBankRoute.index);

  // 留言管理
  app.get(`${apiAdminPath}/messages`, adminCocMessageRoute.index);
  app.delete(`${apiAdminPath}/messages/:messagesId([0-9]+)`, adminCocMessageRoute.destroy);


  // 查看活动
  app.get(`${apiAdminPath}/activities`, adminActivityRoute.index);
  app.put(`${apiAdminPath}/activities/:activityId([0-9]+)`, adminActivityRoute.update);
  app.delete(`${apiAdminPath}/activities/:activityId([0-9]+)`, adminActivityRoute.destroy);


  // 活动报名审核
  app.get(`${apiAdminPath}/activity-candidates`, adminActivityCandidateRoute.index);
  app.delete(`${apiAdminPath}/activity-candidates/:candidateId([0-9]+)`, adminActivityCandidateRoute.destroy);


}

module.exports = bootstrapRoute;
