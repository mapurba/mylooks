import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userPhotos:any;
  userDetail:any;
  constructor(private userService: UserService) {


    this.getUserDetail();
    this.getAllPostedPhotos();



  }

  getAllPostedPhotos(){
    this.userService.getAllUnSubmitedPhotos().subscribe((res)=>{
      this.userPhotos=res;
    });
  }
  importPhoto(){
    this.userService.importPhotos().subscribe((res)=>{
      console.log(res);
    },(err)=>{
      console.log(err);
    })
  }

  getUserDetail(){
    this.userService.getUserDetail().subscribe((res)=>{
      this.userDetail=res;
      console.table(res);
    })
  }

  ngOnInit() {
  }

}
