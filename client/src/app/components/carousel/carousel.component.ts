import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductosService } from 'src/app/core/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

//   constructor(
//     public srvProductos: ProductosService,
//   ) { }

//   isData: boolean = false;
//   isLoading: boolean = true;
//   mapFiltersToRequest: any = {};
//    ngOnInit(): void {
//      //this.filterList();
//      setTimeout(() => {
//            this.isLoading = false;
//            Swal.close();
//          }, 15.0009);
//      this.getProducts();
//    }

// url_images: string[] = [];
//    productos!: any;

//     private destroy$ = new Subject<any>();
//     getProducts() {
//        this.srvProductos.getProductos({})
//        .pipe(takeUntil(this.destroy$))
//        .subscribe({
//          next: (data: any) => {

            
//              this.srvProductos.datosProductos = data.body;
//              this.productos = data.body[19].json_producto_imagenes.imagenes;
//              console.log(this.productos)
//              this.url_images = data.body[19].json_producto_imagenes.imagenes;

//              //this.url_images = this.srvProductos.datosProductos[19]
           
//          },
//          error: (err) => {
//            console.log("Error al obtener los productos", err);
//          },
//          complete: () => {
          
//          }
//        })
//      }
   

  
  //listFiltered = [''];



  private destroy$ = new Subject<any>();

  constructor(
    public srvProductos: ProductosService,
 
  ) { }
  isData: boolean = false;
  isLoading: boolean = true;
  mapFiltersToRequest: any = {};

  ngOnInit(): void {
    //this.filterList();
    setTimeout(() => {
      this.isLoading = false;
      Swal.close();
    }, 15.0009);
    this.getProducts();
  }
  
// Datos del producto
producto = {
  titulo: "Producto de Ejemplo",
  descripcion: "Este es un producto increíble con múltiples características.",
  precio: 29.99,
  imagenes: [
    "https://m.media-amazon.com/images/I/61RDnKQYBSL._AC_SL1200_.jpg",
    "https://m.media-amazon.com/images/I/61mt5a0eJrL._AC_SL1081_.jpg",
    "https://m.media-amazon.com/images/I/61mzqc3sS6L._AC_SL1220_.jpg",
    "https://m.media-amazon.com/images/I/61Vn02B7w+L._AC_SL1220_.jpg",
    "https://m.media-amazon.com/images/I/61DR2VH-TJL._AC_SL1102_.jpg",
    "https://m.media-amazon.com/images/I/51HbzXTdAQL._AC_SL1219_.jpg",
    "https://m.media-amazon.com/images/I/51EZgIuXFwL._AC_SL1219_.jpg"
  ]
};

// imagenes: string[] = [
//     "https://m.media-amazon.com/images/I/61RDnKQYBSL._AC_SL1200_.jpg",
//     "https://m.media-amazon.com/images/I/61mt5a0eJrL._AC_SL1081_.jpg",
//     "https://m.media-amazon.com/images/I/61mzqc3sS6L._AC_SL1220_.jpg",
//     "https://m.media-amazon.com/images/I/61Vn02B7w+L._AC_SL1220_.jpg",
//     "https://m.media-amazon.com/images/I/61DR2VH-TJL._AC_SL1102_.jpg",
//     "https://m.media-amazon.com/images/I/51HbzXTdAQL._AC_SL1219_.jpg",
//     "https://m.media-amazon.com/images/I/51EZgIuXFwL._AC_SL1219_.jpg"
//   ];



// Imagen seleccionada
imagenSeleccionada: string = this.producto.imagenes[0]; // Primera imagen por defecto
cantidadPorPagina: number = 3; // Número de imágenes visibles a la vez


// Índice de la primera imagen visible en la lista
indiceInicio: number = 0;
maxVisibles: number = 3; // Número de miniaturas visibles a la vez

// Método para cambiar la imagen central
seleccionarImagen(imagen: string) {
  this.imagenSeleccionada = imagen;
}

// Método para avanzar en la lista de miniaturas
avanzar() {
  if (this.indiceInicio + this.maxVisibles < this.producto.imagenes.length) {
    this.indiceInicio++;
  }
}

//Método para retroceder en la lista de miniaturas
retroceder() {
  if (this.indiceInicio > 0) {
    this.indiceInicio--;
  }
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


// Obtener las imágenes visibles en la lista
// getImagenesVisibles() : string[] {
  
//   const totalImages = this.imagenes.length;

//   if (totalImages <= this.cantidadPorPagina)
//     return this.imagenes;

//   if (this.indiceInicio + this.cantidadPorPagina >= totalImages)
//     return this.imagenes.slice(totalImages - this.cantidadPorPagina);

//   return this.imagenes.slice(this.indiceInicio, this.indiceInicio + this.cantidadPorPagina);
// }

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


  url_images: string[] = [];
  dataProduct!: any;
  getProducts() {
    this.mapFiltersToRequest = { route: 1 };
    this.srvProductos.getProductos(this.mapFiltersToRequest)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: any) => {
        if(data) {
          // this.isData = true;
          this.srvProductos.datosProductos = data.body;
          console.log(this.srvProductos.datosProductos)
          this.url_images = data.body[19].json_producto_imagenes.imagenes;
          this.dataProduct = data.body[19];
          
          console.log('this.url_images = data.body[19]',data.body[19])
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

  redirectToWhatsApp() {
    console.log('ingreso a redirect')
    const phoneNumber = "593968857043"; // Reemplaza con el número de teléfono
    const message = "Hola me gustaría más información"; // Reemplaza con el mensaje deseado
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

}
