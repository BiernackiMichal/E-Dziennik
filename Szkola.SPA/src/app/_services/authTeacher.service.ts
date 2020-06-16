import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthTeacherService {

  constructor(private http: HttpClient) { }

 baseUrl = 'http://dziennik-001-site1.etempurl.com/api/authTeacher/';
// private baseUrl = 'http://localhost:5000/api/authTeacher/';



login(model: any) {
  return this.http.post(this.baseUrl + 'login', model)
  .pipe(map((response: any) => {
   const teacher =  response;
   if (teacher) {
    localStorage.setItem('token', teacher.token);
    }
   }));
}

logout() {
  this.removeItemsFromLocalStorage();
}

removeItemsFromLocalStorage() {
  localStorage.removeItem('token');
  localStorage.removeItem('className');
  localStorage.removeItem('classID');
  localStorage.removeItem('studentID');
  localStorage.removeItem('studentFirstName');
  localStorage.removeItem('studentLastName');
}

register(model: any) {
  return this.http.post(this.baseUrl + 'register', model);
}

}
