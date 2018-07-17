import {Operation} from "./operation";
export class Order {
  constructor(
    public id:string,
    public no:string,
    public incoming_time: number,
    public custom_phone:string,
    public custom_corporation:string,
    public operations:Operation[]
  ) {  }
}
