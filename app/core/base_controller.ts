"use strict";

import { Controller } from "egg";

export default class BaseController extends Controller {
  success(data: object, status?: number): void {
    this.ctx.body = { code: this.ctx.SUCCESS_CODE, data };
    this.ctx.status = status || 200;
  }

  fail(code: number, message: any): void {
    this.ctx.body = { code, message, data: {} };
    this.ctx.status = 200;
  }
  notFound(msg: any): void {
    msg = msg || "not found";
    this.ctx.throw(404, msg);
  }
}
