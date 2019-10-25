import Controller from "../core/base_controller";
const path = require("path");
const fs = require("mz/fs");
const sendToWormhole = require("stream-wormhole");
export default class HomeController extends Controller {
  public async login() {
    const { ctx, service, app } = this;
    const loginRule = {
      userName: { type: "string" },
      tel: { type: "number", required: false, allowEmpty: true },
      vxNumber: { type: "string" },
      vxName: { type: "string" },
      userType: { type: "number", min: 0, max: 1 }
    };
    let user;
    ctx.validate(loginRule);

    // // 登录凭证校验
    // const weappInfo =
    //   (await ctx.curl(
    //     `https://api.weixin.qq.com/sns/jscode2session?appid=${app.config.appId}&secret=${app.config.appSecret}&js_code=${code}&grant_type=authorization_code`,
    //     {
    //       dataType: "json"
    //     }
    //   )) || {};

    // const { openid: openId, session_key }: { openid: any; session_key: any } =
    //   weappInfo.data || {};

    // if (openId) {
    if (true) {
      const _user = {
        userName: ctx.request.body.userName,
        tel: ctx.request.body.tel || null,
        vxNumber: ctx.request.body.vxNumber,
        vxName: ctx.request.body.vxName,
        userType: ctx.request.body.userType
      };
      const sessionid = ctx.helper.uuidv1();
      user = await ctx.service.users.findByName(_user.userName);
      if (!user) {
        //首次登录
        user = await service.users.create(_user);
      }
      // const result = JSON.stringify({ openId, session_key, _id: user._id });
      const result = JSON.stringify({ _id: user._id });
      this.ctx.session.sessionid = sessionid;
      await app.redis.set(sessionid, result);
    }
    // else {
    //   return this.fail(ctx.ERROR_CODE, weappInfo.data.errmsg);
    // }
    this.success(user);
  }
  public async create() {
    const { ctx, service } = this;
    const userType = await ctx.getUserType();
    //权限验证
    if (userType !== ctx.ADMIN) {
      return this.fail(ctx.UNAUTHORIZED, "无权访问");
    }
    const loginRule = {
      userName: { type: "string" },
      tel: { type: "number", required: false, allowEmpty: true },
      vxNumber: { type: "string" },
      vxName: { type: "string" },
      userType: { type: "number", min: 0, max: 1 }
    };
    ctx.validate(loginRule);
    const user = {
      userName: ctx.request.body.userName,
      tel: ctx.request.body.tel || null,
      vxNumber: ctx.request.body.vxNumber,
      vxName: ctx.request.body.vxName,
      userType: ctx.request.body.userType,
      IDCardImg: "",
      carCardImg: "",
      IDCardBackImg: "",
      drivingCardImg: "",
      audit: { status: 0, text: "" },
      depositInfo: { deposit: 20000, status: 0 },
      createdTime: new Date(),
      modifiedTime: new Date()
    };
    const res = await service.users.create(user);
    this.success(res);
  }
  public async update() {
    const { ctx } = this;
    const userType = await ctx.getUserType();
    //权限验证
    if (userType !== ctx.ADMIN) {
      return this.fail(ctx.UNAUTHORIZED, "无权访问");
    }
    const updateRule = {
      tel: { type: "number", allowEmpty: false, min: 10, max: 11 }
    };
    ctx.validate(updateRule);
    const { id } = ctx.params;
    const payload = { tel: ctx.request.body.tel };
    ctx.service.users.update(id, payload);
    this.success({});
  }
  public async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;
    const userType = await ctx.getUserType();
    //权限验证
    if (userType !== ctx.ADMIN) {
      return this.fail(ctx.UNAUTHORIZED, "无权访问");
    }
    await ctx.service.users.destroy(id);
    this.success({});
  }
  public async index() {
    const { ctx } = this;
    const res = await ctx.service.users.index();
    this.success(res);
  }
  public async findUser() {
    const { ctx } = this;
    const { userName } = ctx.params;
    const userType = await ctx.getUserType();
    //权限验证
    if (userType !== ctx.ADMIN) {
      return this.fail(ctx.UNAUTHORIZED, "无权访问");
    }
    const res = await ctx.service.users.findByName(userName, 0);
    this.success(res);
  }
  public async apply() {
    const { ctx } = this;
    const { id } = ctx.params;
    const parts = ctx.multipart();
    let part,
      results: Array<any> = [];
    while ((part = await parts())) {
      console.log(part);
      if (part.length) {
        // 这是 busboy 的字段
        console.log("field: " + part[0]);
        console.log("value: " + part[1]);
        console.log("valueTruncated: " + part[2]);
        console.log("fieldnameTruncated: " + part[3]);
      } else {
        if (!part.filename) {
          // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
          // 需要做出处理，例如给出错误提示消息
          return this.fail(ctx.ERROR_CODE, "请选择文件");
        }
        // part 是上传的文件流
        console.log("field: " + part.fieldname);
        console.log("filename: " + part.filename);
        console.log("encoding: " + part.encoding);
        console.log("mime: " + part.mime);
        // 文件处理，上传到云存储等等
        try {
          // result = await ctx.oss.put(
          //   "egg-multipart-test/" + part.filename,
          //   part
          // );
          const writeStream = fs.createWriteStream(
            path.join(this.config.baseDir, `app/public/upload/${part.filename}`)
          );

          part.pipe(writeStream);
          results.push(part.filename);
        } catch (err) {
          // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
          await sendToWormhole(part);
          throw err;
        }
      }
    }
    if (results.length === 4) {
      //总计四张图片
      const payload = {
        IDCardImg: results[0],
        IDCardBackImg: results[1],
        carCardImg: results[2],
        drivingCardImg: results[3]
      };
      await ctx.service.users.update(id, payload);
      this.success({});
    }
  }
}
