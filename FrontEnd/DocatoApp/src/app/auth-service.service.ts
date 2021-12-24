import { baseUrl } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from './login/usuario'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  authUser: boolean = false
  data: User = new User;

  constructor(private http:HttpClient, private router: Router) { }

  login(data):Observable<any>{
    return this.http.post(`${baseUrl}login`, data);
  }

  loginUser(auth) {
    this.authUser = auth;
    if(auth === true) {
      this.router.navigate(['/']);
    }
  }

}
