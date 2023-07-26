import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { Subject, takeUntil } from 'rxjs';
import { ModalService } from '../../core/services/modal.service';
import { ProductosService } from '../../core/services/productos.service';
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

  modifyEstado() {
    const modifyData = this.myForm.value;
  }

}
