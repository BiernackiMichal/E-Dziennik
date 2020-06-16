import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITeacher } from '../shared/_Interfaces/ITeacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

constructor(private http: HttpClient) { }

   baseUrl = 'http://dziennik-001-site1.etempurl.com/api/Teacher/';
// private baseUrl = 'http://localhost:5000/api/Teacher/';

getTeacher(id): Observable<ITeacher[]> {
  return this.http.get<ITeacher[]>(this.baseUrl + id);
}

getTeachers(): Observable<any>  {
  return this.http.get(this.baseUrl);
}

editTeacher(teacher): Observable<ITeacher[]> {
  return this.http.put<ITeacher[]>(this.baseUrl + teacher.teacherID, teacher);
}

deleteTeacher(teacherID): Observable<ITeacher[]> {
  return this.http.delete<ITeacher[]>(this.baseUrl + teacherID);
}

}
