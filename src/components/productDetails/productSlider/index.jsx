import { useContext } from 'react';
import { Col, Row } from 'reactstrap';
import AddProductDetail from '../common/AddProductDetail';
import PaymentOptions from '../common/PaymentOptions';
import ProductInformation from '../common/ProductInformation';
import ProductDetailsTab from '../common/ProductDetailsTab';
import ProductDetailAction from '../common/ProductDetailAction';
import OfferTimer from '../common/OfferTimer';
import ProductDetails from '../product4Image/ProductDetails';
import ProductAttribute from '../common/productAttribute/ProductAttribute';
import ProductDetailSidebar from '../common/productDetailSidebar';
import WrapperComponent from '@/components/common/WrapperComponent';
import TopSlider from './TopSlider';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import ProductSocial from '../common/ProductSocial';
import ProductBundle from '../common/ProductBundle';
import ProductDeliveryInformation from '../common/ProductDeliveryInformation';

const ProductSlider = ({ productState, setProductState }) => {
  const { themeOption } = useContext(ThemeOptionContext);
  return (
    <>
      <TopSlider productState={productState} />
      <WrapperComponent classes={{ sectionClass: 'product-section section-b-space' }} customCol={true}>
        <Col xxl={9} xl={8} lg={7}>
          <Row className='g-4'>
            <Col xs={12}>
              <div className='right-box-contain full-width-right-box'>
                <ProductDetails productState={productState} />
                {productState?.product?.type == 'classified' && <ProductAttribute productState={productState} setProductState={setProductState} />}
                {productState?.product?.sale_starts_at && productState?.product?.sale_expired_at && <OfferTimer productState={productState} />}

                <ProductDetailAction productState={productState} setProductState={setProductState} />
                <AddProductDetail productState={productState} />
                <ProductInformation productState={productState} />
                {productState?.product?.estimated_delivery_text || (productState?.product?.return_policy_text && productState?.product?.is_return) ? (
                  <ProductDeliveryInformation productState={productState} />
                ) : null}
                <PaymentOptions productState={productState} />

                {themeOption?.product?.social_share && productState?.product?.social_share ? <ProductSocial productState={productState} /> : null}
              </div>
            </Col>
            {productState?.product?.cross_sell_products?.length > 0 ? (
              <Col xs={12} className='related-product-2'>
                <ProductBundle productState={productState} />
              </Col>
            ) : null}

            <ProductDetailsTab productState={productState} />
          </Row>
        </Col>
        <ProductDetailSidebar productState={productState} />
      </WrapperComponent>
    </>
  );
};

export default ProductSlider;
