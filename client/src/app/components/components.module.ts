import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ButtonComponent } from './button/button.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { ModificarProductoComponent } from './modificar-producto/modificar-producto.component';
import { DesplegableComponent } from './desplegable/desplegable.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { AgregarInformacionComponent } from './agregar-informacion/agregar-informacion.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ButtonComponent,
    DesplegableComponent,
    SearchComponent,
    MenuComponent,

  ],
  exports: [
    ButtonComponent,
    DesplegableComponent,
    SearchComponent,
    MenuComponent,


  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class ComponentsModule { }
