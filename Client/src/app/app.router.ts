import { FeedComponent } from "./feed/feed.component";
import {Routes,RouterModule} from '@angular/router'
import { ProfileComponent } from "./profile/profile.component";
 
const appRoutes: Routes = [
    { path: '', component: FeedComponent },
    { path: 'feed', component: FeedComponent },
    { path: 'profile', component: ProfileComponent },
   
    { path: '**', redirectTo: '' }
];
 
export const routing = RouterModule.forRoot(appRoutes);