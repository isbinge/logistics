// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDrivers from '../../../app/controller/drivers';
import ExportOrders from '../../../app/controller/orders';
import ExportUsers from '../../../app/controller/users';

declare module 'egg' {
  interface IController {
    drivers: ExportDrivers;
    orders: ExportOrders;
    users: ExportUsers;
  }
}
