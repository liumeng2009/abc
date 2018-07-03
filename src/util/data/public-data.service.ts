import {Injectable} from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {CookieService} from 'angular2-cookie/core';

import {ResponseData} from '../../bean/responseData';

import {OptConfig} from '../../config/config'

@Injectable()
export class PublicDataService {
  private groupurl = new OptConfig().serverPath + '/api/groups/list';
  private corporationurl = new OptConfig().serverPath + '/api/corporations/list';
  private equiptypeurl = new OptConfig().serverPath + '/api/equipType/list';
  private equipmenturl = new OptConfig().serverPath + '/api/business/getequip/get';
  private businessurl = new OptConfig().serverPath + '/api/business/list';

  constructor(private http: Http, private cookieService: CookieService) {
  }

  getGroups(): Promise<ResponseData> {
    let token = this.cookieService.get('optAppToken');
    console.log(token);
    return this.http.get(this.groupurl + '?token=' + token)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  getCoporations(groupId): Promise<ResponseData> {
    let token = this.cookieService.get('optAppToken');
    console.log(token);
    return this.http.get(this.corporationurl +'?group='+groupId+ '&token=' + token)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  getTypes(): Promise<ResponseData> {
    return this.http.get(this.equiptypeurl)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  getEquipment(typecode:string): Promise<ResponseData> {
    console.log(this.equipmenturl+'/'+typecode);
    if(typecode&&typecode!=''){
      console.log(this.equipmenturl+'/'+typecode);
      return this.http
        .get(this.equipmenturl+'/'+typecode)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
    else{
      return this.http
        .get(this.equipmenturl)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
  }

  getBusinessContents(pageid,type:string,equipment:string):Promise<ResponseData>{
    let token=this.cookieService.get('optToken');
    let url='';
    if(pageid){
      url=this.businessurl+'/page/'+pageid+'?token='+token
    }
    else{
      url=this.businessurl+'?token='+token
    }
    if(type&&type!=''){
      url=url+'&type='+type
    }
    if(equipment&&equipment!=''){
      url=url+'&equipment='+equipment
    }
    console.log(url);
    return this.http.get(url)
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
