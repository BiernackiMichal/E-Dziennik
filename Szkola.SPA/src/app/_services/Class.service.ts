import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IClass } from '../shared/_Interfaces/IClass';


@Injectable({
  providedIn: 'root'
})
export class ClassService {

constructor(private http: HttpClient) { }

  baseUrl = 'http://dziennik-001-site1.etempurl.com/api/SchoolClass';
// private baseUrl = 'http://localhost:5000/api/SchoolClass/';

getClasses(): Observable<IClass[]> {
  return this.http.get<IClass[]>(this.baseUrl);
}

addClass(data: any) {
  return this.http.post<IClass[]>(this.baseUrl, data);
}

deleteClass(data: any) {
  return this.http.delete<IClass[]>(this.baseUrl + data.classID);
}

editClass(data: any) {
  return this.http.put<IClass[]>(this.baseUrl + data.classID, data);

}
}
