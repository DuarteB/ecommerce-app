import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems: any, productToAdd: any) => {
  // Find if cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    (cartItem: { id: number }) => cartItem.id === productToAdd.id
  );

  // If found, increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem: { id: number; quantity: number }) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // Return new array with modified cartItems/ new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  //Find the cart item to remove;
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  console.log(existingCartItem);

  //Check if quantity is equal to 1, if it is remove that item from the cart;
  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  //Return back cartItems with matching cart item with redeced quantity;
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
  showDropdown: false,
  setShowDropdown: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  total: 0,
  cartCount: 0,
});

export const CartProvider = ({ children }: any) => {
  const [cartItems, setCartItems] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => cartItem.price * cartItem.quantity + total,
      0
    );

    setTotal(newCartTotal);
  }, [cartItems]);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem: { quantity: number }) => total + cartItem.quantity,
      0
    );

    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd: any) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove: any) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToClear: any) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  const value: any = {
    cartItems,
    addItemToCart,
    showDropdown,
    setShowDropdown,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
