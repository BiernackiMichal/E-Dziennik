import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';
import { AuthTeacherService } from 'src/app/_services/authTeacher.service';
import { SubjectService } from 'src/app/_services/Subject.service';
import { TeacherService } from 'src/app/_services/teacher.service';
import { ISubject } from 'src/app/shared/_Interfaces/ISubject';
import { ITeacher } from 'src/app/shared/_Interfaces/ITeacher';
import { DeleteSubjectFormComponent } from '../DeleteSubjectForm/DeleteSubjectForm.component';
import { DeleteTeacherFormComponent } from '../DeleteTeacherForm/DeleteTeacherForm.component';
import { EditSubjectFormComponent } from '../EditSubjectForm/EditSubjectForm.component';
import { EditTeacherFormComponent } from '../EditTeacherForm/EditTeacherForm.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './AdminPanel.component.html',
  styleUrls: ['./AdminPanel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private router: Router, private authTeacherService: AuthTeacherService, private subjectService: SubjectService,
              private teacherService: TeacherService, private dialog: MatDialog, private toastr: ToastrService ) { }

private subjectsList: ISubject;
private teachersList: ITeacher;

get subjects() {
  return this.subjectsList;
}

get teachers() {
  return this.teachersList;
}

ngOnInit() {
this.loadSubjects();
this.loadTeachers();
}

private loadSubjects() {
  this.subjectService.getSubjects().subscribe(data => {
    this.subjectsList = data;
  },
  error => {this.toastr.error(error.error);
  });
}

private loadTeachers() {
  this.teacherService.getTeachers().subscribe(data => {
    this.teachersList = data;
  },
    error => {this.toastr.error(error.error);
  });
}

logout() {
  this.authTeacherService.logout();
  this.navigateToLoginComp();
}

private navigateToLoginComp() {
  this.router.navigate(['']);
}

openEditTeacherDialog(data) {
  let top = 10;
  if (window.innerHeight > 800) {
    top = 20;
  }
  this.dialog.open(EditTeacherFormComponent, {
  data,
  position: {
    top: top + '%'
  }
  });
}

openEditSubjectDialog(data) {
  let top = 10;
  if (window.innerHeight > 800) {
    top = 30;
  }
  this.dialog.open(EditSubjectFormComponent, {
  data,
  position: {
    top: top + '%'
  }
  });
}

openDeleteTeacherDialog(data) {
  this.dialog.open(DeleteTeacherFormComponent, {
  data
  });
}

openDeleteSubjectDialog(data) {
  this.dialog.open(DeleteSubjectFormComponent, {
  data
 });
}

}
