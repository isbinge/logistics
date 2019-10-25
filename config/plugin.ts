import { EggPlugin } from "egg";

const plugin: EggPlugin = {
  validate: {
    enable: true,
    package: "egg-validate"
  },
  redis: {
    enable: true,
    package: "egg-redis"
  },
  sessionRedis: {
    enable: true,
    package: "egg-session-redis"
  },
  mongoose: {
    enable: true,
    package: "egg-mongoose"
  }
};

export default plugin;
