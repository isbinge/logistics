"use strict";
import { Application } from "egg";
module.exports = (app: Application) => {
  const Schema = app.mongoose.Schema;
  const UserSchema = new Schema({
    userName: { type: String, required: true }, // 用户名
    tel: Number, // 电话
    vxNumber: String, // 微信号
    vxName: String, // 微信名
    userType: { type: Number, required: true }, // 用户类型 0表示用户 1表示司机 2表示管理员
    IDCardImg: { type: String, default: "" }, // 身份证 正面
    IDCardBackImg: { type: String, default: "" }, // 身份证反面
    carCardImg: { type: String, default: "" }, // 驾驶证
    drivingCardImg: { type: String, default: "" }, // 行驶证
    audit: {
      status: { type: Number, default: 0 }, //0:未审核，1:审核中,2:已审核
      text: { type: String, default: "" } //备注
    },
    depositInfo: {
      deposit: Number,
      status: { type: Number, default: 0 }
    }, // 押金、退还渠道、状态,押金状态: { 0:未交押金,1:已经押金,2:已退押金}
    createdTime: { type: Date, default: Date.now },
    modifiedTime: { type: Date, default: Date.now }
  });
  return app.mongoose.model("Users", UserSchema);
};
