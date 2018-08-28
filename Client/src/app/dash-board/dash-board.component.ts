import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { UserDetailService } from '../shared/services/user-detail.service';
import { MatSnackBar } from '@angular/material';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
class photos {
  caption: any;
  datePosted: any;
  facebookId: any;
  like_count: any;
  media_url: any;
  permalink: any;
  sendForReview: boolean;
  updatedAt: any;
  _id: any;
}



@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss'],
  providers: [MatGridListModule, MatCardModule, MatGridListModule, MatTabsModule, MatSnackBar]
})
export class DashBoardComponent implements OnInit {
  tiles: Tile[] = [
    { text: 'Two', cols: 1, rows: 1, color: 'lightgreen' },
    { text: 'One', cols: 1, rows: 1, color: 'lightblue' },
    // {text: 'Four', cols: 4, rows: 0.8, color: '#DDBDF1'},
  ];
  snackBarRef: any = '';
  tempPayload: any = '';
  unSubmitedPhotos: photos[];
  userDetail: any;
  selectedPhotosCount: any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
   
  

  constructor(private breakpointObserver: BreakpointObserver, private http: HttpClient,
    private UserDetailService: UserDetailService,
    private snackBar: MatSnackBar) {
    this.unSubmitedPhotos = [];
    this.selectedPhotosCount = 0;
  }


  ngOnInit() {
    this.getAllUnSubmitedPhotos();
    this.getuserDetail();
  }

  getAllUnSubmitedPhotos() {
    this.http.get('/api/account/getAllUnSubmitedPhotos').subscribe((res: any) => {
      this.unSubmitedPhotos = res;

    }, (err) => {

    });
  }
  importPhotos() {
    this.http.get('/api/api/importInstagramPhotos').subscribe((res: any) => {
      console.log('sucessfully importeed the photos')
      this.getAllUnSubmitedPhotos();

    }, (err) => {

    });
  }

  getuserDetail() {
    this.UserDetailService.getuserDetail().subscribe((res) => {
      this.userDetail = res;
    }, err => {

    });
  }
  addToList(index, photo) {

    this.unSubmitedPhotos[index].sendForReview = !this.unSubmitedPhotos[index].sendForReview;
    if (this.unSubmitedPhotos[index].sendForReview) {
      this.selectedPhotosCount++;
    } else {
      this.selectedPhotosCount--;
    }
  }
  reviewPhoto() {


    this.tempPayload = this.unSubmitedPhotos.filter((val) => { return (val.sendForReview >= true); });
    this.http.post('/api/account/importPhotosFromInstagram', this.tempPayload).subscribe(res => {
      let action = '';
      this.snackBar.open('Photos Posted !', action, {
        duration: 2000,
      });
      this.getAllUnSubmitedPhotos();

    }, (err) => {
      let action = '';
      this.snackBarRef = this.snackBar.open('FAiled to add photo ', action, {
        duration: 2000,
      });
      this.snackBarRef.onAction().subscribe(() => {

        console.log('Retying ..!');
      });

    })

  }


  




}
