import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../core/services/productos.service';
import { productosModel, dataProductos } from '../../core/models/productos';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { ProductosModule } from '../productos/productos.module';
import { DomSanitizer } from '@angular/platform-browser';

interface ImageItem {
  url: string;
  title: string;
  description?: string;
}
@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.component.html',
  styleUrls: ['./descripcion.component.css']
})
export class DescripcionComponent implements OnInit {




  images2$ = new BehaviorSubject<any[]>([]);
  imagenes$!: Observable<string[]>;
  private destroy$ = new Subject<any>();
  constructor(
    public srvProductos: ProductosService,
    public route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) { }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  nameProduct!: string | null;
  codigo_parametro!: string;
  nombre_parametro!: string;
  image!: string;
  name!: string;
  price!: number;
  description!: string;

  cod: string | null = null;
  codigoProducto: string | null = null;
  productosFiltrados: dataProductos[] = []; // Array para guardar los resultados
  dataProduct!: any;
  data: any;
  url_imagenes: string[] = [];
  url_images: string[] = [];
  
  private urlProducts = 'https://crud-angular-production-ed75.up.railway.app/productos';
  isLoading!: boolean;




  sanitizar(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  ngOnInit(): void {
    // const productName = this.route.snapshot.paramMap.get('product');
    // console.log('name', productName)

    this.isLoading = true;

    //Recuperar valor de un componente anterior
    this.route.paramMap.subscribe(params => {
      this.nameProduct = params.get('product');
      if (this.nameProduct)
        this.nombre_parametro = this.nameProduct
        //console.log('parámetro nombre recibido', this.nombre_parametro)
    })

    this.route.queryParams.subscribe(params => {
      this.codigo_parametro = params['code'];
      //console.log('parámetro de consulta recibido', this.codigo_parametro)
    });


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
  onImageError(event: any): void {
    event.target.src = 'assets/placeholder.png'; // Fallback image
  }

  datosf!: any;
  // Imagen seleccionada
  producto = {
    titulo: "Producto de Ejemplo",
    descripcion: "Este es un producto increíble con múltiples características.",
    precio: 29.99,
    imagenes: [
      "https://m.media-amazon.com/images/I/61RDnKQYBSL._AC_SL1200_.jpg",
    ]
  };

  //imagenSeleccionada: string = this.producto.imagenes[0]; // Primera imagen por defecto
  imagenSeleccionada!: string;
  cantidadPorPagina: number = 3; // Número de imágenes visibles a la vez


  // Índice de la primera imagen visible en la lista
  indiceInicio: number = 0;
  maxVisibles: number = 3; // Número de miniaturas visibles a la vez

  seleccionarImagen(imagen: string) {
    this.imagenSeleccionada = imagen;
  }
  
  moverArriba() {
    if (this.indiceInicio - this.cantidadPorPagina >= 0) {
      this.indiceInicio -= this.cantidadPorPagina;
    }
  }
  
  moverAbajo() {
    if (this.indiceInicio + this.cantidadPorPagina < this.url_images.length) {
      this.indiceInicio += this.cantidadPorPagina;
    }
  }

  obtenerImagenesVisibles(): string[] {
    const totalImagenes = this.url_images.length;
  
    if (totalImagenes <= this.cantidadPorPagina) {
      return this.url_images; // Si hay menos de 3 imágenes, mostramos todas.
    }
  
     // Si al avanzar quedan menos de 3 imágenes, mostramos las últimas 3
    if (this.indiceInicio + this.cantidadPorPagina >= totalImagenes) {
      // Mostrar las últimas `cantidadPorPagina` imágenes sin perder la continuidad
      return this.url_images.slice(totalImagenes - this.cantidadPorPagina);
    }
  
    return this.url_images.slice(this.indiceInicio, this.indiceInicio + this.cantidadPorPagina);
  }

  
  getProductoCodigo() {
    this.srvProductos.getProductoCodigo(this.codigo_parametro)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          //console.log('data =>', data);
          this.srvProductos = data.body;
          this.datosf = data.body;

          // this.image = data.body.str_producto_image;
          // this.name = data.body.str_producto_nombre;
          // this.price = data.body.int_producto_precio;
          // this.description = data.body.str_producto_descripcion;

          
          this.url_images = this.datosf.json_producto_imagenes.imagenes;
          this.imagenSeleccionada = this.url_images[0];
          //this.srvProductos.datosProductos = data.body;
          this.dataProduct = this.datosf;
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



