import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from './layout/layout.module';
import { HomeModule } from './pages/home/home.module';
import { FailedModule } from './pages/failed/failed.module';
import { DeniedModule } from './pages/denied/denied.module';
import { LogoutModule } from './pages/logout/logout.module';
import { CasErrModule } from './pages/cas-err/cas-err.module';
import { Layouts } from './layout/layout';
import config from 'config/config';
import { PermisoGuard } from './core/guards/permiso.guard';
import { HomeComponent } from './pages/home/home.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { AdminModule } from './pages/admin/admin.module';

import { ProductosModule } from './pages/productos/productos.module';
import { WelcomeModule } from './pages/admin/welcome/welcome.module';import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
const routes: Routes = [
  { path: '', redirectTo: '/productos', pathMatch: 'full'},
  { path: 'productos2', component: ListaProductosComponent},
  
  {
    path: config.URL_BASE_PATH,
    data: {layout: Layouts.simple},
    children: [
      // {path: 'welcome', loadChildren: () => WelcomeModule},
      {path: '', loadChildren:() => HomeModule},
      {path: 'productos', loadChildren: () => ProductosModule},
      {path: '404', loadChildren:() => FailedModule},
      {path: 'denegado', loadChildren:() => DeniedModule},
      {path: 'logout', loadChildren:() => LogoutModule},
      {path: 'casError', loadChildren:() => CasErrModule}
    ],
  },
  {
    path: config.URL_BASE_PATH,
    data: {layout: Layouts.full},
    //canActivate: [PermisoGuard, /*PermissionsGuard*/],
    children: [
      {path: '', loadChildren:() => AdminModule},
      {path: 'welcome', loadChildren: () => WelcomeModule},
      {path: 'productos', loadChildren: () => ProductosModule},
      // {path: 'ajustes', loadChildren:() => ConfiguracionModule},
      // {path: 'bienes', loadChildren:() => BienesModule}
    ],
  },

  { path: '**', redirectTo:'/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
