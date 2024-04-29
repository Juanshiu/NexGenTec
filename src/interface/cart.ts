export default interface Cart {
    id_carrito: number;
    id_producto: {
        id_productos: number;
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
    };
    cantidad: number;
}