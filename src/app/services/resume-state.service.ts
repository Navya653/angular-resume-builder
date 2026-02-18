import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Skill {
  name: string;
  level: number;
}

export interface ResumeData {
  personal: any;
  experience: any[];
  education: any[];
  skills: Skill[];
  certifications: any[];
  projects: any[];
  hobbies: string[];
  sectionOrder: string[];
}

@Injectable({ providedIn: 'root' })
export class ResumeStateService {

  private subject = new BehaviorSubject<ResumeData>({
    personal: {},
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    projects: [],
    hobbies: [],
    sectionOrder: []
  });

  resume$ = this.subject.asObservable();

  update(v: ResumeData) {
    this.subject.next(v);
  }
}
