import {Injectable} from '@angular/core';
import {Http,Response,Headers} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {ResponseData} from '../../../bean/responseData';

import {OptConfig} from '../../../config/config'
import {CookieService} from "angular2-cookie/core";

@Injectable()
export class SignService {
  constructor(private http: Http,private cookieService:CookieService) {

  }
  private headers = new Headers({'Content-Type': 'application/json'});
  private saveUrl=new OptConfig().serverPath+'/api/sign/clientsave'
  private getUrl=new OptConfig().serverPath+'/api/sign/'
  private clientSignUrl=new OptConfig().serverPath+'/api/sign/clientSign'

  saveSigns(ids:string[],sign:string,signid:string,clientInfo:string):Promise<ResponseData>{
    return this.http.post(this.saveUrl,{signid:signid,sign:sign,ids:ids,clientinfo:clientInfo},{headers: this.headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  getClientInfo(signid:string):Promise<ResponseData>{
    return this.http.post(this.clientSignUrl,{signid:signid},{headers: this.headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }


  getSign(opid): Promise<ResponseData> {
    let token = this.cookieService.get('optAppToken');
    let headers=new Headers({'Content-Type': 'application/json','authorization':token})
    return this.http.get(this.getUrl+opid,{headers:headers})
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
