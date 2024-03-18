export default interface Products {
  id_productos: number;
  nombre_producto: string;
  id_marca: {
      nombre_marca: string;
  };
  descripcion: string;
  precio: number;
  stock: number;
  slug: string;
  img_producto: string;
}