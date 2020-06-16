import { Component, OnInit, HostListener } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


import { JwtHelperService } from '@auth0/angular-jwt';
import { ISubject } from 'src/app/shared/_Interfaces/ISubject';
import { IGradeDetails } from 'src/app/shared/_Interfaces/IGradeDetails';
import { AuthStudentService } from 'src/app/_services/authStudent.service';
import { SubjectService } from 'src/app/_services/Subject.service';
import { AuthTeacherService } from 'src/app/_services/authTeacher.service';
import { GradeService } from 'src/app/_services/Grade.service';
import { UserRole } from 'src/app/shared/enums/userRole.enum';
import { IGrade } from 'src/app/shared/_Interfaces/IGrade';
import { AddGradeFormComponent } from '../AddGradeForm/AddGradeForm.component';
import { EditGradeFormComponent } from '../EditGradeForm/EditGradeForm.component';



@Component({
  selector: 'app-subjects',
  templateUrl: './Subjects.component.html',
  styleUrls: ['./Subjects.component.css'],
})
export class SubjectsComponent implements OnInit {


private studentID: string;
private spinner = false;
private studentGrades: any ;
private dataSource: MatTableDataSource<ISubject>;
private readonly columns: string[] = ['subjects', 'gradesFirstHalf', 'gradesSecondHalf',  'averageFirstHalf', 'averageSecondHalf'];
private clientX = 0;
private clientY = 0;
private studentFirstName: string;
private studentLastName: string;
private className: string;
private decodedToken: any;
private token: any;
private jwtHelper = new JwtHelperService();
private gradeDetails: IGradeDetails;
private screenWidth: number;


constructor(private authStudentService: AuthStudentService, private subjectService: SubjectService,
            public dialog: MatDialog, private authTeacherService: AuthTeacherService, private router: Router,
            private gradeService: GradeService) {

this.getScreenSize();
}

@HostListener('window:resize', ['$event'])
getScreenSize(event?) {
  this.screenWidth = window.innerWidth;
}

ngOnInit() {
  this.showSpinner();
  this.getTokenFromLocalStorage();
  this.decodeToken();
  this.getDataDependsOnUser();
  this.loadGradesWithSubjects();
}

private showSpinner() {
  this.spinner = true;
}

private getTokenFromLocalStorage() {
  this.token = localStorage.getItem('token');
}

private decodeToken() {
  this.decodedToken = this.jwtHelper.decodeToken(this.token);
}

getDataDependsOnUser() {
  if (this.userRole === UserRole.STUDENT) {
    this.getDataForStudentFromToken();
  }
  if (this.userRole === UserRole.TEACHER || this.userRole === UserRole.ADMIN) {
    this.getDataForTeacherFromLocalStorage();
  }
}


private getDataForStudentFromToken() {
  this.studentID = this.decodedToken.StudentID;
  this.studentFirstName = this.decodedToken.FirstName ;
  this.studentLastName = this.decodedToken.LastName;
  this.className = this.decodedToken.ClassName;
}

private getDataForTeacherFromLocalStorage() {
  this.studentID = localStorage.getItem('studentID');
  this.studentFirstName = localStorage.getItem('studentFirstName');
  this.studentLastName = localStorage.getItem('studentLastName');
  this.className = localStorage.getItem('className');
}

private loadGradesWithSubjects() {
  this.gradeService.getGradesByStudentID(this.studentID).subscribe(grades => {
    this.studentGrades = grades;
    this.loadSubjectsAndCalculateTheirAverage();
});


}

private loadSubjectsAndCalculateTheirAverage() {
  this.subjectService.getSubjects().subscribe(subjects => {
    this.calculateGradesAverage(subjects);
    this.dataSource = subjects;
    this.hideSpinner();
  });
}

private calculateGradesAverage(subjects) {
  for (const subject of subjects) {
    subject.averageFirstHalf = this.gradesAverage(this.studentGrades, subject, '04/19/2018', '06/18/2019');
    subject.averageSecondHalf = this.gradesAverage(this.studentGrades, subject, '06/19/2019', '04/21/2021');
   }
}

private hideSpinner() {
  this.spinner = false;
}

coordinates(event: MouseEvent): void {
  this.clientX = event.pageX ;
  this.clientY = event.pageY ;
}

showGradeDescription(grade) {
  const nativeElement =  document.getElementById('desc');
  this.gradeDetails = grade;
  nativeElement.className = 'grade-description';
  nativeElement.style.left = this.clientX - 70 + 'px';
  nativeElement.style.top = this.clientY + + 15 + 'px';
}

hideGradeDesc() {
  const nativeElement =  document.getElementById('desc');
  nativeElement.className = 'hide-desc';
}


openAddGradeDialog(data) {
  if (this.userRole === UserRole.ADMIN || this.userRole === UserRole.TEACHER ) {
    this.dialog.open(AddGradeFormComponent, {
      data, position: {
        top: '10%'
        }
    });
  }
}

openEditGradeDialog(data) {


  // tslint:disable-next-line: triple-equals
  if (this.decodedToken.SubjectID == data.subjectID || this.userRole === UserRole.ADMIN ) {
    this.dialog.open(EditGradeFormComponent, {
    data, position: {
      top: '10%'
      }
  });
 }
}



logoutAndNaviateToLoginComponent() {
  if (this.userRole === UserRole.TEACHER || UserRole.ADMIN) {
    this.authTeacherService.logout();
    this.navigateToLoginComp();
  } else {
    this.authStudentService.logout();
    this.navigateToLoginComp();
  }
}

navigateToLoginComp() {
  this.router.navigate(['']);
}


private gradesAverage(grades, subject: ISubject, startDate: string, endDate: string) {
  const gradesList = [];
  grades.forEach(element => {
    gradesList.push(element);
  });

  const semesterStart = new Date(startDate);
  const semesterEnd = new Date(endDate);
  const arrayOfTransformedGrades: IGrade[] = [];
  let gradesWithRatesSum = 0;
  let ratesSum = 0;

  for (const grade of grades) {
    const gradeDate = new Date(grade.dateTime);
    if (grade.subject.name === subject.name && (gradeDate >= semesterStart && gradeDate <= semesterEnd)) {
      arrayOfTransformedGrades.push(this.transformGradeValue(grade));
      gradesWithRatesSum +=  this.addRateValueToTransformedGrade(this.transformGradeValue(grade));
    }
  }
  ratesSum = this.sumAllGradesRates(arrayOfTransformedGrades);
  return  this.calculateAverage(gradesWithRatesSum, ratesSum);
}

private calculateAverage(gradesWithRatesSum, ratesSum) {
  let average = gradesWithRatesSum / ratesSum;
  if (isNaN(average) === true) {
    average = 0;
    return;
  } else {
    return average;
  }
}

private sumAllGradesRates(arrayOfTransformedGrades) {
  let ratesSum = 0;
  for (const grade of arrayOfTransformedGrades) {
    ratesSum += grade.rate;
}
  return ratesSum;
}

private transformGradeValue(grade) {
  const tempGrade: any = {};
  switch (grade.value) {
    case null:
      break;
    case '1+':
      tempGrade.value = 1.5;
      tempGrade.rate = grade.rate;
      return tempGrade;
    case '2-':
      tempGrade.value = 1.75;
      tempGrade.rate = grade.rate;
      return tempGrade;
    case '2+':
      tempGrade.value = 2.5;
      tempGrade.rate = grade.rate;
      return tempGrade;
    case '3-':
      tempGrade.value = 2.75;
      tempGrade.rate = grade.rate;
      return tempGrade;
    case '3+':
      tempGrade.value = 3.5;
      tempGrade.rate = grade.rate;
      return tempGrade;
    case '4-':
      tempGrade.value = 3.75;
      tempGrade.rate = grade.rate;
      return tempGrade;
    case '4+':
      tempGrade.value = 4.5;
      tempGrade.rate = grade.rate;
      return tempGrade;
    case '5-':
      tempGrade.value = 4.75;
      tempGrade.rate = grade.rate;
      return tempGrade;
    case '5+':
      tempGrade.value = 5.5;
      tempGrade.rate = grade.rate;
      return tempGrade;
    case 'np':
      break;
    default:
      return grade;
  }
}

private addRateValueToTransformedGrade(grade) {
  let gradeValueTimesRate = 0;
  switch (grade.rate) {
    case 1:
      gradeValueTimesRate += grade.value * 1;
      return gradeValueTimesRate;
    case 2:
      gradeValueTimesRate += grade.value * 2;
      return gradeValueTimesRate;
    case 3:
      gradeValueTimesRate += grade.value * 3;
      return gradeValueTimesRate;
    }
}

get isSpinnerVisible(): boolean {
  return this.spinner;
}

getDataSource(): MatTableDataSource<ISubject> {
  return this.dataSource;
}

get displayedColumns(): string[] {
  return this.columns;
}

get userRole(): string {
  return this.decodedToken.UserRole;
}

get teacherSubjectID(): string {
  return this.decodedToken.SubjectID;
}

getGradeDetails() {
  return this.gradeDetails;
}

get name(): string {
  return this.studentFirstName;
}

getClassName(): string {
  return this.className;
}
get lastName(): string {
  return this.studentLastName;
}


get grades() {
  return this.studentGrades;
}
}
