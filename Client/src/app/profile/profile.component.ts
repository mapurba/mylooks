import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';

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
    this.getAllPostedPhotos();

    this.publishPhotoList = new Map();

  }

  getAllPostedPhotos() {
    this.userService.getAllUnSubmitedPhotos().subscribe((res) => {
      this.userPhotos = res;
    });
  }
  importPhoto() {
    this.userService.importPhotos().subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    })
  }

  getUserDetail() {
    this.userService.getUserDetail().subscribe((res) => {
      this.userDetail = res;
      console.table(res);
    })
  }


  enableEdit() {
    this.enableCheckBoxes ? this.enableCheckBoxes = false : this.enableCheckBoxes = true;
  }

  addPhotoToList(item, $event) {
    if( $event.target.checked){
      this.publishPhotoList.set(item._id,item);
    }
    else{
      this.publishPhotoList.delete(item._id);
    }
    
  }

  publish(){

    this.userService.reviewPhoto(this.publishPhotoList).subscribe((res)=>{
      console.log(res);
    })
  }
  

  ngOnInit() {
  }

}
