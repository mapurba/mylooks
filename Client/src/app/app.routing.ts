import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/shared/services/auth-guard/auth-guard.service';
import { HomeComponent } from 'src/app/home/home.component';
import { LoginComponent } from 'src/app/login/login.component';
import { BlogComponent } from 'src/app/blog/blog.component';
import { DashBoardComponent } from 'src/app/dash-board/dash-board.component';
 

 
const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuardService] },
    { path: 'Dashboard', component: DashBoardComponent ,canActivate: [AuthGuardService]},
    { path: 'home', component: HomeComponent,canActivate: [AuthGuardService] },
    { path: 'admin', component: BlogComponent,canActivate: [AuthGuardService] },
    { path: 'login', component: LoginComponent },
 
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
 
export const routing = RouterModule.forRoot(appRoutes);