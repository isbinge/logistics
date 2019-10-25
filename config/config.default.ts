import { EggAppInfo } from "egg";

export default (appInfo: EggAppInfo) => {
  const config: any = {};

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1571622792462_5400";

  config.appId = "";
  config.appSecrect = "";
  // //上传文件
  // config.multipart = {
  //   mode: "file"
  // };
  config.security = {
    csrf: false
  };
  // add session config
  config.session = {
    key: "EGG_SESS",
    maxAge: 2 * 24 * 3600 * 1000, // 2 天
    httpOnly: true,
    encrypt: true,
    renew: true
  };
  // 中间件
  config.middleware = ["auth", "errorHandler"];
  //redis
  config.redis = {
    client: {
      host: "127.0.0.1",
      port: "6379",
      password: "",
      db: "0"
    },
    agent: true
  };
  config.mongoose = {
    url: "mongodb://127.0.0.1/logistics",
    options: {}
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig
  };
};
