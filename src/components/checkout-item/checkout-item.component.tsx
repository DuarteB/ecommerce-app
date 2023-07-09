import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
	const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);

	const increaseItemHandler = () => {
		addItemToCart(cartItem);
	}

	const deleteItemHandler = () => {
		removeItemFromCart(cartItem);
	}

	const clearItemHandler = () => {
		clearItemFromCart(cartItem);
	}

	const { name, price, imageUrl, quantity } = cartItem;
  return(
		<div className="checkout-item-container">
			<div  className="image-container">
				<img src={imageUrl} alt={`${name}`} />
			</div>
			<span className="name">{name}</span>
			<span className="quantity">
				<div className="arrow" onClick={deleteItemHandler}>&#10094;</div>
				<span className="value">{quantity}</span>
				<div className="arrow" onClick={increaseItemHandler}>&#10095;</div>
			</span>
			<span className="price">x ${price}</span>
			<div className="remove-button" onClick={clearItemHandler}>&#10005;</div>
		</div>
  )
}

export default CheckoutItem;