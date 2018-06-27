import {Injectable} from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {CookieService} from 'angular2-cookie/core';

import {ResponseData} from '../../../bean/responseData';

import {OptConfig} from '../../../config/config'

@Injectable()
export class DetailService {
  constructor(private http: Http, private cookieService: CookieService) {
  }

  private operationDetailUrl=new OptConfig().serverPath+'/api/operation/'

  getOperation(id:string): Promise<ResponseData> {
    let token = this.cookieService.get('optAppToken');
    console.log(this.operationDetailUrl +id+'?token=' + token);
    return this.http.get(this.operationDetailUrl +id+'?token=' + token)
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
