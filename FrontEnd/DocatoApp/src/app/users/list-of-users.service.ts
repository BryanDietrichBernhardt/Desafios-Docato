import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListOfUsersService {

  id: number = 0;

  constructor(private http: HttpClient) { }

  getAll():Observable<any> {
    return this.http.get(`${baseUrl}clients`);
  }

  delete():Observable<any> {
    return this.http.delete(`${baseUrl}clients/${this.id}`);
  }

  edit(data):Observable<any> {
    return this.http.put(`${baseUrl}clients/${this.id}`, data);
  }

  register(data):Observable<any> {
    return this.http.post(`${baseUrl}clients`, data);
  }
}
