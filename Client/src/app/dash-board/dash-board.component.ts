import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { UserDetailService } from '../shared/services/user-detail.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss'],
  providers: [MatGridListModule, MatCardModule, MatGridListModule, MatTabsModule]
})
export class DashBoardComponent implements OnInit {

  unSubmitedPhotos: any[];
  userDetail:any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,private http:HttpClient,private UserDetailService:UserDetailService ) { }


  ngOnInit() {
    this.login();
    this.getuserDetail();
  }

  login() {
    this.http.get('/api/account/getAllUnSubmitedPhotos').subscribe((res:any) => {
      this.unSubmitedPhotos = res;

    }, (err) => {

    });
  }

  getuserDetail(){
   this.UserDetailService.getuserDetail().subscribe((res)=>{
    this.userDetail=res;
   },err=>{
     
   });
  }

  
  

}
