import { Injectable } from '@angular/core';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { Observable } from '../../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  _userDetail:any;

  constructor(private http:HttpClient) {
    this._userDetail={};
   }

 get userDetail(){
   return Observable.of(this._userDetail);
 } 

  getuserDetail(){
   return this.http.get('/api/account/detail');
  }
}
