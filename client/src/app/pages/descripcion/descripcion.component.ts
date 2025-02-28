import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../core/services/productos.service';
import { productosModel, dataProductos } from '../../core/models/productos';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { ProductosModule } from '../productos/productos.module';

@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.component.html',
  styleUrls: ['./descripcion.component.css']
})
export class DescripcionComponent implements OnInit {

  private destroy$ = new Subject<any>();
  constructor(
    public srvProductos: ProductosService,
    public route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  codigo!: string | null;
  codigo_parametro!: string;
  image!: string;
  name!: string;
  price!: number;
  description!: string;

  cod: string | null = null;
  codigoProducto: string | null = null;
  productosFiltrados: dataProductos[] = []; // Array para guardar los resultados
  data: any;
  private urlProducts = 'https://crud-angular-production-ed75.up.railway.app/productos';

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
    // this.http.get<productosModel>(this.urlProducts).subscribe(
    //   (response) => {
    //     this.data = response.body;
    //     console.log(this.data)

    //     this.productosFiltrados = this.data.filter((producto: dataProductos) =>
    //       producto.str_producto_codigo === this.codigo
    //     );
    
    //     console.log('Productos filtrados:', this.productosFiltrados);
    //     //this.image = this.productosFiltrados[0].str_producto_image;
    //   },
    //   error => {
    //     console.log(error)
    //   }
    // )
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
        this.name = data.body.str_producto_nombre;
        this.price = data.body.int_producto_precio;
        this.description = data.body.str_producto_descripcion;
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



