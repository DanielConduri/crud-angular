import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router, RoutesRecognized } from '@angular/router';
import { ProductosService } from './core/services/productos.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { ModalService } from './core/services/modal.service';
import { productosModel, dataProductos } from './core/models/productos';

@Component({
  providers: [DatePipe],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  title: string = 'cliente';
  elementForm: {
    form: string,
    title: string,
    special: boolean
  } = {
    form: '',
    title: '',
    special: false
  }

  isData: boolean = false;
  isLoading: boolean = true;


  private destroy$ = new Subject<any>();

  constructor(
    public srvProductos: ProductosService,
    public srvModal : ModalService

  ) {}

  ngOnInit(): void {
    console.log('ngOnInit');
    setTimeout(() => {
      this.isLoading = false;
      Swal.close();
    }, 1500);
    this.getProductos();
  }

  //Funcion para obtener los productos
  getProductos() {
    console.log('getProductos en app.component.ts');
    Swal.fire({
      title: 'Cargando Productos...xd',
      didOpen: () => {
        Swal.showLoading()
      }
    });
    this.srvProductos.getProductos()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: productosModel) => {
        //console.log('data.body', data.body);
        if(data.body){
          this.isData = true;
          console.log('Obteniendo productos de la base de datos', data);
          this.srvProductos.datosProductos = data.body;
        }
        
      /*next: (dataProductos: any) => {
        console.log('data.body', dataProductos);
        if(dataProductos.data){
          this.isData = true;
          console.log('Obteniendo productos de la base de datos', dataProductos);
          this.srvProductos.datosProductos = dataProductos.data;
        }*/

        
      },
      error: (err) => {
        console.log("Error al obtener los productos", err);
      },
      complete: () => {
        Swal.close();
      }
    });
  }

  updateProduct(id_producto: number){
    console.log('updateProductos en app.component.ts');
    alert('Está seguro de actualizar el producto?'+id_producto);
  }

  

  deleteProduct(id_producto: number){
    console.log('deleteProductos en app.component.ts');
  
    Swal.fire({
      title: '¿Está seguro de eliminar el producto?',
      showDenyButton: true,
      text: 'Al deshabilitar el producto, no podrá facturarse',
      confirmButtonText: 'Sí, modificar',
      denyButtonText: 'No, cancelar',
    }).then((result) =>{
      if(result.isConfirmed){
        Swal.fire({
          title: 'Eliminando Producto...',
          didOpen: () => {
            Swal.showLoading();
          }
        });
        this.srvProductos
        .deleteProducto(id_producto)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            if(res.status){
              Swal.fire({
                title: 'Producto eliminado correctamente',
                icon: 'success',
                showConfirmButton: false,
                timer: 3000,
              });
            } else {
              Swal.fire({
                title: 'Error al eliminar el producto',
                icon: 'error',
                showConfirmButton: false,
                timer: 3000,
              });
            }
            this.getProductos();
            setTimeout(() => {
              Swal.close();
            }, 1500);
          },
          error: (error) => {
            console.log('Error', error);
          },
          complete: () => {},
        })
        
      }
    });
  }

    ngOnDestroy(): void {
      this.destroy$.next({});
      this.destroy$.complete();
    }

}
