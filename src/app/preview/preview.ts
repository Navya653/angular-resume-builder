import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe, NgClass } from '@angular/common';
import html2pdf from 'html2pdf.js';
import { ResumeStateService } from '../services/resume-state.service';

type TemplateType = 'modern' | 'classic' | 'compact';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule, AsyncPipe, NgClass],
  templateUrl: './preview.html',
  styleUrl: './preview.css'
})
export class PreviewComponent {

  private state = inject(ResumeStateService);
  resume$ = this.state.resume$;

  template: TemplateType = 'modern';

  setTemplate(t: TemplateType) {
    this.template = t;
  }

  download() {
  const el = document.getElementById('resume');
  if (!el) return;

  const opt = {
    margin: [12, 12, 12, 12] as [number, number, number, number],
    filename: 'resume.pdf',
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: {
      unit: 'mm' as const,
      format: 'a4' as const,
      orientation: 'portrait' as const
    },
    pagebreak: { mode: ['css', 'legacy'] as const }
  };

  html2pdf().set(opt).from(el).save();
}


}
