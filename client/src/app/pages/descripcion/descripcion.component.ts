import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../core/services/productos.service';
import { productosModel, dataProductos } from '../../core/models/productos';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.component.html',
  styleUrls: ['./descripcion.component.css']
})
export class DescripcionComponent implements OnInit {

  private destroy$ = new Subject<any>();
  constructor(
    public srvProductos: ProductosService,
    public route: ActivatedRoute
  ) { }

  codigo!: string | null;
  codigo_parametro!: string;
  image!: string;
  ngOnInit(): void {

    
     //Recuperar valor de un componente anterior
     this.route.paramMap.subscribe(params => {
      this.codigo = params.get('cod');
      if(this.codigo)
        this.codigo_parametro = this.codigo
      //this.codigoProducto = this.cod;
      console.log('parámetro recibido', this.codigo)
      
      //alert(this.id)
    })
    this.getProductoCodigo();
  }

  
  getProductoCodigo() {
    console.log(this.codigo);
    this.srvProductos.getProductoCodigo(this.codigo_parametro)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data:  any) => {
        console.log('data =>', data);
        this.srvProductos.datosProductos = data.body;
        this.image = data.body.str_producto_image;
      },
      error: (err) => {
        console.log('Error =>', err);
      },
      complete: () => {
        Swal.close();
      }

    });

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}
