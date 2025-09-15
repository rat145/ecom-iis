import React from 'react';
import ProductSection2 from '../parisTheme/productSections/ProductSection2';
import WrapperComponent from '../common/WrapperComponent';
import { osakaCategoryOption } from '../../data/SliderSettings';

const CategoryMenu = ({ dataAPI }) => {
  return (
    <WrapperComponent>
      <ProductSection2 dataAPI={dataAPI} classes={{ link: 'category-box-2', sliderOption: osakaCategoryOption }} />
    </WrapperComponent>
  );
};

export default CategoryMenu;
