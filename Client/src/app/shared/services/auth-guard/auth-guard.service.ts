import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router,private CookieService:CookieService) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      
    //  console.log( this.CookieService.get('user'));
        if (this.CookieService.get('user')) {
            // logged in so return true
            return true;
        }
 
        // not logged in so redirect to login page with the return url
        // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return true;
    }
}
