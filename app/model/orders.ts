"use strict";
import { Application } from "egg";
let orderCounter = 1111111;
module.exports = (app: Application) => {
  const Schema = app.mongoose.Schema;
  const ObjectId = Schema.Types.ObjectId;
  const OrderSchema = new Schema({
    operator: { type: ObjectId, ref: "Users" },
    sender: { name: String, tel: { type: Number } },
    order: { type: Number, default: () => orderCounter++ }, // 订单号
    logInfo: {
      location: String,
      lastModifiedTime: { type: Date },
      status: { type: Number, default: 0 }
    }, // 物流详情 - 时间、地点、状态  状态：{0:已发出，1:运输中,2:已抵达,3:异常}
    from: { type: String, required: true }, // 出发地
    to: { type: String, required: true }, // 目的地
    receiver: { name: String, tel: { type: Number } }, // 收货人
    createdTime: { type: Date, default: Date.now },
    modifiedTime: { type: Date, default: Date.now }
  });
  return app.mongoose.model("Orders", OrderSchema);
};
