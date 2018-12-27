import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit() {
  }


  public isloggedin(){
    // console.log(this.userService.isLogedinUser());
    return this.userService.isLogedinUser();
  }



}
