// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDrivers from '../../../app/model/drivers';
import ExportOrders from '../../../app/model/orders';
import ExportUsers from '../../../app/model/users';

declare module 'egg' {
  interface IModel {
    Drivers: ReturnType<typeof ExportDrivers>;
    Orders: ReturnType<typeof ExportOrders>;
    Users: ReturnType<typeof ExportUsers>;
  }
}
