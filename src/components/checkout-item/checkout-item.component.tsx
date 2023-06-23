import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
	const { addItemToCart } = useContext(CartContext);

	const increaseItemQuantity = () => {
		addItemToCart(cartItem);
	}

	const { name, price, imageUrl, quantity } = cartItem;
  return(
		<div>
			<img src={imageUrl}/>
			<span>{name}</span>
			<span>Qtd: {quantity}</span>
			<span>x Total: ${price}</span>
			<br></br>
			<button onClick={increaseItemQuantity}>increase qtd</button>
		</div>
  )
}

export default CheckoutItem;