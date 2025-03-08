import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { dataProductos, productosModel } from 'src/app/core/models/productos';
import { ProductosService } from 'src/app/core/services/productos.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  title = 'Comidas Geniales';
  searchTerm$ = new Subject<string>();

  private listDeliciousDishes = [
    'Ceviche',
    'Arepa',
    'Empanadas',
    'Asado',
    'Pizzas',
    'Hamburguesas',
    'Pollo a la Brasa',
    'Pasta 4 Quesos',
    'Lomo Saltado',
    'Pastel',
    'Arroz Chaufa',
  ];
  
  //listFiltered = [''];
  listFiltered!: dataProductos[];


  private destroy$ = new Subject<any>();

  constructor(
    public srvProductos: ProductosService,
    private router: Router
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
  
  
  
  onClickItem(productName: string, productCode: string) {
    const slug = this.slugify(productName);
    //console.log('slug', slug)

    //productName = slug;

    //[routerLink] = "['/tipo-contratacion', producto.str_producto_codigo]"
    this.router.navigate(['/descripcion', slug], { queryParams: { code: productCode}})
    
    //alert(codigo)
  }

  slugify(text: string): string {
    return text
      .toLowerCase() // convertir a minúsculas
      .replace(/ /g, '-') // reemplazar espacios por guiones
      .replace(/[^\w-]+/g, ''); // eliminar caracteres no válidos
  }

  
  onSearch(e: any) {
    //const target = event.target as HTMLInputElement;
    length = e.target.value.length;
    if (length > 2) {
      const value = e.target.value;
      console.log('Valor del input:', value);

      
      this.srvProductos
      .getFindProductos(value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: productosModel) => {
          if (data.body) {
            //console.log(data.body)
            this.listFiltered = data.body;
            console.log('listFiltered', this.listFiltered)
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


     
    // setTimeout(() => {
    //   if (target) {
    //     const value = target.value;
    //     console.log('Valor del input:', value);
    //    }
    // }, 1000); // 3000 milisegundos = 3 segundos
    

    // this.srvProductos.getFindProductos(target.value).pipe(
    //   debounceTime(300), // Para evitar llamadas excesivas mientras se escribe
    //   switchMap(() => this.srvProductos.getFindProductos(target.value)))
    //   .subscribe({
    //     next: (data: productosModel) => {
    //       if (data.body) {
    //         console.log(data.body)
    //         this.srvProductos.datosProductos = data.body;
    //       }
    //     },
    //     error: (err) => {
    //       console.log("Error al obtener los productos", err);
    //     },
    //     complete: () => {
    //       Swal.close();
    //     }
    //   })
      


      
    }
 

  // filterList(): void {
  //   this.searchTerm$.subscribe(term => {
  //     this.listFiltered = this.listDeliciousDishes
  //       .filter(item => item.toLowerCase().indexOf(term.toLowerCase()) >= 0);
  //   });
  // }

  getProducts() {
    this.mapFiltersToRequest = { route: 1 };
    this.srvProductos.getProductos(this.mapFiltersToRequest)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: productosModel) => {
        if(data.body) {
          this.isData = true;
          this.srvProductos.datosProductos = data.body;
          //console.log(data)
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
