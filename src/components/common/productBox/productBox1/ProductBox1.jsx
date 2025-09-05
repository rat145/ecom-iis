import React, { useContext } from 'react';
import Link from 'next/link';
import { RiCloseLine } from 'react-icons/ri';
import ProductBoxAction from './ProductBox1Action';
import ProductBox1Cart from './ProductBox1Cart';
import ProductBox1Rating from './ProductBox1Rating';
import Avatar from '../../Avatar';
import { placeHolderImage } from '../../../../data/CommonPath';
import Btn from '@/elements/buttons/Btn';
import I18NextContext from '@/helper/i18NextContext';
import ProductBagde from './ProductBagde';
import SettingContext from '@/helper/settingContext';
import { ModifyString } from '@/utils/customFunctions/ModifyString';

const ProductBox1 = ({ imgUrl, productDetail, isClose, addAction = true, classObj, setWishlistState }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { convertCurrency } = useContext(SettingContext);
  const handelDelete = (currObj) => {
    setWishlistState((prev) => prev.filter((elem) => elem.id !== currObj?.id));
  };
  return (
    <div className={`product-box ${classObj?.productBoxClass}`}>
      <ProductBagde productDetail={productDetail} />
      {isClose && (
        <div className='product-header-top' onClick={() => handelDelete(productDetail)}>
          <Btn className='wishlist-button close_button'>
            <RiCloseLine />
          </Btn>
        </div>
      )}
      <div className='product-image'>
        <Link href={`/${i18Lang}/product/${productDetail?.slug}`}>
          <Avatar data={imgUrl} placeHolder={placeHolderImage} customClass={'img-fluid'} name={productDetail.title} height={500} width={500} />
        </Link>
        <ProductBoxAction productObj={productDetail} listClass='product-option' />
      </div>
      <div className='product-detail'>
        <Link href={`/${i18Lang}/product/${productDetail?.slug}`}>
          <h6 className='name'>{productDetail.name}</h6>
          <p dangerouslySetInnerHTML={{ __html: productDetail?.short_description }} />
        </Link>
        {productDetail?.unit && <h6 className='unit mt-1'>{productDetail?.unit}</h6>}
        <h5 className='sold text-content'>
          <span className='theme-color price'>{convertCurrency(productDetail?.sale_price)}</span>
          <del>{convertCurrency(productDetail?.price)}</del>
        </h5>

        <div className='product-rating mt-sm-2 mt-1'>
          <ProductBox1Rating totalRating={productDetail?.rating_count || 0} />
          <h6 className='theme-color'>{ModifyString(productDetail.stock_status, false, '_')}</h6>
        </div>
        {addAction && <ProductBox1Cart productObj={productDetail} />}
      </div>
    </div>
  );
};

export default ProductBox1;
