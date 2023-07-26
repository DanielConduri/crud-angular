import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { ModalComponent } from './modal/modal.component';
import { AgregarProductoComponent } from './components/agregar-producto/agregar-producto.component';
//'./src/app/component/button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModificarProductoComponent } from './components/modificar-producto/modificar-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    ModalComponent,
    AgregarProductoComponent,
    ModificarProductoComponent 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule, //Es importante agregar los componentes para evitar errores
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
