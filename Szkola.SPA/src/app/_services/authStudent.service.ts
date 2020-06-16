import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {map} from 'rxjs/operators' ;
import { IUser } from '../shared/_Interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthStudentService {

constructor(private http: HttpClient) { }
baseUrl = 'http://dziennik-001-site1.etempurl.com/api/authStudent/';
// private baseUrl = 'http://localhost:5000/api/authStudent/';

login(user: IUser) {
  return this.http.post(this.baseUrl + 'login', user)
    .pipe(map((response: any) => {
    const student =  response;
    if (student) {
      localStorage.setItem('token', student.token);
    }
  }));
}

logout() {
  localStorage.removeItem('token');
}

register(user: IUser) {
  return this.http.post(this.baseUrl + 'register', user);
}

}
