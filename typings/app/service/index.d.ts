// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportOrders from '../../../app/service/orders';
import ExportUsers from '../../../app/service/users';

declare module 'egg' {
  interface IService {
    orders: ExportOrders;
    users: ExportUsers;
  }
}
