"use strict";

module.exports = {
  SUCCESS_CODE: 0, // 成功
  ERROR_CODE: -1, // 失败

  //userType
  USER: 0,
  DRIVER: 1,
  ADMIN: 2,

  //status code
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,

  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,

  async getUserType(): Promise<boolean> {
    const userId = this.session.userId;
    console.log(this.session, userId);
    const user = await this.service.users.find(userId);
    if (!user) {
      this.body = { status: this.BAD_REQUEST, message: "用户不存在" };
      this.status = this.BAD_REQUEST;
    }
    return user.userType;
  }
};
