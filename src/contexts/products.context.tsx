import { createContext, useEffect, useState } from "react";

import SHOP_DATA from '../shop-data.json';

export const ProductContext = createContext({
  products: [],
  setProducts: () => {}
});

export const ProductsProvider = ({ children }) => {
  const [ products, setProducts ] = useState([]);
  const value = { products, setProducts };

  useEffect(() => {
    setProducts(SHOP_DATA);
  }, [])

  return(
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  )
}

