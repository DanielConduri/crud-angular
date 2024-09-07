import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { ModalModule } from 'src/app/modal/modal.module';
//import { BienesModule } from './bienes/bienes.module';
import { PermissionsGuard } from 'src/app/core/guards/permissions.guard';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'welcome',
       
        loadChildren: () =>
          import('./welcome/welcome.module').then((m) => m.WelcomeModule),
      },
    
      {
        // path: 'bienes-custodio',
        // canActivate: [PermissionsGuard],
        // loadChildren: () =>
        //   import('./bien-custodio/bien-custodio.module').then(
        //   (m) => m.BienCustodioModule
        // ),
      },
      {
        
      },
      {
        
      }
    ],
  },
];

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminModule { }
