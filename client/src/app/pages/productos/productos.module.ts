import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductosRoutingModule } from './productos-routing.module';
import { ButtonComponent } from 'src/app/components/button/button.component';
import {  ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    ComponentsModule
    
  ]
})
export class ProductosModule { }
