import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullLayoutRoutingModule } from './full-layout-routing.module';
import { MainComponent } from 'src/app/shared/main/main.component';

@NgModule({
  declarations: [MainComponent],
  imports: [
    MainComponent,
    CommonModule,
    FullLayoutRoutingModule
  ]
})
export class FullLayoutModule { }
