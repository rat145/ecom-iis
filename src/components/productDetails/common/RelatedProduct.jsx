import { useContext } from 'react';
import { LeafSVG } from '@/components/common/CommonSVG';
import WrapperComponent from '@/components/common/WrapperComponent';
import ProductSection1 from '@/components/parisTheme/productSections/ProductSection1';
import ProductIdsContext from '@/helper/productIdsContext';
import { productPageRelatedSliderOptions } from '../../../data/SliderSettings';

const RelatedProduct = ({ productState }) => {
  const { filteredProduct } = useContext(ProductIdsContext);
  return (
    <WrapperComponent classes={{ sectionClass: 'product-list-section section-b-space pt-0' }} noRowCol={true}>
      <ProductSection1
        dataAPI={{ title: 'YouMayAlsoLike', product_ids: productState?.product?.related_products }}
        ProductData={filteredProduct}
        svgUrl={<LeafSVG className='icon-width' />}
        noCustomClass={true}
        classObj={{ productStyle: 'product-standard', productBoxClass: 'product-box-bg' }}
        customSliderOption={productPageRelatedSliderOptions}
      />
    </WrapperComponent>
  );
};

export default RelatedProduct;
