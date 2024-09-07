import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ButtonComponent } from './button/button.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { ModificarProductoComponent } from './modificar-producto/modificar-producto.component';
import { DesplegableComponent } from './desplegable/desplegable.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    ButtonComponent,
    DesplegableComponent,
    SearchComponent
  ],
  exports: [
    ButtonComponent,
    DesplegableComponent,
    SearchComponent

  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
