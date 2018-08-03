import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatTabsModule } from '@angular/material';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { BlogComponent } from './blog/blog.component';
import { HomeComponent } from './home/home.component';
import { InterceptService } from './shared/services/http.interceptor.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '../../node_modules/@angular/common/http';
import { CookiesService } from './shared/services/utilities/util_cookies/cookies.service';
import { DocumentRefService } from './shared/services/utilities/util_docRef/document-ref.service';
import { WindowRefService } from './shared/services/utilities/util_winRef/window-ref.service';
import { LoginComponent } from './login/login.component';


const appRoutes: Routes = [
  { path: 'Dashboard', component: DashBoardComponent },
  { path: 'home', component: HomeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: LoginComponent },
  
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashBoardComponent,
    BlogComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    LayoutModule,
    
    RouterModule.forRoot(appRoutes),
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatGridListModule,
    MatTabsModule,
    
    HttpClientModule
    
    
  ],
  providers: [
    // WindowRefService,
    DocumentRefService,
    CookiesService,
    InterceptService,
  
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    },
    

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
