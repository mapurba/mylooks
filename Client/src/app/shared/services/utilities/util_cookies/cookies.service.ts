import { Injectable } from '@angular/core';
import {DocumentRefService} from "../util_docRef/document-ref.service";

@Injectable()
export class CustomCookiesService {

  constructor(private documentRef: DocumentRefService) { }

  getCookie(name: string): string {
    const nameLenPlus = (name.length + 1);
    return this.documentRef.nativeDocument.cookie
        .split(';')
        .map(c => c.trim())
        .filter(cookie => {
          return cookie.substring(0, nameLenPlus) === `${name}=`;
        })
        .map(cookie => {
          return decodeURIComponent(cookie.substring(nameLenPlus));
        })[0] || null;
  }

  setCookie(name: string, value: string , path: string = '', expireDays?: number) {
    let d:Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires:string = `expires=${d.toUTCString()}`;
    let cpath:string = path ? `; path=${path}` : '';
    this.documentRef.nativeDocument.cookie = `${name}=${value}; ${expires}${cpath}`;
  }

  deleteCookie(name: string) {
    this.setCookie(name, "", '/', -1);
  }
   eraseCookieFromAllPaths(name) {
    // This function will attempt to remove a cookie from all paths.
    var pathBits = location.pathname.split('/');
    var pathCurrent = ' path=';

    // do a simple pathless delete first.
    this.documentRef.nativeDocument.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;';

    for (var i = 0; i < pathBits.length; i++) {
        pathCurrent += ((pathCurrent.substr(-1) != '/') ? '/' : '') + pathBits[i];
        this.documentRef.nativeDocument.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;' + pathCurrent + ';';
    }
}

}
