import React, { useContext } from 'react';
import WrapperComponent from '../common/WrapperComponent';
import ProductSection1 from '../parisTheme/productSections/ProductSection1';
import ProductIdsContext from '@/helper/productIdsContext';
import { productPageRelatedSliderOptions } from '../../data/SliderSettings';

const TopProducts = ({ dataAPI }) => {
  const { filteredProduct } = useContext(ProductIdsContext);
  return (
    <>
      <WrapperComponent classes={{ sectionClass: 'product-section' }} noRowCol={true}>
        <ProductSection1
          dataAPI={dataAPI?.products_list_1}
          ProductData={filteredProduct}
          noCustomClass={true}
          classObj={{ productStyle: 'product-standard', productBoxClass: 'product-box-bg' }}
          customSliderOption={productPageRelatedSliderOptions}
        />
      </WrapperComponent>
    </>
  );
};

export default TopProducts;
