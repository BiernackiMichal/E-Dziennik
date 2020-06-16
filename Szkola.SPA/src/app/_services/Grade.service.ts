import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGrade } from '../shared/_Interfaces/IGrade';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

constructor(private http: HttpClient) { }

  baseUrl = 'http://dziennik-001-site1.etempurl.com/api/Grade/';
// private baseUrl = 'http://localhost:5000/api/Grade/';

addGrade(data: any) {
  return this.http.post<IGrade[]>(this.baseUrl, data);
}

getGradesByStudentID(id): Observable<IGrade[]> {
  return this.http.get<IGrade[]>(this.baseUrl + 'GetGradesWithSubjectsByStudentID/' + id);
}


editGrade(grade: any) {
  return this.http.put<IGrade[]>(this.baseUrl + grade.id , grade);
}

deleteGrade(grade: any) {
  return this.http.delete<IGrade[]>(this.baseUrl + grade.id);
}

}
