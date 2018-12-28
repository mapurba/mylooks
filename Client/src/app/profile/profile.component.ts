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
  publishPhotoList:Map<String,any>;
  constructor(private userService: UserService) {


    this.getUserDetail();
    this.getAllUnPostedPhotos();

    this.publishPhotoList = new Map();

  }

  getAllUnPostedPhotos() {
    this.userService.getAllUnSubmitedPhotos().subscribe((res) => {
      this.userPhotos = res;
    });
  }
  importPhoto() {
    this.userService.importPhotos().subscribe((res) => {
     // console.log(res);
     this.getAllUnPostedPhotos();
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

  addPhotoToList(item, $event) {
    let tempitem= Object.assign({},item);
    tempitem.image="";
    if( $event.target.checked){
      
      this.publishPhotoList.set(item._id,tempitem);
    }
    else{
      this.publishPhotoList.delete(item._id);
    }
    
  }

  publish(){

    this.userService.reviewPhoto(this.publishPhotoList).subscribe((res)=>{
    //  console.log(res);
      this.getAllUnPostedPhotos();
    })
  }
  

  ngOnInit() {
  }

}
