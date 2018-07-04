import {Injectable} from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {CookieService} from 'angular2-cookie/core';

import {ResponseData} from '../bean/responseData';

import {OptConfig} from '../config/config'

@Injectable()
export class AuthService {
  private headers;
  private loginurl = new OptConfig().serverPath + '/api/user/';

  constructor(private http: Http, private cookieService: CookieService) {
    let token = this.cookieService.get('optAppToken');
    this.headers=new Headers({authorization:token})
  }

  getUserInfo(): Promise<ResponseData> {
    console.log(this.headers);
    return this.http.get(this.loginurl,{headers:this.headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  checkLogin(){
      return new Promise((resolve,reject)=>{
        this.getUserInfo().then(
          data=>{
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
