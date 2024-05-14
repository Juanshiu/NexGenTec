import { writable, derived } from 'svelte/store';
import type Cart  from '../interface/cart';
import type Product from '../interface/productos';

// Inicializa el carrito con un valor vacío
const cartStore = writable<Cart[]>([]);

// Derivada para obtener el total de productos en el carrito
export const totalQuantity = derived(cartStore, ($cartStore) =>
  $cartStore.reduce((total, item) => total + item.cantidad, 0)
);

// Función para agregar un producto al carrito
export const addToCart = (product: Product, quantity: number) => {
  cartStore.update((currentCart) => {
    const existingItem = currentCart.find((item) => item.id_producto.id_producto === product.id_producto);

    if (existingItem) {
      // Si el producto ya está en el carrito, actualizar la cantidad
      existingItem.cantidad += quantity;
    } else {
      // Si el producto no está en el carrito, agregarlo
      currentCart.push({
        id_producto: product, cantidad: quantity,
        id_carrito: 0
      });
    }

    return currentCart;
  });
};

// Función para eliminar un producto del carrito
export const removeFromCart = (productId: number) => {
  cartStore.update((currentCart) =>
    currentCart.filter((item) => item.id_producto.id_producto !== productId)
  );
};

// Exportar el carrito y las funciones para interactuar con él
export default {
  subscribe: cartStore.subscribe,
  addToCart,
  removeFromCart,
  totalQuantity,
};