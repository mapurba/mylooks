import {Injectable, Injector} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent, HttpEvent} from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map, filter, tap } from 'rxjs/operators';
import { Router } from "../../../../node_modules/@angular/router";
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class InterceptService implements HttpInterceptor {

  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  replayRequestURL: string | Request;
  authenticationInProgress: boolean = false;
  cachedRequests: Array<HttpRequest<any>> = [];
  requestBackup: any;
  _next: any;



  constructor( private injector: Injector,private route:Router) {

    this.isRefreshingToken = false;
  }

  // addToken(req: HttpRequest<any>): HttpRequest<any> {

    // let spiffyCookie = this.cookiesService.getCookie('Spiffy_Session');
    // if (spiffyCookie != undefined) {
    //   let spiffyComponents = spiffyCookie.split(',');
    //   req = req.clone({setHeaders: {Authorization: 'Bearer ' + spiffyComponents[1]}});
    //   let headerValue = this.cookiesService.getCookie('token');
    //   const authReq = req.clone({
    //     headers: req.headers.set('token', headerValue)
    //   });
    // }
    // return req;
  // }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._next = next;
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // const elapsed = Date.now() - started;
          // console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
        }
      }, error => {
        if(error.status == 401){
          this.route.navigate(['/login']);
          console.error('not logged in');
        }
       
      })
    )
  }

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  handel401(error,req): Observable<any> {
    this.collectFailedRequest(req);
    return Observable.throw(error);
  }

  

}

