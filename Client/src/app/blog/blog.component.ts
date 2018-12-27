import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  userfeed = [1, 2, 3];
  userBlogPhotos: any;
  currentUserBlogID: any;
  userDetail: any;
  loadingPhotos:boolean=true;
  constructor(private http: HttpClient, private route: ActivatedRoute, private userService: UserService) {
    this.currentUserBlogID = this.route.snapshot.paramMap.get('id');
    this.getUserDetail(this.currentUserBlogID);
    this.getUserblogPhotos(this.currentUserBlogID);
  }

  ngOnInit() {

  }

  getUserDetail(userId) {
    this.userService.getUserDetail(userId).subscribe((res) => {
      this.userDetail = res;
    });
  }

  getUserblogPhotos(userId) {
    let url = userId ? `/api/api/getUserBlogPhotos?id=${userId}` : '/api/api/getUserBlogPhotos';
    this.http.get(url).subscribe((res) => {
      this.userBlogPhotos = res;
      this.loadingPhotos=false;
    });
  }

}
