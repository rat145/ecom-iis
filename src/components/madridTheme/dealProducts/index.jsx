import { useContext, useMemo } from 'react';
import { Col, Row } from 'reactstrap';
import CustomHeading from '@/components/common/CustomHeading';
import WrapperComponent from '@/components/common/WrapperComponent';
import SpecialOffer from './SpecialOffer';
import ProductBox1 from '@/components/common/productBox/productBox1/ProductBox1';
import ProductIdsContext from '@/helper/productIdsContext';

const DealProduct = ({ dataAPI }) => {
  const { filteredProduct } = useContext(ProductIdsContext);
  const filterProduct = useMemo(() => {
    return filteredProduct?.filter((el) => dataAPI?.products_list?.product_ids.includes(el.id));
  }, [dataAPI, filteredProduct]);
  return (
    <WrapperComponent classes={{ sectionClass: 'product-section product-section-3' }} noRowCol={true}>
      <CustomHeading title={dataAPI?.title} />
      <Row className='g-sm-4 g-3'>
        {dataAPI?.deal_of_days?.status && (
          <Col xxl={4} lg={5} className='order-lg-2 d-xxl-block d-none'>
            <SpecialOffer dataAPI={dataAPI} ProductData={filteredProduct} />
          </Col>
        )}
        <Col
          xxl={(dataAPI?.deal_of_days?.status && dataAPI?.deal_of_days?.deals?.length) || 0 ? 8 : 12}
          lg={(dataAPI?.deal_of_days?.status && dataAPI?.deal_of_days?.deals?.length) || 0 ? 12 : 12}
          className='order-lg-1 product-standard theme-plus'>
          <Row
            xl={3}
            lg={(dataAPI?.deal_of_days?.status && dataAPI?.deal_of_days?.deals?.length) || 0 ? 2 : 5}
            xxl={(dataAPI?.deal_of_days?.status && dataAPI?.deal_of_days?.deals?.length) || 0 ? 4 : 6}
            md={(dataAPI?.deal_of_days?.status && dataAPI?.deal_of_days?.deals?.length) || 0 ? 3 : 4}
            xs={2}
            className='g-sm-4 g-3'>
            {filterProduct?.map((product, i) => (
              <Col key={i}>
                <ProductBox1 imgUrl={product?.product_thumbnail} productDetail={product} classObj={{ productStyle: 'product-standard theme-plus', productBoxClass: 'product-box-bg' }} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </WrapperComponent>
  );
};

export default DealProduct;
