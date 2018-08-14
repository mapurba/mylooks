import { Component ,OnInit} from '@angular/core';
import { UserDetailService } from './shared/services/user-detail.service';
 import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(private UserDetailService:UserDetailService,private router:Router) {
    // console.log(this.cookiesService.getCookie('connect/.sid'));

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
