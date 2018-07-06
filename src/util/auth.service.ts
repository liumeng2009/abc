import {Injectable} from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {CookieService} from 'angular2-cookie/core';

import {ResponseData} from '../bean/responseData';

import {OptConfig} from '../config/config'

@Injectable()
export class AuthService {
  private loginurl = new OptConfig().serverPath + '/api/user/';

  constructor(private http: Http, private cookieService: CookieService) {

  }

  getUserInfo(): Promise<ResponseData> {
    let token = this.cookieService.get('optAppToken');
    let headers=new Headers({'Content-Type': 'application/json','authorization':token})
    return this.http.get(this.loginurl,{headers:headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  checkLogin(){
      return new Promise((resolve,reject)=>{
        this.getUserInfo().then(
          data=>{
            console.log(data);
            if(data&&data.status==0){
              resolve(data);
            }
            else{
              reject({message:data.message,action:'login'})
            }
          },
          error=>{
            reject({message:error});

          }
        )
      })
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
