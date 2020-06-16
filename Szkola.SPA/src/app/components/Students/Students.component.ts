import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IStudent } from 'src/app/shared/_Interfaces/IStudent';
import { AuthTeacherService } from 'src/app/_services/authTeacher.service';
import { StudentService } from 'src/app/_services/Student.service';
import { UserRole } from 'src/app/shared/enums/userRole.enum';
import { EditStudentFormComponent } from '../EditStudentForm/EditStudentForm.component';

@Component({
  selector: 'app-students',
  templateUrl: './Students.component.html',
  styleUrls: ['./Students.component.css']
})
export class StudentsComponent implements OnInit {

private spinner = false;
private classId: string;
private className: string;
private dataSource: MatTableDataSource<IStudent>;
private readonly columns: string[] = ['name'];
private clientX = 0;
private clientY = 0;
private description: any = '';
private decodedToken: any;
private token: string;
private jwtHelper = new JwtHelperService();
private screenWidth: number;

constructor(private student: StudentService, private router: Router, private authTeacherService: AuthTeacherService,
            private dialog: MatDialog) {
this.getScreenSize();
}



@HostListener('window:resize', ['$event'])
private getScreenSize(event?): void {
  this.screenWidth = window.innerWidth;
}

ngOnInit() {
  this.showSpinner();
  this.getItemsFromLocalStorage();
  this.decodeToken();
  this.loadStudentsAndHideSpinnerAfterDone();
}

private showSpinner(): void {
  this.spinner = true;
}

private getItemsFromLocalStorage(): void {
  this.getClassNameFromLocalStorage();
  this.getClassIDFromLocalStorage();
  this.getTokenFromLocalStorage();
}

private getClassNameFromLocalStorage(): void {
  this.className = localStorage.getItem('className');
}

private getClassIDFromLocalStorage(): void {
  this.classId = localStorage.getItem('classID');
}

private getTokenFromLocalStorage(): void {
  this.token = localStorage.getItem('token');
}

private decodeToken(): void {
  this.decodedToken = this.jwtHelper.decodeToken(this.token);
}

private loadStudentsAndHideSpinnerAfterDone(): void {
  this.student.getStudentsByClassId(this.classId).subscribe(data => {
    this.dataSource = new MatTableDataSource(data);
    this.hideSpinner();
  });
}

get IsSpinnerVisible(): boolean {
  return this.spinner;
}

setStudentInLocalStorageAndNavigateToSubjects(student): void {
  this.setStudentItemsInLocalStorage(student);
  this.router.navigate(['/subjects']);
}

private setStudentItemsInLocalStorage(student): void {
  this.setStudentFirstNameInLocalStorage(student);
  this.setStudentIDInLocalStorage(student);
  this.setStudentLastNameInLocalStorage(student);
}

private setStudentFirstNameInLocalStorage(student): void {
  localStorage.setItem('studentFirstName', student.firstName);
}

private setStudentIDInLocalStorage(student): void {
  localStorage.setItem('studentID', student.studentID);
}

private setStudentLastNameInLocalStorage(student): void {
  localStorage.setItem('studentLastName', student.lastName);
}

coordinates(event: MouseEvent): void {
  this.clientX = event.clientX + 30;
  this.clientY = event.clientY - 30;
}

openEditStudentDialog(data): void {
  if (this.userRole === UserRole.ADMIN ) {
    this.dialog.open(EditStudentFormComponent, {
    data
  });
 }
}

get userRole(): string {
  return this.decodedToken.UserRole;
}

showStudentDescription(description): void {
  if (this.isClientXHigherThanScreenWidth()) {
    this.hideStudentDescription();
  } else {
  this.setAndShowStudentDescription(description);
  }
}

private isClientXHigherThanScreenWidth(): boolean {
  return this.clientX > this.screenWidth - 200;
}

hideStudentDescription(): void {
  const nativeElement =  document.getElementById('desc');
  nativeElement.style.display = 'none';
}

private setAndShowStudentDescription(description): void {
  const nativeElement =  document.getElementById('desc');
  nativeElement.style.display = 'block';
  this.description = description;
  nativeElement.className = 'student-description';
  nativeElement.style.left = this.clientX + 'px';
  nativeElement.style.top = this.clientY + 'px';
}


logoutAndNavigateToHome(): void {
  this.authTeacherService.logout();
  this.router.navigate(['']);
}

private hideSpinner(): void {
  this.spinner = false;
}

getClassName(): string {
  return this.className;
}

get displayedColumns(): string[] {
  return this.columns;
}

getDataSource(): MatTableDataSource<IStudent> {
  return this.dataSource;
}

get studentDescription() {
  return this.description;
}
}

