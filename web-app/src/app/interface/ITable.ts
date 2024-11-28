export interface IDepartment {
  id: number;
  name: string;
  majors: IMajor[];
}

export interface IMajor {
  id: number;
  name: string;
  description: string;
  departmentId: number;
  department: IDepartment;
  isSet: boolean;
}

export interface IClass {
  id: number;
  name: string;
  departmentId: number;
  department: IDepartment;
  courseId: number;
  course: ICourse;
}

export interface ICourse {
  id: number;
  name: string;
  startYear: number;
  endYear: number;
}

export interface ISubject {
  id: number;
  name: string;
  code: string;
  creditHours: number;
  departmentId: number;
  department: IDepartment;
}

export interface IGrade {
  appUserId: number;
  appUser: IAccount;
  sectionId: number;
  section: ISection;
  score: Float64Array;
  isDone: boolean;
}

export interface ISemester {
  id: number;
  name: string;
  academicYear: string;
}

export interface ISchedule {
  id: number;
  dayOfWeek: number;
  timeStart: string;
  timeEnd: string;
  sectionId: number;
  sections: ISection;
}

export interface ISection {
  id: number;
  semesterId: number;
  semesters: ISemester;
  subjectId: number;
  subjects: ISubject;
  character: string;
  startDate: Date;
  endDate: Date;
  schedules: ISchedule[];
}

export interface IAccount {
  id: number;
  userName: string;
  email: string;
  name: string;
  birthDate: string;
  male: boolean;
  urlImage: string;
  classId: number;
  departmentId: number;
  majorId: number;
  class: IClass;
  department: IDepartment;
  major: IMajor;
  isInternal: boolean;
  roleName: string;
  phoneNumber: string;
}

export interface IRole {
  id: string;
  name: string;
}
