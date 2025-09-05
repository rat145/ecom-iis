import Link from 'next/link';
import { placeHolderImage } from '../../data/CommonPath';
import Avatar from '../common/Avatar';
import { useContext } from 'react';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';

const CartProductDetail = ({ elem }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <td className='product-detail'>
      <div className='product border-0'>
        <Link href={`/${i18Lang}/product/${elem?.product?.slug}`} className='product-image'>
          <Avatar customImageClass={'img-fluid'} data={elem?.variation?.variation_image ?? elem?.product?.product_thumbnail} placeHolder={placeHolderImage} name={elem?.product?.name} />
        </Link>
        <div className='product-detail'>
          <ul>
            <li className='name'>
              <Link href={`/${i18Lang}/product/${elem?.product?.slug}`}>{elem?.variation?.name ?? elem?.product?.name}</Link>
            </li>
            <li className='text-content'>
              <span className='text-title'>{t('SoldBy')} : </span> {t('Fastkart')}
            </li>
            <li className='text-content'>
              <span className='text-title'>{t('Unit')}</span> : {elem?.variation?.unit ?? elem?.product?.unit}
            </li>
          </ul>
        </div>
      </div>
    </td>
  );
};

export default CartProductDetail;
