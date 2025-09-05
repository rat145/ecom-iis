import React from 'react';
import WrapperComponent from '../common/WrapperComponent';
import CustomHeading from '../common/CustomHeading';
import FeatureBlog from '../parisTheme/FeatureBlog';
import { romeBlogSliderOption } from '../../data/SliderSettings';

const RomeFeatureBlog = ({ dataAPI }) => {
  return (
    <WrapperComponent classes={{ sectionClass: '' }}>
      <CustomHeading title={dataAPI?.featured_blogs?.title} />
      <FeatureBlog dataAPI={dataAPI?.featured_blogs} classes={{ sliderClass: 'slider-3 arrow-slider', sliderOption: romeBlogSliderOption, ratioClass: 'ratio_65' }} />
    </WrapperComponent>
  );
};

export default RomeFeatureBlog;
