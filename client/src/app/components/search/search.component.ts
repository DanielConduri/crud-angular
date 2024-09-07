import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
import { ProductosService } from 'src/app/core/services/productos.service';
import Swal from 'sweetalert2';
import { productosModel } from 'src/app/core/models/productos';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  

  private destroy$ = new Subject<any>();

  constructor( 
    public srvProductos: ProductosService,
    public srvModal : ModalService,
  ) { }
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
