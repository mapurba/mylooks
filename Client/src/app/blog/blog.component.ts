import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.  getDirection();
  }

  lat: Number = 24.799448
  lng: Number = 120.979021

  origin: {}
  destination: {}

  

  getDirection() {

    // origin: LatLng | String | google.maps.Place,

    this.origin = { lat: 12.995276, lng:77.683971 }
    this.destination = { lat:12.946277, lng:77.680180 }

    // this.origin = 'Taipei Main Station'
    // this.destination = 'Taiwan Presidential Office'

  }
}
