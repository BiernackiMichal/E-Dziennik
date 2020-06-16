import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassesComponent } from './components/Classes/Classes.component';
import { AdminPanelComponent } from './components/AdminPanel/AdminPanel.component';
import { AddStudentFormComponent } from './components/AddStudentForm/AddStudentForm.component';
import { AddTeacherFormComponent } from './components/AddTeacherForm/AddTeacherForm.component';
import { AuthGuard } from './_guard/auth.guard';
import { AddSubjectFormComponent } from './components/AddSubjectForm/AddSubjectForm.component';
import { AddClassFormComponent } from './components/AddClassForm/addClassForm.component';
import { EditStudentFormComponent } from './components/EditStudentForm/EditStudentForm.component';
import { LoginComponent } from './components/Login/Login.component';
import { StudentsComponent } from './components/Students/Students.component';
import { SubjectsComponent } from './components/Subjects/Subjects.component';



export const routes: Routes = [
  {
    path: 'edit-student-form',
    component: EditStudentFormComponent,
    canActivate: [AuthGuard],
    data: {roles: ['Admin']}
  },
  {
    path: 'add-class-form',
    component: AddClassFormComponent,
    canActivate: [AuthGuard],
    data: {roles: ['Admin']}
  },
  {
    path: 'add-subject-form',
    component: AddSubjectFormComponent,
    canActivate: [AuthGuard],
    data: {roles: ['Admin']}
  },
  {
    path: 'classes',
    component: ClassesComponent,
    canActivate: [AuthGuard],
    data: {roles: ['Admin', 'Teacher']}
  },
  {
    path: 'add-teacher-form',
    component: AddTeacherFormComponent,
    canActivate: [AuthGuard],
    data: {roles: ['Admin']}
  },
  {
    path: 'add-student-form',
    component: AddStudentFormComponent,
    canActivate: [AuthGuard],
    data: {roles: ['Admin']}
  },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    canActivate: [AuthGuard],
    data: {roles: ['Admin']}
  },
  {
    path: '' ,
    component: LoginComponent,
  },
  {
    path: 'students',
    component: StudentsComponent,
    canActivate: [AuthGuard],
    data: {roles: ['Admin', 'Teacher']}
  },
  {
    path: 'subjects',
    component: SubjectsComponent,
    canActivate: [AuthGuard],
    data: {roles: ['Admin', 'Teacher', 'Student']}
  }
];

@NgModule({
   imports: [
      RouterModule.forRoot(routes)
   ],
   exports: [
      RouterModule
   ],
   declarations: [  ]
})
export class AppRoutingModule { }
