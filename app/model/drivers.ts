"use strict";
import { Application } from "egg";
module.exports = (app: Application) => {
  const Schema = app.mongoose.Schema;
  const DriverSchema = new Schema({
    userName: { type: String, required: true }, // 司机名
    tel: Number, // 司机电话
    vxNumber: String, // 微信号
    vxName: String, // 微信名

    createdTime: { type: Date, default: Date.now },
    modifiedTime: { type: Date, default: Date.now }
  });
  return app.mongoose.model("Drivers", DriverSchema);
};
