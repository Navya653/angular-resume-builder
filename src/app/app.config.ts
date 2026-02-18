import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      ReactiveFormsModule,
      DragDropModule
    )
  ]
};
