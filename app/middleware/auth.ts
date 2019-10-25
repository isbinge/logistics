"use strict";

module.exports = (options, app) => {
  return async function auth(ctx, next) {
    console.log(options);
    if (ctx.path.indexOf("/login") !== 0) {
      const sessionid = ctx.session.sessionid;
      const session = await app.redis.get(sessionid);
      if (!session) {
        ctx.throw(ctx.BAD_REQUEST, "请求超时");
      }
      ctx.session.userId = JSON.parse(session)._id;
      //   if (ctx.session.openid) {
      //     await next();
      //   } else {
      //     ctx.throw(new Error("请重新登陆"));
      //   }
      await next();
    } else {
      await next();
    }
  };
};
