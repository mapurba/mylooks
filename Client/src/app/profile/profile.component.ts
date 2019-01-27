import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userPhotos: any;
  userDetail: any;
  enableCheckBoxes: boolean = false;
  enablePostPopup:boolean=false;
 
  constructor(private userService: UserService) {


   // this.getUserDetail();
    this.getUserPhotos();

    

  }

  getUserPhotos() {
    this.userService.getAllUnSubmitedPhotos().subscribe((res) => {
      this.userPhotos = res;
      this.userDetail = res.user;

    });
  }
  importPhoto() {
    this.userService.importPhotos().subscribe((res) => {
     // console.log(res);
     this.getUserPhotos();
    }, (err) => {
      console.log(err);
    })
  }

  copyToClipboard() {
    let item='https://mylooks.southeastasia.cloudapp.azure.com/blog/'+this.userDetail.username;
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (item));
      e.preventDefault();
      document.removeEventListener('copy', null);
      $('#share').tooltip('show')
    });
    document.execCommand('copy');
  }

  getUserDetail() {
    this.userService.getUserDetail().subscribe((res) => {
      this.userDetail = res;
     // console.table(res);
    })
  }


  enableEdit() {
    this.enableCheckBoxes ? this.enableCheckBoxes = false : this.enableCheckBoxes = true;
  }

  showAddphotos(){
    // this.enablePostPopup ? this.enablePostPopup = false : this.enablePostPopup = true;
    $('#postphotostoblog').modal('show');
  }


  ngOnInit() {
  }

}
