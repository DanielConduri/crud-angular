import { AfterContentInit, ElementRef, Injectable, ViewChild } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs'

import { DataFormProducto } from '../models/productos';


const idProducto: number = 0

const intProducto: DataFormProducto = {
  form: '',
  title: '',
  special: true
}

const detalles: {
  form: string,
  title: string
} = {
  form: '',
  title: ''
}



@Injectable({
  providedIn: 'root'
})
export class ModalService implements AfterContentInit{

  constructor() { }


  ngAfterContentInit(): void {
    console.log('ngAfterViewInit called');
    throw new Error('Method not implemented.');
  }

  private idProducto$ = new BehaviorSubject<number>(idProducto);
  private form$ = new BehaviorSubject<DataFormProducto>(intProducto);

  get SelectID_Producto$(): Observable<number> {
    return this.idProducto$.asObservable();
  }

  setSelectID_Producto(_idProducto: number){
    this.idProducto$.next(_idProducto);
  }

  //Funciones para pasar los valores del form de productos
  get selectForm$(): Observable<DataFormProducto> {
    return this.form$.asObservable();
  }

  setForm(data: DataFormProducto){
    console.log('enviando del boton ->', data);
    this.form$.next(data);
  }

  openModal(){
    /*console.log('abriendo modal');
    console.log('modal general->');*/

    let modalGeneral = document.getElementById('modalGeneral') as any;
    if (modalGeneral){
      //console.log('abriendo modal desde el if ->', modalGeneral);
      modalGeneral.style.display = 'block';
      modalGeneral.classList.add('show');
      modalGeneral.style.backgroundColor = 'rgba(0,0,0,0.5)';
      setTimeout(() => {
        if (modalGeneral) {
          modalGeneral.style.opacity = 1;
        }
      }); //FOR TRANSITION
    }
  }

  closeModal() {
    let modalGeneral = document.getElementById('modalGeneral') as any;
    // console.log(modalGeneral);

    if (modalGeneral) {
      modalGeneral.style.display = 'none';
      modalGeneral.classList.remove('show');
      modalGeneral.style.opacity = 1;
    }
  }

}
