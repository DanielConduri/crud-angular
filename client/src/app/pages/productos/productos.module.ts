import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductosRoutingModule } from './productos-routing.module';
import { ButtonComponent } from 'src/app/components/button/button.component';
import {  ComponentsModule } from 'src/app/components/components.module';
import { PaginationModule } from 'src/app/shared/pagination/pagination.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    ComponentsModule,
    PaginationModule
    
  ], 
  exports: []
})
export class ProductosModule { }
