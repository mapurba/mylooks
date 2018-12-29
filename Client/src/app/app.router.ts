import { FeedComponent } from "./feed/feed.component";
import { Routes, RouterModule } from '@angular/router'
import { ProfileComponent } from "./profile/profile.component";
import { BlogComponent } from "./blog/blog.component";
import { AdminConsoleComponent } from "./admin/admin-console/admin-console.component";
import { PrivacyComponent } from "./privacy/privacy.component";

const appRoutes: Routes = [
    { path: '', component: FeedComponent },
    { path: 'feed', component: FeedComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'blog/:id', component: BlogComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'privacy/policy', component: PrivacyComponent },
    {
        path: 'admin',
        children: [
            { path: '', component: AdminConsoleComponent }
        ]
    },

    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);