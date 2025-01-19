import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
//import { AjustesModule } from '../pages/configuracion/ajustes/ajustes.module';
import { ComponentsModule } from '../components/components.module';
import { RouterModule } from '@angular/router';
import { ProductosComponent } from '../pages/productos/productos.component';
@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        MainComponent,
        ProductosComponent

    ],
    exports: [

        FooterComponent,
        HeaderComponent,
        MainComponent,


    ],
    imports: [
        CommonModule,
        //AjustesModule,
        ComponentsModule,
        
        // CentrosModule,
        // WelcomeModule,
        RouterModule.forChild([])
    ]
})
export class SharedModule { }
