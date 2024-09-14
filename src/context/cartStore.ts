import { writable, derived } from 'svelte/store';
import type Cart from '../interface/cart';
import type Product from '../interface/productos';
import { getCartFromLocalStorage, saveCartToLocalStorage } from '../utils/persistCart';

// Inicializa el carrito con los datos del localStorage
const storedCart = getCartFromLocalStorage();
const cartStore = writable<Cart[]>(storedCart);

// Derivada para obtener el total de productos en el carrito
export const totalQuantity = derived(cartStore, ($cartStore) =>
  $cartStore.reduce((total, item) => total + item.cantidad, 0)
);

// Función para agregar un producto al carrito
export const addToCart = (product: Product, quantity: number) => {
  cartStore.update((currentCart) => {
    const existingItem = currentCart.find((item) => item.id_producto.id_producto === product.id_producto);

    if (existingItem) {
      existingItem.cantidad += quantity;
    } else {
      currentCart.push({
        id_producto: product,
        cantidad: quantity,
        id_carrito: 0
      });
    }

    saveCartToLocalStorage(currentCart);
    return currentCart;
  });
};

// Función para eliminar un producto del carrito
export const removeFromCart = (productId: number) => {
  cartStore.update((currentCart) => {
    const updatedCart = currentCart.filter((item) => item.id_producto.id_producto !== productId);
    saveCartToLocalStorage(updatedCart);
    return updatedCart;
  });
};

// Exportar el carrito y las funciones para interactuar con él
export default {
  subscribe: cartStore.subscribe,
  addToCart,
  removeFromCart,
  totalQuantity,
};