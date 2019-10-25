import Controller from "../core/base_controller";

export default class OrdersController extends Controller {
  public async create() {
    const { ctx } = this;
    const orderRule = {
      sender: { type: "object" },
      from: { type: "string" },
      to: { type: "string" },
      receiver: {
        type: "object"
      }
    };
    ctx.validate(orderRule);
    const body = ctx.request.body;
    const payload = {
      operator: ctx.session.userId,
      sender: body.sender,
      logInfo: { location: body.from, lastModifiedTime: new Date(), status: 0 },
      from: body.from,
      to: body.to,
      receiver: body.receiver,
      createdTime: new Date(),
      modifiedTime: new Date()
    };
    const res = await ctx.service.orders.create(payload);
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
      logInfo: { type: "object" }
    };
    ctx.validate(updateRule);
    const { id } = ctx.params;
    const payload = {
      logInfo: {
        ...ctx.request.body.logInfo,
        lastModifiedTime: new Date()
      }
    };
    const res = await ctx.service.orders.update(id, payload);
    this.success(res);
  }
  public async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;
    const userType = await ctx.getUserType();
    //权限验证
    if (userType !== ctx.ADMIN) {
      return this.fail(ctx.UNAUTHORIZED, "无权访问");
    }
    await ctx.service.orders.destroy(id);
    this.success({});
  }
  public async show() {
    const { ctx } = this;
    const { order } = ctx.params;
    const userType = await ctx.getUserType();
    //权限验证
    if (userType !== ctx.ADMIN) {
      return this.fail(ctx.UNAUTHORIZED, "无权访问");
    }
    const res = await ctx.service.orders.findByOrder(order);

    this.success(res);
  }
  public async filter() {
    const { ctx } = this;
    const { status } = ctx.params;
    const userType = await ctx.getUserType();
    //权限验证
    if (userType !== ctx.ADMIN) {
      return this.fail(ctx.UNAUTHORIZED, "无权访问");
    }
    const res = await ctx.service.orders.filterByStatus(status);
    this.success(res);
  }
  public async owner() {
    const { ctx } = this;
    const userId = ctx.session.userId;
    const res = ctx.service.orders.owner(userId);
    this.success(res);
  }
  public async index() {
    const { ctx } = this;
    const userType = await ctx.getUserType();
    //权限验证
    if (userType !== ctx.ADMIN) {
      return this.fail(ctx.UNAUTHORIZED, "无权访问");
    }
    const res = await ctx.service.orders.index;
    this.success(res);
  }
}
