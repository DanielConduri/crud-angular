import { Component, OnInit } from '@angular/core';
import { debounceTime, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
import { ProductosService } from 'src/app/core/services/productos.service';
import Swal from 'sweetalert2';
import { dataProductos, productosModel } from 'src/app/core/models/productos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  

  private destroy$ = new Subject<any>();
  
  searchTerm: string = '';
  listFiltered!: dataProductos[];
  getDataRecovery!: dataProductos[];
  isSearching = false;
  hasResults = false; // Indica si hay datos encontrados


  constructor( 
    public srvProductos: ProductosService,
    public srvModal : ModalService,
     private router: Router
  ) { }


  clearData () {
    this.isSearching = false
    if(!this.isSearching)  this.listFiltered = [];
  }

  dataRecovery() {
    this.listFiltered = this.getDataRecovery;
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
            console.log(data.body)
            this.listFiltered = data.body;
            console.log('listFiltered', this.listFiltered)
            this.getDataRecovery = this.listFiltered

            if ( this.listFiltered.length > 0) {
              this.hasResults = true;
            } else {
              this.hasResults = false;
            }
            
            //this.hasResults = this.listFiltered.length > 0 ? this.hasResults = true : this.hasResults = false;
            //this.srvProductos.datosProductos = data.body;
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

    onClickItem(productName: string, productCode: string) {
      const slug = this.slugify(productName);
      this.router.navigate(['/descripcion', slug], { queryParams: { code: productCode}})
    }

    slugify(text: string): string {
      return text
        .toLowerCase() // convertir a minúsculas
        .replace(/ /g, '-') // reemplazar espacios por guiones
        .replace(/[^\w-]+/g, ''); // eliminar caracteres no válidos
    }

      
  

  getFindProducts(e: any) {
    
    let data = document.getElementById('search-input') as any;
    console.log(data.value);
    Swal.fire({
      title: 'Buscando',
      didOpen: () => {
        Swal.showLoading()
      }
    });
    this.srvProductos
    .getFindProductos(data.value)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: productosModel) => {
        if (data.body) {
          console.log(data.body)
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

  ngOnInit(): void {
  }

}
