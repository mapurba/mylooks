import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { UserDetailService } from '../shared/services/user-detail.service';
import { CookiesService } from 'src/app/shared/services/utilities/util_cookies/cookies.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private http: HttpClient,private userDetail:UserDetailService,private CookiesService:CookiesService) {
    this.userDetail.getuserDetail();
    this.CookiesService.setCookie('ss','sss');
   }

   ImportPhotos(){
    this.http.get('/api/api/importInstagramPhotos').subscribe((res)=>{

    })
  }
  logout(){
    this.CookiesService.deleteCookie('connect.sid');
  }
   
}
