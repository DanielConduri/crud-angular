import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaProductosComponent } from './lista-productos.component';
import { PaginationModule } from 'src/app/shared/pagination/pagination.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components.module';



@NgModule({
  declarations: [ListaProductosComponent],
  imports: [
    CommonModule,
    PaginationModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  exports: [
    ListaProductosComponent
  ]
})
export class ListaProductosModule { }
