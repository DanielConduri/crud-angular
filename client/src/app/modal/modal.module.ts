import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ComponentsModule } from '../components/components.module';
import { AgregarInformacionComponent } from '../components/agregar-informacion/agregar-informacion.component';


@NgModule({
  declarations: [
    //ModalComponent

  ],
  imports: [
    CommonModule,
    ComponentsModule,
  
  ],
  exports: [
    //ModalComponent,
    CommonModule
  ]
})
export class ModalModule { }
