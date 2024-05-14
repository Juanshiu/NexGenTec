import type Products from '../interface/productos';

export default interface Cart {
    id_carrito: number;
    id_producto: Products;
    cantidad: number;
}