import { ISubject } from './ISubject';

export interface IGrade {
  value: string;
  description: string ;
  rate: number ;
  studentID: string;
  subjectID: number ;
  dateTime: Date;
  subject: ISubject;
}
