export default interface Products {
  id_producto: number;
  nombre_producto: string;
  id_marca: {
      nombre_marca: string;
  };
  descripcion: string;
  precio: number;
  stock: number;
  img_producto: string;
  id_categoria: {
    nombre_categoria: string;
  }
  id_tipopc: {
    tipo_torre: string;
  }
}