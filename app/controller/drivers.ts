import Controller from "../core/base_controller";

export default class DriverController extends Controller {
  public async audit() {
    const { ctx } = this;
    const updateRule = {
      status: { type: "number", allowEmpty: false, min: 0, max: 2 },
      text: { type: "string", allowEmpty: true }
    };
    ctx.validate(updateRule);

    const { id } = ctx.params;
    const user = await ctx.service.users.find(id);
    const payload = {
      userType: 0,
      audit: {
        status: ctx.request.body.status,
        text: ctx.request.body.text
      },
      modifiedTime: new Date()
    };
    let userType = user.userType;
    if (user.depositInfo.status === 1 && ctx.request.body.status === 2) {
      userType = 1; //若已交押金，已审核 那么申请司机成功
    } else {
      userType = 0;
    }
    payload.userType = userType;
    ctx.service.users.update(id, payload);
    this.success({});
  }
  public async deposit() {
    const { ctx } = this;
    const updateRule = {
      deposit: { type: "number", allowEmpty: false },
      status: { type: "number", allowEmpty: false }
    };
    ctx.validate(updateRule);
    const { id } = ctx.params;
    const user = await ctx.service.users.find(id);
    const payload = {
      userType: 0,
      depositInfo: {
        deposit: ctx.request.body.deposit,
        status: ctx.request.body.status
      },
      modifiedTime: new Date()
    };
    console.log(payload.modifiedTime);
    let userType = user.userType;
    if (user.audit.status === 2 && ctx.request.body.status === 1) {
      userType = 1; //若已交押金，已审核 那么申请司机成功
    } else {
      userType = 0;
    }
    payload.userType = userType;
    ctx.service.users.update(id, payload);
    this.success({});
  }
  public async findUser() {
    const { ctx } = this;
    const { userName } = ctx.params;
    const res = await ctx.service.users.findByName(userName, 1);
    this.success(res);
  }
  public async index() {
    const { ctx } = this;
    const res = await ctx.service.users.findByType(1);
    this.success(res);
  }
}
