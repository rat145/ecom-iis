import { Col, Row } from 'reactstrap';
import ProductDetailsTab from '../common/ProductDetailsTab';
import WrapperComponent from '@/components/common/WrapperComponent';
import ProductThumbnailSlider from './ProductThumbnailSlider';
import ProductDetailSidebar from '../common/productDetailSidebar';
import MainProductContent from '../common/MainProductContent';
import ProductDetailAccordion from '../common/productDetailAccordion';

const ProductThumbnail = ({ productState, setProductState, customTab }) => {
  return (
    <>
      <WrapperComponent classes={{ sectionClass: 'product-section section-b-space' }} customCol={true}>
        <Col xxl={9} xl={8} lg={7}>
          <Row className='g-4'>
            <ProductThumbnailSlider productState={productState} setProductState={setProductState} />
            <MainProductContent productState={productState} setProductState={setProductState} />
            {customTab ? <ProductDetailAccordion productState={productState} /> : <ProductDetailsTab productState={productState} setProductState={setProductState} />}
          </Row>
        </Col>
        <ProductDetailSidebar productState={productState} setProductState={setProductState} />
      </WrapperComponent>
    </>
  );
};

export default ProductThumbnail;
