import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  userfeed=[1,2,3];
  userBlogPhotos:any;
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.getUserblogPhotos();
  }

  getUserblogPhotos(){
    this.http.get('/api/api/getUserBlogPhotos').subscribe((res)=>{
      this.userBlogPhotos=res;
    })
  }

}
