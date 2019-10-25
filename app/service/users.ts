"use strict";

import { Service } from "egg";

class UsersService extends Service {
  //注册
  async create(user: object): Promise<any> {
    const { ctx } = this;
    return ctx.model.Users.create(user);
  }
  async update(_id: any, payload: object): Promise<any> {
    const { ctx } = this;
    const user = await ctx.service.users.find(_id);
    if (!user) {
      ctx.throw(404, "user not found");
    }
    payload = { ...payload, modifiedTime: new Date() };
    return ctx.model.Users.findByIdAndUpdate(_id, payload);
  }
  async destroy(_id: any): Promise<any> {
    const { ctx } = this;
    const user = await ctx.service.users.find(_id);
    if (!user) {
      ctx.throw(404, "user not found");
    }
    return ctx.model.Users.findByIdAndRemove(_id);
  }
  async index() {
    const { ctx } = this;
    return await ctx.model.Users.find({});
  }
  async find(_id: any): Promise<any> {
    const { ctx } = this;
    return ctx.model.Users.findById(_id);
  }
  async findByName(name: string, userType?: number): Promise<any> {
    const { ctx } = this;
    let res;
    if (userType) {
      res = await ctx.model.Users.findOne({
        userName: name,
        userType: userType
      });
    } else {
      res = await ctx.model.Users.findOne({ userName: name });
    }
    return res;
  }
  async findByType(type: number): Promise<any> {
    const { ctx } = this;
    return ctx.model.Users.find({ userType: type });
  }
}

export default UsersService;
