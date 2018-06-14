import {Pipe,PipeTransform} from '@angular/core';

@Pipe({name:'date'})
export class DatePipe implements PipeTransform{

  constructor(){

  }

  transform(date:Date){
    let dateNow=new Date();
    let dateMy=new Date(date);


    return dateMy.toDateString();;

  }
}
