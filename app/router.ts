import { Application } from "egg";

export default (app: Application) => {
  const { controller, router } = app;

  router.post("/login", controller.users.login);

  //user
  router.post("/api/user", controller.users.create);
  router.delete("/api/user/:id", controller.users.destroy);
  router.put("/api/user/:id", controller.users.update);
  router.post("/api/user/:id/apply", controller.users.apply);
  router.get("/api/user", controller.users.index);
  router.get("/api/user/:userName", controller.users.findUser);

  // driver
  router.get("/api/driver", controller.drivers.index);
  router.put("/api/driver/:id/audit", controller.drivers.audit);
  router.put("/api/driver/:id/deposit", controller.drivers.deposit);
  router.get("/api/driver/:userName", controller.drivers.findUser);
  //order
  router.post("/api/order", controller.orders.create);
  router.delete("/api/order/:id", controller.orders.destroy);
  router.put("/api/order/:id", controller.orders.update);
  router.get("/api/order/:order", controller.orders.show);
  router.get("/api/order/status/:status", controller.orders.filter);
  router.get("/api/order/owner", controller.orders.owner);
  router.get("/api/order", controller.orders.index);
};
