import { Component } from '@angular/core';
import { EditorComponent } from './editor/editor';
import { PreviewComponent } from './preview/preview';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EditorComponent, PreviewComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {}
