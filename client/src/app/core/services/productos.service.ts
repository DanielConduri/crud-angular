import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  private URL_API_FILTRADO: string = config.URL_API_BASE + 'filtrado';
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

  getProductos(pagination: any){ //Obtiene los productos del backend
    
    const params = new HttpParams()
    .set('route', pagination.route);

    //this.URL_API_PRODUCTOS + '?'+ params
    //`${this.URL_API_PRODUCTOS}?${params}`
    return this.http.get<any>(`${this.URL_API_PRODUCTOS}?${params}`, {
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

  getProductoCodigo(codigo: string) {
    return this.http.get<any>(
      `${this.URL_API_PRODUCTOS}/item/${codigo}`,
      {
        withCredentials: true,
        
      }
    )
  }



  getFindProductos(data: string) {
    return this.http.get<any>(
      this.URL_API_FILTRADO+'/'+data,
      //`${this.URL_API_FILTRADO}/${data}`,
      {
        withCredentials: true,
      }
    )
  }
  
  putProductoById(idProducto: number, dataProducto: addProductosData) {
    console.log('dataProducto', dataProducto);
    return this.http.put<ProductosShowModel>(
      //this.URL_API_PRODUCTOS + '/' + idProducto, dataProducto,
      `${this.URL_API_PRODUCTOS}/${idProducto}`, dataProducto,
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
  }

  deleteProducto(id: number){
    console.log('Id del producto a eliminar ->', id);
    return this.http.delete<any>(`${this.URL_API_PRODUCTOS}/${id}`,
      {
        withCredentials: true,
      }
    )
  }
  
}
