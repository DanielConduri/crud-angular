import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ProductosShowModel } from '../../core/models/productos';
import { ProductosService } from '../../core/services/productos.service';
import { ModalService } from '../../core/services/modal.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {

  myForm!: FormGroup;
  private destroy$ = new Subject<any>();

  constructor(
    public fb_estado: FormBuilder,
    public srvProductos: ProductosService,
    public srvModal: ModalService
  ) { 
    this.myForm = this.fb_estado.group({
      str_producto_codigo: [
        null,
        [Validators.required]
      ],
      str_producto_nombre: [
        null,
        [Validators.required, Validators.pattern(/^[a-zA-Z]/)]
      ],

      str_producto_image: [
        null,
        [Validators.required, Validators.pattern(/^[a-zA-Z]/)]
      ],
      int_producto_cantidad:[
        null,
        [Validators.required, Validators.pattern(/^[0-9]/)]
      ],
      str_producto_marca:[
        null,
        [Validators.required, Validators.pattern(/^[a-zA-Z]/)]
      ],
      int_producto_precio: [
        null,
        [Validators.required, Validators.pattern(/^[0-9]/)]
      ],
      str_producto_proveedor: [
        null,
        [Validators.required, Validators.pattern(/^[a-zA-Z]/)]
      ],

      str_producto_descripcion: [
        null,
        [Validators.required, Validators.pattern(/^[a-zA-Z]/)]
      ]
      
    })
  }

  ngOnInit(): void {
    
   
  }

  agregarProducto(){
    const sendEstadoData = this.myForm.value;

    Swal.fire({
      title: 'Esta seguro de añadir este producto?',
      showDenyButton: true,
      confirmButtonText: 'Agregar',
      denyButtonText: 'Cancelar',
    }).then((result)=>{
      if(result.isConfirmed){
        this.srvProductos.postProductos(sendEstadoData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (dataProducto) => {
            console.log('REcibiendo data del AgregarProducto =>', dataProducto)
            if(dataProducto.status){
              Swal.fire({
                title: 'Producto agregado correctamente',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
              });
              console.log('Data Agregada del AgregarProducto =>', dataProducto)
            } else {
              Swal.fire({
                title: 'Error al agregar el producto!',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
              });
            }
            setTimeout(() => {
              this.showProductos();
              Swal.close();
            }, 3000);
          }, //fin del next
          error: (err) => {
            console.log('Error al agregar el producto =>', err);
          },
          complete: () => {
            this.showProductos();
            this.myForm.reset();
            this.srvModal.closeModal();
          }
        });// fin del suscribe
      }
    });
  }// fin agregar producto´

  showProductos(){
    this.srvProductos.getProductos({})
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (resProducto: ProductosShowModel) => {
        this.srvProductos.datosProductos = resProducto.body;
      },
      error: (err) => {
        console.log('Error al obtener los productos =>', err);
      },
      complete: () => {
        this.myForm.reset();
      }
    });
  }//fin showProductos

  clearForm(){
    this.myForm.reset();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
