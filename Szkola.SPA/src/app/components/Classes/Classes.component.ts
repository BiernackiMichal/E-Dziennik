import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatDialog } from '@angular/material/dialog';

import { ClassService } from 'src/app/_services/Class.service';
import { IClass } from 'src/app/shared/_Interfaces/IClass';
import { AuthTeacherService } from 'src/app/_services/authTeacher.service';
import { EditClassFormComponent } from '../editClassForm/editClassForm.component';

@Component({
  selector: 'app-gradestable',
  templateUrl: './Classes.component.html',
  styleUrls: ['./Classes.component.css']
})
export class ClassesComponent implements OnInit {

private columns: string[] = ['name', 'educator'];
private dataSource: MatTableDataSource<IClass>;
private decodedToken: any;
private  token: any;
private jwtHelper = new JwtHelperService();



constructor(private schoolClass: ClassService, private router: Router, private authTeacherService: AuthTeacherService,
            private dialog: MatDialog) {

this.loadClasses();
}

private loadClasses() {
  this.schoolClass.getClasses().subscribe(data => {
    this.dataSource = new MatTableDataSource(data);
  });
}

ngOnInit() {
  this.getTokenFromLocalStorage();
  this.decodeToken();
}

private getTokenFromLocalStorage() {
  this.token = localStorage.getItem('token');
}

private decodeToken() {
  this.decodedToken = this.jwtHelper.decodeToken(this.token);
}

setClassDataInLocalStorage(data) {
  localStorage.setItem('className', data.name);
  localStorage.setItem('classID', data.classID);
  this.navigateToStudentsComp();
}

private navigateToStudentsComp() {
  this.router.navigate(['/students']);
}

private navigateToLoginComp() {
  this.router.navigate(['']);
}

logout() {
  this.authTeacherService.logout();
  this.navigateToLoginComp();
}
openEditClassDialog(data) {
 this.dialog.open(EditClassFormComponent, {data});
}

get displayedColumns() {
  return this.columns;
}
get userRole() {
  return this.decodedToken.UserRole;
}

getDataSource() {
  return this.dataSource;
}
}



