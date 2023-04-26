import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  products: [],
  setProducts: () => {},
  showDropdown: false,
  setShowDropdown: () => {}
});

export const CartProvider = ({ children }) => {
  const [ products, setProducts ] = useState([]);
  const [ showDropdown, setShowDropdown ] = useState(false);

  const value = { products, setProducts, showDropdown, setShowDropdown };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
};