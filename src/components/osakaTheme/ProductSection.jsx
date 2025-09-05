import ProductSection1 from '../parisTheme/productSections/ProductSection1';
import WrapperComponent from '../common/WrapperComponent';
import { LeafSVG } from '../common/CommonSVG';

const ProductSection = ({ ProductData, dataAPI }) => {
  return (
    <WrapperComponent noRowCol={true}>
      <ProductSection1 ProductData={ProductData} svgUrl={<LeafSVG className='icon-width' />} dataAPI={data?.content?.products_list_1} />
    </WrapperComponent>
  );
};

export default ProductSection;
