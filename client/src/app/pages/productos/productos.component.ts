import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { productosModel } from 'src/app/core/models/productos';
import { ProductosService } from 'src/app/core/services/productos.service';
import { Subject, takeUntil } from 'rxjs';



@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  private destroy$ = new Subject<any>();

  constructor(
    public srvProductos: ProductosService,
  ) { }
  isData: boolean = false;
  isLoading: boolean = true;
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
      Swal.close();
    }, 15.0009);
    this.getProducts();
  }

  getProducts() {
    this.srvProductos.getProductos()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: productosModel) => {
        if(data.body) {
          this.isData = true;
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

  redirectToWhatsApp() {
    console.log('ingreso a redirect')
    const phoneNumber = "593968857043"; // Reemplaza con el número de teléfono
    const message = "Hola me gustaría más información"; // Reemplaza con el mensaje deseado
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

}
