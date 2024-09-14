import { isClient } from './isClient';
import type Cart from '../interface/cart';

export const saveCartToLocalStorage = (cart: Cart[]) => {
  if (isClient) {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error al guardar el carrito en localStorage:', error);
    }
  }
};

export const getCartFromLocalStorage = (): Cart[] => {
  if (isClient) {
    try {
      const cartData = localStorage.getItem('cart');
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error('Error al recuperar el carrito de localStorage:', error);
      return [];
    }
  }
  return [];
};