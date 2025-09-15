import ProductWrapper from './ProductWrapper';
import MadridTwoBanner from './MadridTwoBanner';
import DeliveryBanner from './DeliveryBanner';
import WrapperComponent from '../common/WrapperComponent';
import FeatureBlog from '../parisTheme/FeatureBlog';
import { madridFeatureBlog, madridFullSlider } from '../../data/SliderSettings';
import CustomHeading from '../common/CustomHeading';

const OtherSection = ({ dataAPI }) => {
  return (
    <>
      {dataAPI?.products_list_2?.status && dataAPI?.products_list_2?.product_ids?.length >= 6 && (
        <ProductWrapper dataAPI={dataAPI?.products_list_2} noCustomClass={true} classObj={{ productStyle: 'product-standard theme-plus', productBoxClass: 'product-box-bg' }} customSliderOption={madridFullSlider}/>
      )}

      {dataAPI?.products_list_3?.status && dataAPI?.products_list_3?.product_ids?.length >= 6 && (
        <ProductWrapper dataAPI={dataAPI?.products_list_3} noCustomClass={true} classObj={{ productStyle: 'product-standard theme-plus', productBoxClass: 'product-box-bg' }} customSliderOption={madridFullSlider}/>
      )}

      {dataAPI?.two_column_banners?.status && <MadridTwoBanner dataAPI={dataAPI} />}

      {dataAPI?.products_list_4?.status && dataAPI?.products_list_4?.product_ids?.length >= 6 && (
        <ProductWrapper dataAPI={dataAPI?.products_list_4} noCustomClass={true} classObj={{ productStyle: 'product-standard theme-plus', productBoxClass: 'product-box-bg' }} customSliderOption={madridFullSlider}/>
      )}

      {dataAPI?.products_list_5?.status && dataAPI?.products_list_5?.product_ids?.length >= 6 && (
        <ProductWrapper dataAPI={dataAPI?.products_list_5} noCustomClass={true} classObj={{ productStyle: 'product-standard theme-plus', productBoxClass: 'product-box-bg' }} customSliderOption={madridFullSlider}/>
      )}

      {dataAPI?.delivery_banners?.status && <DeliveryBanner dataAPI={dataAPI?.delivery_banners} />}

      {dataAPI?.products_list_6?.status && dataAPI?.products_list_6?.product_ids?.length >= 6 && (
        <ProductWrapper dataAPI={dataAPI?.products_list_6} noCustomClass={true} classObj={{ productStyle: 'product-standard theme-plus', productBoxClass: 'product-box-bg' }} customSliderOption={madridFullSlider}/>
      )}

      {dataAPI?.products_list_7?.status && dataAPI?.products_list_7?.product_ids?.length >= 6 && (
        <ProductWrapper dataAPI={dataAPI?.products_list_7} noCustomClass={true} classObj={{ productStyle: 'product-standard theme-plus', productBoxClass: 'product-box-bg' }} customSliderOption={madridFullSlider}/>
      )}

      {dataAPI?.featured_blogs?.blog_ids.length >= 3 && dataAPI?.featured_blogs?.status && (
        <WrapperComponent classes={{ sectionClass: 'blog-section section-b-space' }} noRowCol={true}>
          <CustomHeading title={dataAPI?.featured_blogs?.title} />
          <FeatureBlog dataAPI={dataAPI?.featured_blogs} classes={{ sliderClass: 'slider-3-blog arrow-slider slick-height', sliderOption: madridFeatureBlog, ratioClass: 'ratio_65' }} />
        </WrapperComponent>
      )}
    </>
  );
};

export default OtherSection;
