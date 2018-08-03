import { Injectable } from '@angular/core';
import {DocumentRefService} from "../util_docRef/document-ref.service";

@Injectable()
export class CookiesService {

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

}
