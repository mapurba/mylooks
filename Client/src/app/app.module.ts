import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed.component';
import { NavComponent } from './nav/nav.component';
import { ProfileComponent } from './profile/profile.component';
import { routing } from './app.router';
import { InterceptService } from './shared/services/http.interceptor.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { BlogComponent } from './blog/blog.component';
import { AdminConsoleComponent } from './admin/admin-console/admin-console.component';
import { FormsModule }   from '@angular/forms';
import { PrivacyComponent } from './privacy/privacy.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    NavComponent,
    ProfileComponent,
    BlogComponent,
    AdminConsoleComponent,
    PrivacyComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule

  ],
  providers: [
    InterceptService,
    { provide: APP_BASE_HREF, useValue : '/#/' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    },
    CookieService,
    HttpClientModule

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

