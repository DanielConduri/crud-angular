import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { LayoutModule } from './layout/layout.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { ModalComponent } from './modal/modal.component';
import { AgregarProductoComponent } from './components/agregar-producto/agregar-producto.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
//'./src/app/component/button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModificarProductoComponent } from './components/modificar-producto/modificar-producto.component';
import { ModalService } from './core/services/modal.service';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './pages/home/home.module';
import { ProductosComponent } from './pages/productos/productos.component';
@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    AgregarProductoComponent,
    ModificarProductoComponent,
    ListaProductosComponent,
    ProductosComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    ReactiveFormsModule, //Es importante agregar los componentes para evitar errores
    FormsModule,
    HomeModule
    
  ],
  providers: [
    ModalService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
