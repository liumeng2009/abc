import {Injectable} from '@angular/core';
import {Http,Response,Headers} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {User} from "../../bean/user";
import {ResponseData} from "../../bean/responseData";
import {OptConfig} from "../../config/config";

@Injectable()
export class ChartService{
  constructor(private http:Http){}
  private headers = new Headers({'Content-Type': 'application/json'});
  private workerOpCountUrl=new OptConfig().serverPath+'/api/operation/workerOpCount'
  private workerOpStampUrl=new OptConfig().serverPath+'/api/operation/workerOpStamp'

  workerOpCount(userid:string,start:number,end:number):Promise<ResponseData>{
    console.log(this.workerOpCountUrl+'?userid='+userid+'&start='+start+'&end='+end);
    return this.http.get(this.workerOpCountUrl+'?userid='+userid+'&start='+start+'&end='+end,{headers: this.headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }
  workerOpStamp(userid:string,start:number,end:number):Promise<ResponseData>{
    return this.http.get(this.workerOpStampUrl+'?userid='+userid+'&start='+start+'&end='+end,{headers: this.headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }


  private extractData(res:Response){
    let body=res.json();
    //console.log(JSON.stringify(body));
    return body||{};
  }
  private handleError(error:Response|any){
    let errMsg:string;
    if(error instanceof Response){
      const body=error.json()||'';
      const err=body.err||JSON.stringify(body);
      errMsg=`${error.status} - ${error.statusText||''} ${err}`
    }
    else{
      errMsg=error.message?error.message:error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
