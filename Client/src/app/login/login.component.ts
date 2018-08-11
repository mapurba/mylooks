import { Component, OnInit } from '@angular/core';
import { UserDetailService } from '../shared/services/user-detail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private UserDetailService:UserDetailService,private router:Router) { }
  


  ngOnInit() {
  }

  getuserDetail(){
    this.UserDetailService.getuserDetail().subscribe((res)=>{
     console.log(res);
     this.route.navigate(['/Dashboard']);
    },err=>{

    });
   }

}
