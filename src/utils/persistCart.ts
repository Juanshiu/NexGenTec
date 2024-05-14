// src/utils/persistCart.ts
import { isClient } from './isClient';
import type Cart from '../interface/cart';

// Función para guardar el carrito en el almacenamiento local
export const saveCartToLocalStorage = (cart: Cart[]) => {
  if (isClient) {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error al guardar el carrito en localStorage:', error);
    }
  }
};

// Función para recuperar el carrito del almacenamiento local
export const getCartFromLocalStorage = (): Cart[] => {
  if (isClient) {
    const cartData = localStorage.getItem('cart');
    let cart: Cart[] = [];
    try {
      if (cartData) {
        cart = JSON.parse(cartData);
      }
    } catch (error) {
      console.error('Error al recuperar el carrito de localStorage:', error);
    }
    return cart;
  }
  return [];
};
