import { Component, Renderer2 } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { UserDetailService } from '../shared/services/user-detail.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '../../../node_modules/@angular/router';
import { Globals } from '../shared/services/globals';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  userDetail:any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );


  constructor(private router:Router,private breakpointObserver: BreakpointObserver,private renderer: Renderer2, private http: HttpClient,private userDetailService:UserDetailService,private cookieService: CookieService,private globals: Globals ) {
    // this.userDetail.getuserDetail();
    this.getuserDetail();
     }

   ImportPhotos(){
    this.http.get('/api/api/importInstagramPhotos').subscribe((res)=>{

    })
  }
  logout(){
    this.cookieService.delete('user');
    this.http.get('/api/logout').subscribe((res)=>{
      //  this.router.navigate(['/login']);
    });
    this.router.navigate(['/login']);
  }
  sidebarToggle(){
    
    // this.globals.sivebarToggle=!this.globals.sivebarToggle;
    // this.globals.sivebarToggle?this.renderer.addClass(document.body, 'is-collapsed'):this.renderer.removeClass(document.body, 'is-collapsed');
  }
   
  getuserDetail(){
    this.userDetailService.getuserDetail().subscribe((res)=>{
     this.userDetail=res;
    },err=>{
 
    });
   }
}
