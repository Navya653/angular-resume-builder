import { Component, inject } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormArray } from '@angular/forms';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray
} from '@angular/cdk/drag-drop';
import { ResumeStateService } from '../services/resume-state.service';

type SectionKey =
  | 'personal'
  | 'experience'
  | 'education'
  | 'skills'
  | 'certifications'
  | 'projects'
  | 'hobbies';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DragDropModule, UpperCasePipe],
  templateUrl: './editor.html'
})
export class EditorComponent {

  private fb = inject(FormBuilder);
  private state = inject(ResumeStateService);

  /* ✅ this drives drag order */
  sections: SectionKey[] = [
    'personal',
    'experience',
    'education',
    'skills',
    'certifications',
    'projects',
    'hobbies'
  ];

  expanded: Record<SectionKey, boolean> = {
    personal: true,
    experience: true,
    education: true,
    skills: true,
    certifications: true,
    projects: true,
    hobbies: true
  };

  form = this.fb.group({
    personal: this.fb.group({
      name: [''],
      title: [''],
      email: [''],
      phone: [''],
      github: [''],
      linkedin: [''],
      website: ['']
    }),
    experience: this.fb.array([]),
    education: this.fb.array([]),
    skills: this.fb.array([]),
    certifications: this.fb.array([]),
    projects: this.fb.array([]),
    hobbies: this.fb.array([])
  });

  constructor() {
    this.form.valueChanges.subscribe(v => {
      this.state.update({
        ...(v as any),
        sectionOrder: this.sections
      });
    });
  }

  /* ✅ drag handler — REQUIRED */
  dropSections(e: CdkDragDrop<SectionKey[]>) {
    moveItemInArray(this.sections, e.previousIndex, e.currentIndex);
  }

  toggle(k: SectionKey) {
    this.expanded[k] = !this.expanded[k];
  }

  /* ===== getters ===== */

  get experience(){ return this.form.get('experience') as FormArray; }
  get education(){ return this.form.get('education') as FormArray; }
  get skills(){ return this.form.get('skills') as FormArray; }
  get certifications(){ return this.form.get('certifications') as FormArray; }
  get projects(){ return this.form.get('projects') as FormArray; }
  get hobbies(){ return this.form.get('hobbies') as FormArray; }

  /* ===== add ===== */

  addExperience(){ this.experience.push(this.fb.group({role:[''],company:[''],years:['']})); }
  addEducation(){ this.education.push(this.fb.group({degree:[''],school:[''],year:['']})); }
  addCertification(){ this.certifications.push(this.fb.group({name:[''],org:[''],year:['']})); }
  addProject(){ this.projects.push(this.fb.group({name:[''],tech:[''],desc:['']})); }
  addSkill(){ this.skills.push(this.fb.group({name:[''],level:[3]})); }
  addHobby(){ this.hobbies.push(this.fb.control('')); }

  remove(arr: FormArray, i:number){
    arr.removeAt(i);
  }
}
