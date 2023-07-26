import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { Subject, take, takeUntil } from 'rxjs';
import { ModalService } from '../../core/services/modal.service';
import { ProductosService } from '../../core/services/productos.service';
import { productosModel, dataProductos } from '../../core/models/productos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styleUrls: ['./modificar-producto.component.css']
})
export class ModificarProductoComponent implements OnInit {

  private destroy$ = new Subject<any>();
  myForm!: FormGroup;
  idProducto!: number;
  component!: AppComponent;

    isData: boolean = false;

  constructor(
    private srvModal: ModalService,
    private srvProductos: ProductosService,
    private fb_Producto: FormBuilder
  ) { 
    this.myForm = this.fb_Producto.group({
      str_producto_codigo: [
        '', [Validators.required]
      ],
      str_producto_nombre: [
        '', [Validators.required]
      ],
      int_producto_cantidad:[
        '', [Validators.required]
      ],
      str_producto_marca: [
        '', [Validators.required]
      ],
      int_producto_precio:[
        '', [Validators.required]
      ],
      str_producto_proveedor: [
        '', [Validators.required]
      ],
      
    });
  }

  ngOnInit(): void {
    this.completeForm();
  }

  completeForm() {
    console.log("Recibiendo el Valor del ID ESTADO =>", this.srvModal.SelectID_Producto$);
    this.srvModal.SelectID_Producto$
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (getId: number) => {
        Swal.fire({
          title: 'Cargando Producto...',
          didOpen: () => {
            Swal.showLoading()
          }
        });
        this.idProducto = getId;
        this.getProductoId();
      },
      error: (err) => {
        console.log('Error =>', err);
      },
      complete: () => {
        Swal.close();
      }
    })
  }

  getProductoId() {
    console.log(this.idProducto);
    this.srvProductos.getProductoId(this.idProducto)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (dataProducto:  any) => {
        console.log('dataProducto =>', dataProducto);
        Swal.fire({
          title: 'Cargando Producto...',
          didOpen: () => {
            Swal.showLoading()
          }
        });
        this.myForm = this.fb_Producto.group({
          str_producto_codigo: [
            dataProducto.body.str_producto_codigo, [Validators.required]
          ],
          str_producto_nombre: [
            dataProducto.body.str_producto_nombre, [Validators.required]
          ],
          int_producto_cantidad: [
            dataProducto.body.int_producto_cantidad, [Validators.required]
          ],
          str_producto_marca: [
            dataProducto.body.str_producto_marca, [Validators.required]
          ],
          int_producto_precio:[
            dataProducto.body.int_producto_precio, [Validators.required]
          ],
          str_producto_proveedor: [
            dataProducto.body.str_producto_proveedor, [Validators.required]
          ]
        });
        
        console.log('myForm =>', this.myForm.value);
      },
      error: (err) => {
        console.log('Error =>', err);
      },
      complete: () => {
        Swal.close();
      }

    });

  }

  modifyProduct() { 

    const modifyDataProducto = this.myForm.value;
    Swal.fire({
      title: '¿Está seguro de modificar el producto?',
      showDenyButton: true,
      confirmButtonText: 'Agregar',
      denyButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed) {
        Swal.fire({
          title: 'Cargando...',
          didOpen: () => {
            Swal.showLoading()
          }
        });
        this.srvProductos.putProductoById(this.idProducto, modifyDataProducto)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (dataProducto) => {
            if(dataProducto.status){
              Swal.close();
              Swal.fire({
                title: 'Producto modificado correctamente!',
                icon: 'success',
                showConfirmButton: false,
                timer: 2500
              });
              this.myForm.reset();
              this.srvModal.closeModal();
            }

            setTimeout(() => {
              this.myForm.reset();
              this.showProductos();
            })
          }, // fin next
          error: (err) => {
            console.log('Error =>', err);
          },
          complete: () => {
            
          }
        })

      }// fin de if
    })

    


  }

  showProductos(){
    Swal.fire({
      title: 'Cargando Productos...',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.srvProductos.getProductos()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: productosModel) => {
        if(data.body) {
          this.isData = true;
          console.log('Obteniedo productos de la base de datos', data);
          this.srvProductos.datosProductos = data.body;
        }
      },
      error: (err) => {
        console.log("Error al obtener los productos", err);
      },
      complete: () => {
        Swal.close();
      }

    })
  }

  ngOnDestroy(): void { //Sino se destruye re realiza varias peticiones
    this.destroy$.next({});
    this.destroy$.complete();
  };

}
