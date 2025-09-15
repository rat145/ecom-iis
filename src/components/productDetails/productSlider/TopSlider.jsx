import WrapperComponent from '@/components/common/WrapperComponent';
import Image from 'next/image';
import Slider from 'react-slick';
import { productDetailTopSlider } from '../../../data/SliderSettings';

const TopSlider = ({ productState }) => {
  return (
    <WrapperComponent colProps={{ xs: 12 }}>
      <div className='slider-3-product product-wrapper'>
        <Slider {...productDetailTopSlider}>
          {productState?.product?.product_galleries?.map((elem, i) => (
            <div key={i}>
              <div className='product-slider-image'>
                <Image src={elem?.original_url} alt={elem?.name} className='img-fluid' height={264} width={264} />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </WrapperComponent>
  );
};

export default TopSlider;
