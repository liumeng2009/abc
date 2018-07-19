import {Injectable} from '@angular/core';
@Injectable()
export class RememberService {
  private listSelectedDate:Date;
  setListDate(date:Date){
    this.listSelectedDate=date;
  }
  getListDate(){
    return this.listSelectedDate;
  }
}
