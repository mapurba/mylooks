import { Component ,OnInit, Renderer2} from '@angular/core';
import { UserDetailService } from './shared/services/user-detail.service';
 import { Router } from '@angular/router';
import { Globals } from './shared/services/globals';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(private UserDetailService:UserDetailService,private router:Router,private renderer: Renderer2,private globals: Globals) {
    // console.log(this.cookiesService.getCookie('connect/.sid'));

   }
  
  
sidebarToggle(){
  // $('#chat-sidebar-toggle').on('click', e => {
  //   $('#chat-sidebar').toggleClass('open');
  //   e.preventDefault();
  // });
  this.globals.sivebarToggle=!this.globals.sivebarToggle;
  this.globals.sivebarToggle?this.renderer.addClass(document.body, 'is-collapsed'):this.renderer.removeClass(document.body, 'is-collapsed');
}


  ngOnInit() {
    this.getuserDetail();
  }

  getuserDetail(){
    this.UserDetailService.getuserDetail().subscribe((res)=>{
    // console.log(res);
    // this.router.navigate(['/Dashboard']);
    },err=>{

    });
   }
}
