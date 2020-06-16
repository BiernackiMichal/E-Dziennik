import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISubject } from '../shared/_Interfaces/ISubject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

constructor(private http: HttpClient) { }

  baseUrl = 'http://dziennik-001-site1.etempurl.com/api/Subject/';
// private baseUrl = 'http://localhost:5000/api/Subject/';

getSubjects(): Observable<any>  {
  return this.http.get(this.baseUrl);
}

editSubject(subject): Observable<ISubject[]> {
  return this.http.put<ISubject[]>(this.baseUrl + subject.subjectID, subject);
}

deleteSubject(subjectID): Observable<ISubject[]> {
  return this.http.delete<ISubject[]>(this.baseUrl + subjectID);
}

addSubject(data: any) {
  return this.http.post<ISubject[]>(this.baseUrl, data);
}

}
