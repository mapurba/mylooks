import { Component ,OnInit} from '@angular/core';
import { UserDetailService } from './shared/services/user-detail.service';
 import { Router } from '@angular/router';
import { CookiesService } from 'src/app/shared/services/utilities/util_cookies/cookies.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(private UserDetailService:UserDetailService,private router:Router,private cookiesService:CookiesService) {
    console.log(this.cookiesService.getCookie('connect'));

   }
  
  


  ngOnInit() {
    this.getuserDetail();
  }

  getuserDetail(){
    this.UserDetailService.getuserDetail().subscribe((res)=>{
     console.log(res);
     this.router.navigate(['/Dashboard']);
    },err=>{

    });
   }
}
