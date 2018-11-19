import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userPhotos:any;

  constructor(private userService: UserService) {


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

  ngOnInit() {
  }

}
