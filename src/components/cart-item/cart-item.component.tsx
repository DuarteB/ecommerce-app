import {
  CartItemContainer,
  ItemDetails,
  ItemImage,
  ItemName,
  ItemPrice,
} from "./cart-item.styles";

const CartItem = ({ cartItem }: any) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <ItemImage src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <ItemName>{name}</ItemName>
        <ItemPrice>
          {quantity} x ${price}
        </ItemPrice>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
