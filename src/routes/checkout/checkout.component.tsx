import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import './checkout.styles.scss';

const Checkout = () => {
	const { cartItems } = useContext(CartContext)

  return (
    <div>
      <div>
        {cartItems.map(item =>
          <CheckoutItem key={item.id} cartItem={item} />
        )}
      </div>
    </div>
  );
};

export default Checkout;
