import {Injectable} from '@angular/core';
@Injectable()
export class RememberService {
  private listSelectedDate:Date;
  private signId:string;
  setListDate(date:Date){
    this.listSelectedDate=date;
  }
  getListDate(){
    return this.listSelectedDate;
  }
  setSignId(signid:string){
    this.signId=signid
  }
  getSignId(){
    return this.signId
  }
}
