import React, { useContext } from 'react';
import ProductBox2 from '@/components/common/productBox/productBox2/ProductBox2';
import ProductIdsContext from '@/helper/productIdsContext';

const ProductContent = ({ elem }) => {
  const { filteredProduct } = useContext(ProductIdsContext);
  return (
    <div className='top-selling-product'>
      {filteredProduct
        .filter((el) => elem.product_ids.includes(el.id))
        .map((product, i) => (
          <div className='top-selling-contain' key={i}>
            <ProductBox2 elem={product} rating={false} customImageClass='top-selling-image' />
          </div>
        ))}
    </div>
  );
};

export default ProductContent;
