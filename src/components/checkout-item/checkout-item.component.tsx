import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import {
	CheckoutItemContainer,
	ImageContainer,
	ItemImage,
	ItemName,
	ItemQuantity,
	ItemPrice,
	Arrow,
	ItemValue,
	RemoveButton
} from './checkout-item.styles';

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
		<CheckoutItemContainer>
			<ImageContainer>
				<ItemImage src={imageUrl} alt={`${name}`} />
			</ImageContainer>
			<ItemName>{name}</ItemName>
			<ItemQuantity>
				<Arrow onClick={deleteItemHandler}>&#10094;</Arrow>
				<ItemValue>{quantity}</ItemValue>
				<Arrow onClick={increaseItemHandler}>&#10095;</Arrow>
			</ItemQuantity>
			<ItemPrice>x ${price}</ItemPrice>
			<RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
		</CheckoutItemContainer>
  )
}

export default CheckoutItem;