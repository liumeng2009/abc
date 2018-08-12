import {WorkOrder} from "./workOrder";
import {Corporation} from "./Corporation";
import {Operation} from "./operation";
export class Order {
  constructor(
    public id:string,
    public no:string,
    public incoming_time: number,
    public custom_name:string,
    public custom_phone:string,
    public custom_corporation:Corporation,
    public operations:Operation[],
    public workerOrders:WorkOrder[]
  ) {  }
}
