import React, { useContext, useEffect, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { Media } from 'reactstrap';
import Image from 'next/image';
import Link from 'next/link';
import ProductIdsContext from '@/helper/productIdsContext';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { placeHolderImage } from '../../data/CommonPath';

const RecentPurchase = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { filteredProduct } = useContext(ProductIdsContext);

  const [show, setShow] = useState(false);
  const [min, setMin] = useState(10);
  const [popupEnable, setPopupEnable] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    let intervalId;

    if (popupEnable) {
      intervalId = setInterval(() => {
        setShow((prev) => !prev);
        setMin(Math.floor(Math.random() * 60) + 1);
        randomlySelectProduct();
        setTimeout(() => {
          setShow((prev) => !prev);
        }, 5000);
      }, 20000);
    }

    return () => {
      clearInterval(intervalId); // Cleanup the interval on unmount.
    };
  }, [popupEnable]);

  useEffect(() => {
    randomlySelectProduct();
  }, [filteredProduct]);

  const randomlySelectProduct = () => {
    if (!filteredProduct?.length) {
      ('');
    } else {
      const randomIndex = Math.floor(Math.random() * filteredProduct.length);
      setProduct(filteredProduct[randomIndex]);
    }
  };

  if (!popupEnable || !product) {
    return null; // Return null when the popup is not enabled or there's no product to display.
  }
  return (
    <Media className={`recently-purchase ${show ? 'show' : ''}`}>
      <Image src={product?.product_thumbnail ? product?.product_thumbnail.original_url : placeHolderImage} className='media-height' alt={product?.name || 'product'} height={64} width={85} />
      <Media body>
        <div>
          <div className='title d-block mb-0'>{t('SomeoneRecentlyPurchased')}</div>
          {product?.name && (
            <Link href={`/${i18Lang}/product/${product?.slug}`}>
              <span className='product-name'>{product?.name}</span>
            </Link>
          )}
          <small className='timeAgo'>
            {min} {t('MinutesAgo')}
          </small>
        </div>
      </Media>
      <RiCloseLine className='close-popup' onClick={() => setPopupEnable(false)} />
    </Media>
  );
};

export default RecentPurchase;
