import React, { useContext } from 'react';
import { Col } from 'reactstrap';
import WrapperComponent from '../common/WrapperComponent';
import ProductSection1 from '../parisTheme/productSections/ProductSection1';
import ProductSection4 from '../parisTheme/productSections/ProductSection4';
import RightSidebar from './RightSidebar';
import { CakeSVG } from '../common/CommonSVG';
import ProductIdsContext from '@/helper/productIdsContext';

const ProductCard = ({ dataAPI }) => {
  const { filteredProduct } = useContext(ProductIdsContext);
  return (
    <WrapperComponent classes={{ row: 'g-3' }} customCol={true}>
      <Col xxl={dataAPI?.main_content?.sidebar?.status ? 9 : 12} xl={dataAPI?.main_content?.sidebar?.status ? 8 : 12}>
        {dataAPI?.main_content?.section1_products?.status && dataAPI?.main_content?.section1_products?.product_ids?.length >= 5 && (
          <ProductSection1
            ProductData={filteredProduct}
            dataAPI={dataAPI?.main_content?.section1_products}
            svgUrl={<CakeSVG className='icon-width' />}
            noCustomClass={true}
            classObj={{ productStyle: 'product-standard', productBoxClass: 'product-box-bg' }}
          />
        )}
        {dataAPI?.main_content?.section2_slider_products?.status && dataAPI?.main_content?.section2_slider_products?.product_ids?.length >= 5 && (
          <ProductSection4 ProductData={filteredProduct} dataAPI={dataAPI?.main_content?.section2_slider_products} svgUrl={<CakeSVG className='icon-width' />} customClass={'title section-t-space'} />
        )}
        {dataAPI?.main_content?.section3_products?.status && dataAPI?.main_content?.section3_products?.product_ids?.length >= 5 && (
          <ProductSection1
            ProductData={filteredProduct}
            dataAPI={dataAPI?.main_content?.section3_products}
            svgUrl={<CakeSVG className='icon-width' />}
            noCustomClass={true}
            customClass={'title section-t-space'}
            classObj={{ productStyle: 'product-standard', productBoxClass: 'product-box-bg' }}
          />
        )}
        {dataAPI?.main_content?.section4_products?.status && dataAPI?.main_content?.section4_products?.product_ids?.length >= 5 && (
          <ProductSection1
            ProductData={filteredProduct}
            dataAPI={dataAPI?.main_content?.section4_products}
            svgUrl={<CakeSVG className='icon-width' />}
            noCustomClass={true}
            customClass={'title section-t-space'}
            classObj={{ productStyle: 'product-standard', productBoxClass: 'product-box-bg' }}
          />
        )}
      </Col>
      {dataAPI?.main_content?.sidebar?.status && (
        <Col xxl={3} xl={4} className='d-none d-xl-block'>
          <RightSidebar dataAPI={dataAPI?.main_content?.sidebar?.right_side_banners} />
        </Col>
      )}
    </WrapperComponent>
  );
};

export default ProductCard;
