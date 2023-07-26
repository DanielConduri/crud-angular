import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from 'config/config';
import { BehaviorSubject, Observable } from 'rxjs';

import { cargaLoading, 
  productosModel, 
  dataProductos , 
  addProductosData,
  ProductosShowModel 
  } from '../models/productos';

const isCarga: {
  isLoading: boolean;
  isData: boolean;
} = {
  isLoading: false,
  isData: false,
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private URL_API_PRODUCTOS: string = config.URL_API_BASE + 'productos';

  datosProductos!: dataProductos[];
  //datosProductos!: productosModel[];

  isModify!: number;


  constructor(private http: HttpClient) {
  }
  
  private iscarga$ = new BehaviorSubject<cargaLoading>(isCarga);
  get SelectIsCarga$(): Observable<cargaLoading> {
    return this.iscarga$.asObservable();
  }

  setIsCarga(data: cargaLoading){
    this.iscarga$.next(data);
  }

  getProductos(){ //Obtiene los productos del backend
    return this.http.get<productosModel>(`${this.URL_API_PRODUCTOS}`, {
      withCredentials: true,
    })
  }

  getProductoId(idProducto: number) {
    return this.http.get<any>(
      `${this.URL_API_PRODUCTOS}/${idProducto}`,
      {
        withCredentials: true,
      }
    )
  }
  

  postProductos(dataProducto: addProductosData){
    console.log('dataProducto', dataProducto);
    return this.http.post<ProductosShowModel>(
      `${this.URL_API_PRODUCTOS}`, dataProducto,
      {
        withCredentials: true,
      }
    )
  }//fin getProductos

  deleteProducto(id: number){
    console.log('Id del producto a eliminar ->', id);
    return this.http.delete<any>(`${this.URL_API_PRODUCTOS}/${id}`,
      {
        withCredentials: true,
      }
    )
  }
  
}
