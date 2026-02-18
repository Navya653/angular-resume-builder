import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ResumeStateService {

  private subject = new BehaviorSubject<any>(
    JSON.parse(localStorage.getItem('resume') || '{}')
  );

  resume$ = this.subject.asObservable();

  update(v:any){
    localStorage.setItem('resume', JSON.stringify(v));
    this.subject.next(v);
  }
}
