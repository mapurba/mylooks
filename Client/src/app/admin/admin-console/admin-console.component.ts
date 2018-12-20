import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.css']
})
export class AdminConsoleComponent implements OnInit {
  adminTask:any;
  constructor(private userService:UserService) { }

  ngOnInit() {

    this.getAdminTask();
  }


  getAdminTask(){
    this.userService.getAdminTask().subscribe((res)=>{
      this.adminTask=res;
    });
  }

}
