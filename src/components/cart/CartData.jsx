import { useContext } from 'react';
import HandleQuantity from './HandleQuantity';
import CartContext from '@/helper/cartContext';
import CartProductDetail from './CartProductDetail';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';
import SettingContext from '@/helper/settingContext';

const CartData = ({ elem }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { removeCart } = useContext(CartContext);
  const { convertCurrency } = useContext(SettingContext);
  return (
    <tr className='product-box-contain'>
      <CartProductDetail elem={elem} />

      <td className='price'>
        <h4 className='table-title text-content'>{t('Price')}</h4>
        <h5>
          {convertCurrency(elem?.product?.sale_price)} <del className='text-content'>{convertCurrency(elem?.product?.price)}</del>
        </h5>
        <h6 className='saving theme-color'>
          {t('Saving')} : {convertCurrency(Number((elem?.variation?.price ?? elem?.product?.price) - (elem?.variation?.sale_price ?? elem?.product?.sale_price)))}
        </h6>
      </td>

      <td className='quantity'>
        <h4 className='table-title text-content'>{t('Qty')}</h4>
        <HandleQuantity productObj={elem?.product} classes={{ customClass: 'quantity-price' }} elem={elem} />
      </td>

      <td className='subtotal'>
        <h4 className='table-title text-content'>{t('Total')}</h4>
        <h5>{convertCurrency(elem?.sub_total)}</h5>
      </td>

      <td className='save-remove'>
        <h4 className='table-title text-content'>{t('Action')}</h4>
        <a className='save notifi-wishlist'>{t('SaveForLater')}</a>
        <a className='remove close_button' onClick={() => removeCart(elem.product_id, elem?.id)}>
          {t('Remove')}
        </a>
      </td>
    </tr>
  );
};

export default CartData;
