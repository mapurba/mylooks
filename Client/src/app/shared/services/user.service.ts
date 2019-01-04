import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,private cookieService: CookieService) { }


  getAllUnSubmitedPhotos(): Observable<any> {
    return this.http.get('/api/user/photos');
  }

  submitTask(payload):Observable<any>{
    return this.http.post('/api/admin/task/approve',payload);
  }

  getUserDetail(userId?:any):Observable<any>{
    let url=userId?`/api/account/detail?id=${userId}`:'/api/account/detail';
    return this.http.get(url);
  }
  getUserDetailV2(userId?:any):Observable<any>{
    let url=`/api/user/details`;
    return this.http.get(url);
  }




  importPhotos(): Observable<any> {
    return this.http.get('/api/api/importInstagramPhotos');
  }

  reviewPhoto(publishPhotoList:any) {


     publishPhotoList.photos.map(element => {
       element.sendForReview=true;
    });
    return this.http.post('/api/user/postPhotosToBlog', publishPhotoList);

  }

  getAdminTask():Observable<any>{
    return this.http.get('/api/admin/tasklist');
  }

  isLogedinUser():boolean{

    if(this.cookieService.get('user_session')){
      // console.log(this.cookieService.get('user_session'));
      return true;
    }
    return false;
  }

}
