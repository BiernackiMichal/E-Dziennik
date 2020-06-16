import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IStudent } from '../shared/_Interfaces/IStudent';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

constructor(private http: HttpClient) { }

  baseUrl = 'http://dziennik-001-site1.etempurl.com/api/Student/';
// private baseUrl = 'http://localhost:5000/api/Student/';

getStudentsByClassId(id): Observable<IStudent[]> {
  return this.http.get<IStudent[]>(this.baseUrl + 'GetStudentsByClassId/' + id);
}

editStudent(student): Observable<IStudent[]> {
  return this.http.put<IStudent[]>(this.baseUrl + student.studentID, student);
}

deleteStudent(studentID): Observable<IStudent[]> {
  return this.http.delete<IStudent[]>(this.baseUrl + studentID);
}

}
