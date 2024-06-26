import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
  const { showDropdown ,setShowDropdown, cartItems, cartCount } = useContext(CartContext)

  return (
    <CartIconContainer onClick={() => setShowDropdown(!showDropdown)}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
};

export default CartIcon;