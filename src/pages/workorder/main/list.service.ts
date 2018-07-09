import {Injectable} from '@angular/core';
import {Http,Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {ResponseData} from '../../../bean/responseData';

import {OptConfig} from '../../../config/config'

@Injectable()
export class ListService {
  constructor(private http: Http) {

  }

  private workingOpListUrl=new OptConfig().serverPath+'/api/operation/workingOperationList'
  private doneOpListUrl=new OptConfig().serverPath+'/api/operation/doneOperationList'
  private allOpListUrl=new OptConfig().serverPath+'/api/operation/allOperationList'
  private opCountUrl=new OptConfig().serverPath+'/api/operation/operationCount'

  getWorkingOpList(stamp:number,userid:string): Promise<ResponseData> {
    let url=this.workingOpListUrl + '?stamp='+stamp+'&userid='+userid;
    return this.http.get(url)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }
  getDoneOpList(stamp:number,userid:string): Promise<ResponseData> {
    return this.http.get(this.doneOpListUrl + '?stamp='+stamp+'&userid='+userid)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }
/*  getAllOpList(stamp:number): Promise<ResponseData> {
    let token = this.cookieService.get('optAppToken');
    console.log(this.allOpListUrl + '?stamp='+stamp+'&token=' + token);
    return this.http.get(this.allOpListUrl + '?stamp='+stamp+'&token=' + token)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }*/

  getOpCount(stamp:number,userid:string): Promise<ResponseData> {
    return this.http.get(this.opCountUrl + '?stamp='+stamp+'&userid='+userid)
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
