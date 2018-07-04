import {Injectable} from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {CookieService} from 'angular2-cookie/core';

import {ResponseData} from '../../../bean/responseData';

import {OptConfig} from '../../../config/config'

@Injectable()
export class ListService {
  constructor(private http: Http, private cookieService: CookieService) {
    let token = this.cookieService.get('optAppToken');
    this.headers=new Headers({'Content-Type': 'application/json','authorization':token})
  }

  private headers;

  private workingOpListDUrl=new OptConfig().serverPath+'/api/operation/workingOperationList'
  private doneOpListUrl=new OptConfig().serverPath+'/api/operation/doneOperationList'
  private allOpListUrl=new OptConfig().serverPath+'/api/operation/allOperationList'
  private opCountUrl=new OptConfig().serverPath+'/api/operation/operationCount'

  getWorkingOpList(stamp:number,userid:string): Promise<ResponseData> {
    return this.http.get(this.workingOpListDUrl + '?stamp='+stamp+'&userid='+userid,{headers:this.headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }
  getDoneOpList(stamp:number,userid:string): Promise<ResponseData> {
    return this.http.get(this.doneOpListUrl + '?stamp='+stamp+'&userid='+userid,{headers:this.headers})
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
    return this.http.get(this.opCountUrl + '?stamp='+stamp+'&userid='+userid,{headers:this.headers})
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
