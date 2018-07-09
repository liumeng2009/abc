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
    let headers=new Headers({'Content-Type': 'application/json'})
    return this.http.get(this.groupurl,{headers:headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  getCoporations(groupId): Promise<ResponseData> {
    let headers=new Headers({'Content-Type': 'application/json'})
    return this.http.get(this.corporationurl +'?group='+groupId,{headers:headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  getTypes(): Promise<ResponseData> {
    let headers=new Headers({'Content-Type': 'application/json'})
    return this.http.get(this.equiptypeurl,{headers:headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError)
  }

  getEquipment(typecode:string): Promise<ResponseData> {
    let headers=new Headers({'Content-Type': 'application/json'})
    if(typecode&&typecode!=''){
      return this.http
        .get(this.equipmenturl+'/'+typecode,{headers:headers})
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
    else{
      return this.http
        .get(this.equipmenturl,{headers:headers})
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
  }

  getBusinessContents(pageid,type:string,equipment:string):Promise<ResponseData>{
    let headers=new Headers({'Content-Type': 'application/json'})
    let url='';
    if(pageid){
      url=this.businessurl+'/page/'+pageid
    }
    else{
      url=this.businessurl
    }

    url=url+'?param=none'

    if(type&&type!=''){
      url=url+'&type='+type
    }
    if(equipment&&equipment!=''){
      url=url+'&equipment='+equipment
    }
    console.log(url);
    return this.http.get(url,{headers:headers})
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
