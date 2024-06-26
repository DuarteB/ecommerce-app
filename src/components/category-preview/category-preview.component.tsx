import { Link } from 'react-router-dom';

import ProductCard from '../product-card/product-card.component';

import { CategoryPreviewContainer, Preview, CategoryTitle } from './category-preview.styles';

const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <CategoryTitle as={'h2'} to={`${title.toLowerCase()}`} className='title'>{title.toUpperCase()}</CategoryTitle>
      <Preview>
        {
          products
            .filter((_, index) => index < 4)
            .map((product) => (
              <ProductCard key={product.id} product={product}/>
            ))
        }
      </Preview>
    </CategoryPreviewContainer>
  )
};

export default CategoryPreview;