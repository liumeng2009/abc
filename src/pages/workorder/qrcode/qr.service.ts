import {Injectable} from '@angular/core';
import {Http,Response,Headers} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {ResponseData} from '../../../bean/responseData';

import {OptConfig} from '../../../config/config'
import {CookieService} from "angular2-cookie/core";

@Injectable()
export class QrService {
  constructor(private http: Http,private cookieService:CookieService) {

  }

  private url=new OptConfig().serverPath+'/api/sign/qr'

  getQr(ids): Promise<ResponseData> {
    let token = this.cookieService.get('optAppToken');
    let headers=new Headers({'Content-Type': 'application/json','authorization':token})
    let url=this.url;
    return this.http.post(url+'?device=webapp',ids,{headers:headers})
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
