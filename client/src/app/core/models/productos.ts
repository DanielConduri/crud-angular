//------------------------------- MOSTRAR PERSONAS - CRUD DE PRODUCTOS -------------------------------

export interface productosModel {
    status: boolean;
    message: string;
    body: dataProductos[];
}

export interface dataProductos {
    int_producto_id: number;
    str_producto_codigo: string;
	str_producto_nombre: string;
	int_producto_cantidad: number;
	str_producto_marca: string;
	int_producto_precio: number;
	str_producto_proveedor: string;
    str_producto_estado: string;
    dt_fecha_creacion: string;
}

//------------------------------- AGREGAR - CRUD DE PRODUCTOS -------------------------------

export interface modDataProductos {
    status: boolean;
    message: string;

}

export interface cargaLoading {
    isLoading: boolean,
    isData: boolean,
}


export interface DataFormProducto {
    form: string,
    title:string,
    special: boolean
}


export interface ProductosShowModel {
    status: boolean;
    message: string;
    body: EstadosData[];
}

export interface EstadosData {
    int_producto_id: number;
    str_producto_codigo: string;
	str_producto_nombre: string;
	int_producto_cantidad: number;
	str_producto_marca: string;
	int_producto_precio: number;
	str_producto_proveedor: string;
    str_producto_estado: string;
    dt_fecha_creacion: string;
}
  

export interface addProductosData{
    str_producto_codigo: string;
	str_producto_nombre: string;
	int_producto_cantidad: number;
	str_producto_marca: string;
	int_producto_precio: number;
	str_producto_proveedor: string;
}


//----------EDITAR PRODUCTO--------------
/*export interface addProductosData{
    str_producto_codigo: string;
	str_producto_nombre: string;
	int_producto_cantidad: number;
	str_producto_marca: string;
	int_producto_precio: number;
	str_producto_proveedor: string;
}*/