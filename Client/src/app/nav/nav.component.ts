import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { UserDetailService } from '../shared/services/user-detail.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '../../../node_modules/@angular/router';

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

  constructor(private router:Router,private breakpointObserver: BreakpointObserver, private http: HttpClient,private userDetail:UserDetailService,private cookieService: CookieService) {
    this.userDetail.getuserDetail();
   }

   ImportPhotos(){
    this.http.get('/api/api/importInstagramPhotos').subscribe((res)=>{

    })
  }
  logout(){
    //this.cookieService.deleteAll();
    this.http.get('/api/logout').subscribe((res)=>{
      //  this.router.navigate(['/login']);
    });
    this.router.navigate(['/login']);
  }
   
}
