import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DescripcionRoutingModule } from './descripcion-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { PaginationModule } from 'src/app/shared/pagination/pagination.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DescripcionRoutingModule,
    ComponentsModule,
    PaginationModule
  ]
})
export class DescripcionModule { }
