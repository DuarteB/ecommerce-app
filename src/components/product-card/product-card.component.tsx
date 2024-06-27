import { useContext } from "react";

import {
  Footer,
  AddProductButton,
  ProductImage,
  ProductName,
  ProductPrice,
  ProductCardContainer,
} from "./product-card.styles";

import { CartContext } from "../../contexts/cart.context";

import Button, { BUTTON_TYPES_CLASSES } from "../button/button.component";

type productProps = {
  name: string;
  price: string;
  imageUrl: string;
};

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => {
    addItemToCart(product);
  };

  return (
    <ProductCardContainer>
      <ProductImage src={imageUrl} alt={`${name}`} />
      <Footer>
        <ProductName>{name}</ProductName>
        <ProductPrice>{price}</ProductPrice>
      </Footer>
      <AddProductButton
        buttonType={BUTTON_TYPES_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to cart
      </AddProductButton>
    </ProductCardContainer>
  );
};

export default ProductCard;
