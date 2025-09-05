import React, { useContext } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import CustomHeading from '@/components/common/CustomHeading';
import Avatar from '@/components/common/Avatar';
import { placeHolderImage } from '../../../data/CommonPath';
import CategoryContext from '@/helper/categoryContext';
import { useTranslation } from '@/app/i18n/client';
import I18NextContext from '@/helper/i18NextContext';

const ProductSection2 = ({ dataAPI, isHeadingVisible = false, classes = {}, svgUrl }) => {
  const { filterCategory } = useContext(CategoryContext);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const categoryData = filterCategory('product');
  return (
    <>
      {isHeadingVisible ? <CustomHeading customClass={classes?.noCustomClass ? '' : 'section-t-space title'} title={dataAPI?.title} svgUrl={svgUrl} subTitle={dataAPI?.description} /> : ''}

      <div className='category-slider-2 product-wrapper no-arrow'>
        <Slider {...classes?.sliderOption}>
          {categoryData?.map((elem) => (
            <div key={elem.id}>
              <Link href={`/${i18Lang}/collections?category=${elem?.slug}`} className={`category-box ${classes?.link} category-dark`}>
                <div>
                  <Avatar data={elem?.category_icon} placeHolder={placeHolderImage} name={elem.name} />
                  <h5>{elem.name}</h5>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default ProductSection2;
