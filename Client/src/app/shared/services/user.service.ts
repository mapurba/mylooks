import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  getAllUnSubmitedPhotos(): Observable<any> {
    return this.http.get('/api/account/getAllUnSubmitedPhotos');
  }

  getUserDetail():Observable<any>{
    return this.http.get('/api/account/detail');
  }


  importPhotos(): Observable<any> {
    return this.http.get('/api//api/importInstagramPhotos');
  }
}
