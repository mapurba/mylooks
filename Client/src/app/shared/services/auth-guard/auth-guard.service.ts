import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookiesService } from 'src/app/shared/services/utilities/util_cookies/cookies.service';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router,private cookiesService:CookiesService) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      console.log(this.cookiesService.getCookie('connect.sid'));
        if (this.cookiesService.getCookie('connect.sid')) {
            // logged in so return true
            return true;
        }
 
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
