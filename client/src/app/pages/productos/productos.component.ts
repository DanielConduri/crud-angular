import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  redirectToWhatsApp() {
    console.log('ingreso a redirect')
    const phoneNumber = "593968857043"; // Reemplaza con el número de teléfono
    const message = "Hola me gustaría más información"; // Reemplaza con el mensaje deseado
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

}
