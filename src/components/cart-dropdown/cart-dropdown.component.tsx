import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import Button from "../button/button.component";
import "./cart-dropdown.styles.scss";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
  const { products } = useContext(CartContext);

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {[].map(item =>
          <CartItem cartItem={item} />
        )}
      </div>
      <Button children={undefined} buttonType={undefined}>
        GO TO CHECKOUT
      </Button>
    </div>
  );
};

export default CartDropdown;
