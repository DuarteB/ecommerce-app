import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems: any, productToAdd: any) => {
  // Find if cartItems contains productToAdd
  const existingCartItem = cartItems.find((cartItem: { id: any }) => {
    cartItem.id === productToAdd.id;
  });

  // If found, increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem: { id: any; quantity: number; }) => {
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem;
    });
  }

  // Return new array with modified cartItems/ new cart item
  return [cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
  showDropdown: false,
  setShowDropdown: () => {},
});

export const CartProvider = ({ children }: any) => {
  const [cartItems, setCartItems] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const addItemToCart = (productToAdd: any) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const value: any = { cartItems, addItemToCart, showDropdown, setShowDropdown };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
