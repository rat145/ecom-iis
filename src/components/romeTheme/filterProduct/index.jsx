import React, { useContext, useMemo, useState } from 'react';
import WrapperComponent from '@/components/common/WrapperComponent';
import ProductNavLink from './ProductNavLink';
import ProductTab from './ProductTab';
import CategoryContext from '@/helper/categoryContext';

const FilterProduct = ({ dataAPI }) => {
  const [activeTab, setActiveTab] = useState(1);
  const { filterCategory } = useContext(CategoryContext);
  const categoryData = filterCategory('product');

  const filterCategoryData = useMemo(() => {
    return categoryData?.filter((el) => dataAPI?.category_ids?.includes(el.id));
  }, [categoryData, dataAPI]);
  return (
    <WrapperComponent classes={{ sectionClass: 'product-section' }}>
      <ProductNavLink setActiveTab={setActiveTab} activeTab={activeTab} filterCategoryData={filterCategoryData} dataAPI={dataAPI} />
      <ProductTab activeTab={typeof activeTab == 'object' ? activeTab?.id : activeTab} filterCategoryData={filterCategoryData} />
    </WrapperComponent>
  );
};

export default FilterProduct;
