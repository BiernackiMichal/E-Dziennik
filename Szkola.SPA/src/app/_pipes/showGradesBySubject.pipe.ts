import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showGradesBySubject'
})
export class ShowGradesBySubjectPipe implements PipeTransform {

  transform(data: any, subject: string, startDate: any, endDate: any): any {
    const semesterStart = new Date(startDate);
    const semesterEnd = new Date(endDate);
    const gradeDate = new Date(data.dateTime);
    if (data.subject.name === subject && (gradeDate >= semesterStart && gradeDate <= semesterEnd)) {
     return data.value;

    }
  }

}
