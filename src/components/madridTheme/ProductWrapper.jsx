import { useContext } from 'react';
import ProductSection1 from '../parisTheme/productSections/ProductSection1';
import WrapperComponent from '../common/WrapperComponent';
import ProductIdsContext from '@/helper/productIdsContext';

const ProductWrapper = ({ dataAPI, noCustomClass, noSectionClass, noWrapperRowCol, titleClass, classObj = { productStyle: 'product-modern' }, customSliderOption }) => {
  const { filteredProduct } = useContext(ProductIdsContext);
  return (
    <>
      <WrapperComponent classes={{ sectionClass: noSectionClass ? '' : 'product-section-3' }} noRowCol={noWrapperRowCol ? false : true}>
        {dataAPI?.status && (
          <ProductSection1 dataAPI={dataAPI} ProductData={filteredProduct} noCustomClass={titleClass ? titleClass : noCustomClass} classObj={classObj} customSliderOption={customSliderOption} />
        )}
      </WrapperComponent>
    </>
  );
};

export default ProductWrapper;
