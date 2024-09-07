import { AfterContentInit, ElementRef, Injectable, ViewChild } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs'

import { DataFormProducto } from '../models/productos';

const idProducto: number = 0
const idRol: number = 0
const idUser: number = 0;
const idPorfile: number = 0;
const idMarca: number = 0;
const idEstado: number = 0;
const idProveedor: number = 0;
const idCatalogo: number = 0;
const idBien: number = 0;
const idArchivo: number = 0;

const strCedula: string = '';

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
  private idUser$ = new BehaviorSubject<number>(idUser);
  private idRol$ = new BehaviorSubject<number>(idRol);
  private idPorfile$ = new BehaviorSubject<number>(idPorfile);
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

// BehaviorSubject para obtener ID en Marca
private idDataMarca$ = new BehaviorSubject<number>(idMarca);

get SelectID_Marca$(): Observable<number>{
  return this.idDataMarca$.asObservable();
}

setSelectID_Marca(_idMarca: number){
  this.idDataMarca$.next(_idMarca);
}

// BehaviorSubject para obtener ID en Estado
private idDataEstado$ = new BehaviorSubject<number>(idEstado);

get SelectID_Estado$(): Observable<number>{
  return this.idDataEstado$.asObservable();
}

setSelectID_Estado(_idEstado: number){
  this.idDataEstado$.next(_idEstado);
}


// BehaviorSubject para obtener ID en Proveedor
private idDataProveedor$ = new BehaviorSubject<number>(idProveedor);

get SelectID_Proveedor$(): Observable<number>{
  return this.idDataProveedor$.asObservable();
}

setSelectID_Proveedor(_idProveedor: number){
  this.idDataProveedor$.next(_idProveedor);
}


// BehaviorSubject para obtener ID en Catalogo
private idDataCatalogo$ = new BehaviorSubject<number>(idCatalogo);

get SelectID_Catalogo$(): Observable<number>{
  return this.idDataCatalogo$.asObservable();
}

setSelectID_Catalogo(_idCatalogo: number){
  this.idDataCatalogo$.next(_idCatalogo);
}

// BehaviorSubject para obtener ID de un Bien
private idDataBien$ = new BehaviorSubject<number>(idBien);

private idDataArchivo$ = new BehaviorSubject<number>(idArchivo);


//Para recuperar la cedula seleccionada
private strCedulaCustodio$ = new BehaviorSubject<string>(strCedula);

get SelectID_Archivo$(): Observable<number>{
  return this.idDataArchivo$ .asObservable();
}

get SelectID_Bien$(): Observable<number>{
  return this.idDataBien$.asObservable();
}

get SelectCedula_Custodio$(): Observable<string> {
  return this.strCedulaCustodio$.asObservable();
}

setSelectID_Bien(_idBien: number){
  this.idDataBien$.next(_idBien);
}

setSelectCedula_Custodio(_strCedula: string) {
  this.strCedulaCustodio$.next(_strCedula);
}

setSelectID_Archivo(_idArchivo: number){
  this.idDataArchivo$.next(_idArchivo);
}


// private porfileForm$ = new BehaviorSubject<porfileModel>(idPorfile);


get SelectIdRol$(): Observable<number> {
  return this.idRol$.asObservable();
}

setIdRol(data: number){
  this.idRol$.next(data);
}


get selectIdUser$(){
  return this.idUser$.asObservable();
}

setIdUser(id: number){
  this.idUser$.next(id);
}

  setForm(data: DataFormProducto){
    console.log('enviando del boton ->', data);
    this.form$.next(data);
  }

 //----------------- FUNCIONES PARA PERFILES -----------------//
get selectIdPorfile$(){
  // console.log('id porfile en modal.service', this.idPorfile$)
  return this.idPorfile$.asObservable();
}

setIdPorfile(id: number){
  this.idPorfile$.next(id);
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
      // setTimeout(() => {
      //   if (modalGeneral) {
      //     modalGeneral.style.opacity = 1;
      //   }
      // }); //FOR TRANSITION
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
