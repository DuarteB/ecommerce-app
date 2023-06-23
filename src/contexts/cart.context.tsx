import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems: any, productToAdd: any) => {
  // Find if cartItems contains productToAdd
  const existingCartItem = cartItems.find((cartItem: { id: number }) =>
    cartItem.id === productToAdd.id
  );

  // If found, increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem: { id: number; quantity: number; }) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // Return new array with modified cartItems/ new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// const deleteCartItem = (cartItems, productToDelete) => {
//   const newCart = 
//   return [...newCart];
// }

export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
  showDropdown: false,
  setShowDropdown: () => {},
  cartCount: 0
});

export const CartProvider = ({ children }: any) => {
  const [cartItems, setCartItems] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem: { quantity: number }) => 
      total + cartItem.quantity
    , 0)
    setCartCount(newCartCount);
  }, [cartItems])

  const addItemToCart = (productToAdd: any) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const value: any = { cartItems, addItemToCart, showDropdown, setShowDropdown, cartCount };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
