"use strict";

import { Service } from "egg";
class OrdersService extends Service {
  async create(payload: object): Promise<any> {
    const { ctx } = this;
    return ctx.model.Orders.create(payload);
  }
  async update(_id: string, payload: object): Promise<any> {
    const { ctx } = this;
    const order = await ctx.service.orders.find(_id);
    if (!order) {
      ctx.throw(404, "order not found");
    }
    console.log(payload);
    return ctx.model.Orders.findByIdAndUpdate(_id, payload);
  }
  async destroy(_id: any): Promise<any> {
    const { ctx } = this;
    const order = await ctx.service.orders.find(_id);
    if (!order) {
      ctx.throw(404, "order not found");
    }
    return ctx.model.Orders.findByIdAndRemove(_id);
  }
  async findByOrder(order: number): Promise<any> {
    const { ctx } = this;
    return ctx.model.Orders.find({ order: order });
  }
  async filterByStatus(status: number): Promise<any> {
    const { ctx } = this;
    return ctx.model.Orders.find({ "logInfo.status": status });
  }
  async find(_id: string): Promise<object> {
    const { ctx } = this;
    return ctx.model.Orders.findById(_id);
  }
  async index(): Promise<any> {
    const { ctx } = this;
    return ctx.model.Orders.find({});
  }
  async owner(userId: string): Promise<any> {
    const { ctx } = this;
    return ctx.model.Orders.find({ operator: userId });
  }
}

export default OrdersService;
