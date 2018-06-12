import {Pipe,PipeTransform} from '@angular/core';

@Pipe({name:'titledate'})
export class TitleDatePipe implements PipeTransform{

  constructor(){

  }

  transform(date:Date){
    let dateNow=new Date();

    let str='';
    if(this.isToday(date,dateNow)){
      str='（今天）';
    }

    if(this.isYesterday(date,dateNow)){
      str='（昨天）';
    }

    return date.getFullYear()+'年'+(date.getMonth()+1)+'月'+date.getDate()+'日'+str;

  }

  private isToday(date:Date,dateComp:Date){
    if(date.getFullYear()==dateComp.getFullYear()&&date.getMonth()==dateComp.getMonth()&&date.getDate()==dateComp.getDate()){
      return true;
    }
  }

  private isYesterday(date:Date,dateComp:Date){
    let stamp=dateComp.getTime();
    stamp=stamp-24*60*60*1000;
    let newDate=new Date(stamp);
    let yestodayStart=new Date(newDate.getFullYear(),newDate.getMonth(),newDate.getDate(),0,0,0);
    let yestodayEnd=new Date(newDate.getFullYear(),newDate.getMonth(),newDate.getDate(),23,59,59,999);
    if(date.getTime()>=yestodayStart.getTime()&&date.getTime()<=yestodayEnd.getTime()){
      return true;
    }
  }

}
