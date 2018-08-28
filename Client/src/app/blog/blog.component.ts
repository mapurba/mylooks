import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatDialog} from '@angular/material';
import { DialogOverviewExampleDialog } from '../alert/alert.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  adminTask: any;
  switchView:boolean=false;
  selectedTask: any;
  animal: string;
  name: string;
  constructor(private http: HttpClient,public dialog: MatDialog) { }

  ngOnInit() {
    // this.getDirection();
    this.getTasks();
  }

  lat: Number = 24.799448
  lng: Number = 120.979021

  origin: {}
  destination: {}



  getDirection() {

    // origin: LatLng | String | google.maps.Place,

    this.origin = { lat: 12.995276, lng: 77.683971 }
    this.destination = { lat: 12.946277, lng: 77.680180 }

    // this.origin = 'Taipei Main Station'
    // this.destination = 'Taiwan Presidential Office'

  }


  getTasks() {
    this.http.get('/api/admin/tasklist').subscribe((res) => {
      this.adminTask = res;
    }, (err) => { });

  }
  openTask(data) {
    this.switchView=true;
    this.selectedTask = data;
  }
  openDialog(data): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '100%',
      data: {data}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}
