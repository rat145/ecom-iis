import React, { useContext } from 'react';
import MainContent from '.';
import WrapperComponent from '@/components/common/WrapperComponent';
import ProductSection4 from '@/components/parisTheme/productSections/ProductSection4';
import OfferBanner from '@/components/tokyoTheme/OfferBanner';
import { LeafSVG } from '@/components/common/CommonSVG';
import ProductIdsContext from '@/helper/productIdsContext';

const BerlinSection = ({ dataAPI }) => {
  const { filteredProduct } = useContext(ProductIdsContext);
  return (
    <>
      <MainContent dataAPI={dataAPI} ProductData={filteredProduct} />

      <OfferBanner dataAPI={dataAPI?.full_width_banner} height={343} width={1524} />

      {dataAPI?.product_list_1?.status && dataAPI?.product_list_1?.product_ids?.length > 0 && (
        <WrapperComponent>
          <ProductSection4 dataAPI={dataAPI?.product_list_1} ProductData={filteredProduct} svgUrl={<LeafSVG className='icon-width' />} customClass='title' />
        </WrapperComponent>
      )}
    </>
  );
};

export default BerlinSection;
