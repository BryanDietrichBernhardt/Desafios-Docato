import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListOfUsersService {

  constructor(private http: HttpClient) { }

  getAll():Observable<any>{
    return this.http.get(`${baseUrl}clients`);
  }
}
