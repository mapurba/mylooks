import { BrowserModule } from '@angular/platform-browser';
import { NgModule  ,NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatTabsModule, MatMenuModule, MatSlideToggleModule } from '@angular/material';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { BlogComponent } from './blog/blog.component';
import { HomeComponent } from './home/home.component';
import { InterceptService } from './shared/services/http.interceptor.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '../../node_modules/@angular/common/http';
import { DocumentRefService } from './shared/services/utilities/util_docRef/document-ref.service';
// import { WindowRefService } from './shared/services/utilities/util_winRef/window-ref.service';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { routing } from 'src/app/app.routing';
import { CookieService } from 'ngx-cookie-service';
import { DragScrollModule } from 'ngx-drag-scroll';
import { Globals } from './shared/services/globals';
import { AgmCoreModule } from '@agm/core';            // @agm/core
import { AgmDirectionModule } from 'agm-direction'; 



@NgModule({
  providers: [
    // WindowRefService,
    CookieService,
    DocumentRefService,
    InterceptService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    },
    Globals,
  ],
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
    routing,
    AgmCoreModule.forRoot({ // @agm/core
      apiKey: 'AIzaSyBQEjefPCTAOXfzaGTUrahRXUQ-LYMX7vs',
    }),
    AgmDirectionModule,
    LayoutModule,
    MDBBootstrapModule.forRoot(),
    FlexLayoutModule,
    // RouterModule.forRoot(appRoutes),
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatTabsModule,
    HttpClientModule,
    DragScrollModule,
    MatMenuModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
