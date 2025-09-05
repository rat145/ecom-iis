'use client';
import { useEffect } from 'react';
import CustomHeading from '@/components/common/CustomHeading';
import NavTabTitles from '@/components/common/NavTabs';

const ProductNavLink = ({ filterCategoryData, setActiveTab, activeTab }) => {
  useEffect(() => {
    if (filterCategoryData?.length > 0) {
      setActiveTab((prev) => {
        return filterCategoryData[0];
      });
    }
  }, []);
  return (
    <CustomHeading title={'OurProducts'} customClass={'title-flex-2 title'}>
      <NavTabTitles classes={{ navClass: 'nav-tabs tab-style-color-2 tab-style-color' }} setActiveTab={setActiveTab} activeTab={activeTab} titleList={[...filterCategoryData]} />
    </CustomHeading>
  );
};

export default ProductNavLink;
