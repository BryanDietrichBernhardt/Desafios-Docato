import { baseUrl } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUser: boolean = false

  showNavEmitter = new EventEmitter<boolean>(); //new EventEmitter<boolean>()

  constructor(private http:HttpClient, private router: Router) { }

  login(data):Observable<any>{
    return this.http.post(`${baseUrl}login`, data);
  }

  loginUser(auth) {
    this.authUser = auth;
    this.showNavEmitter.emit(true);
    if(auth === true) {
      this.router.navigate(['/']);
    } else {
      this.authUser = auth;
      this.showNavEmitter.emit(false);
    }
  }

  isUserAuth() {
    return this.authUser;
  }

}
