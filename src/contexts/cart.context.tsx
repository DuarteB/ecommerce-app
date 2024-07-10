import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

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

export const CART_ACTIONS_TYPE = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_SHOW_DROPDOWN: "SET_SHOW_DROPDOWN",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTIONS_TYPE.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTIONS_TYPE.SET_SHOW_DROPDOWN:
      return {
        ...state,
        showDropdown: payload,
      };
    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`);
  }
};

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

const INITIAL_STATE = {
  cartItems: [],
  showDropdown: false,
  cartCount: 0,
  cartTotal: 0,
};

export const CartProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const { cartItems, showDropdown, cartCount, cartTotal } = state;

  const updateCartItemsReducer = (newCartItems: any[]) => {
    const newCartCount = newCartItems.reduce(
      (total: number, cartItem: { quantity: number }) =>
        total + cartItem.quantity,
      0
    );

    const newCartTotal = newCartItems.reduce(
      (total: number, cartItem: { price: number; quantity: number }) =>
        cartItem.price * cartItem.quantity + total,
      0
    );

    dispatch(
      createAction(CART_ACTIONS_TYPE.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      })
    );
  };

  const addItemToCart = (productToAdd: any) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (cartItemToRemove: any) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (cartItemToClear: any) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  const setShowDropdown = () => {
    dispatch(createAction(CART_ACTIONS_TYPE.SET_SHOW_DROPDOWN, !showDropdown));
  };

  const value: any = {
    cartItems,
    addItemToCart,
    showDropdown,
    setShowDropdown,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
