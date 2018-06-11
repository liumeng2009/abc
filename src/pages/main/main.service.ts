import {Injectable} from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {CookieService} from 'angular2-cookie/core';

import {ResponseData} from '../../bean/responseData';

import {OptConfig} from '../../config/config'

@Injectable()
export class MainService {
  private loginurl = new OptConfig().serverPath + '/api/user/';
  private urltree = new OptConfig().serverPath + '/api/user/get/urltree';

  constructor(private http: Http, private cookieService: CookieService) {
  }

  getUserInfo(): Promise<ResponseData> {
    let token = this.cookieService.get('optToken');
    return this.http.get(this.loginurl + '?token=' + token)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }
}
