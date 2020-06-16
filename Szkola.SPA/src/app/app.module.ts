import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {  MatDialogModule, } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { ToastrModule} from 'ngx-toastr';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StudentService } from './_services/Student.service';
import { ClassService } from './_services/Class.service';
import { ClassesComponent } from './components/Classes/Classes.component';
import { ShowGradesBySubjectPipe } from './_pipes/showGradesBySubject.pipe';
import { AddGradeFormComponent } from './components/AddGradeForm/AddGradeForm.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { EditGradeFormComponent } from './components/EditGradeForm/EditGradeForm.component';
import { AddStudentFormComponent } from './components/AddStudentForm/AddStudentForm.component';
import { AdminPanelComponent } from './components/AdminPanel/AdminPanel.component';
import { CommonModule } from '@angular/common';
import { AddTeacherFormComponent } from './components/AddTeacherForm/AddTeacherForm.component';
import { AuthGuard } from './_guard/auth.guard';
import { AddSubjectFormComponent } from './components/AddSubjectForm/AddSubjectForm.component';
import { EditStudentFormComponent } from './components/EditStudentForm/EditStudentForm.component';
import { EditClassFormComponent } from './components/editClassForm/editClassForm.component';
import { Navigation } from './shared/navigation/Navigation';
import { AddClassFormComponent } from './components/AddClassForm/addClassForm.component';
import { DeleteSubjectFormComponent } from './components/DeleteSubjectForm/DeleteSubjectForm.component';
import { DeleteTeacherFormComponent } from './components/DeleteTeacherForm/DeleteTeacherForm.component';
import { EditSubjectFormComponent } from './components/EditSubjectForm/EditSubjectForm.component';
import { EditTeacherFormComponent } from './components/EditTeacherForm/EditTeacherForm.component';
import { LoginComponent } from './components/Login/Login.component';
import { StudentsComponent } from './components/Students/Students.component';
import { SubjectsComponent } from './components/Subjects/Subjects.component';



@NgModule({
   declarations: [
      AppComponent,
      ClassesComponent,
      StudentsComponent,
      SubjectsComponent,
      ShowGradesBySubjectPipe,
      AddGradeFormComponent,
      EditGradeFormComponent,
      AddStudentFormComponent,
      AdminPanelComponent,
      LoginComponent,
      AddTeacherFormComponent,
      EditTeacherFormComponent,
      EditSubjectFormComponent,
      DeleteTeacherFormComponent,
      DeleteSubjectFormComponent,
      AddSubjectFormComponent,
      AddClassFormComponent,
      EditStudentFormComponent,
      EditClassFormComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      MatTableModule,
      HttpClientModule,
      AppRoutingModule,
      MatButtonModule,
      MatDialogModule,
      FormsModule,
      MatFormFieldModule,
      MatSelectModule,
      MatOptionModule,
      MatInputModule,
      MatMenuModule,
      MatIconModule,
      MatCardModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot(),
      MatProgressSpinnerModule,
      MatRadioModule,
      MatListModule,
      MatDividerModule,
      ReactiveFormsModule
   ],
   providers: [
      AuthGuard
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
