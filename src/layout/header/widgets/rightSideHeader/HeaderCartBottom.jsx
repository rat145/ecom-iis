import { useContext, useMemo, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { Progress } from 'reactstrap';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { RiShoppingCartLine, RiTruckLine } from 'react-icons/ri';
import CartVariationModal from './CartVariationModal';
import SettingContext from '@/helper/settingContext';
import CartContext from '@/helper/cartContext';
import SelectedCart from './SelectedCart';
import ThemeOptionContext from '@/helper/themeOptionsContext';

const HeaderCartBottom = ({ modal, setModal, shippingFreeAmt, shippingCal }) => {
  const { convertCurrency } = useContext(SettingContext);
  const { setCartCanvas } = useContext(ThemeOptionContext);
  const [selectedVariation, setSelectedVariation] = useState('');
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { cartProducts, getTotal } = useContext(CartContext);
  const isAuth = Cookies.get('uat');
  // Getting total when cartProducts changes
  const total = useMemo(() => {
    return getTotal(cartProducts);
  }, [cartProducts, modal]);
  return (
    <>
      {cartProducts?.length > 0 && (
        <>
          <div className='pere-text-box success-box'>
            {shippingFreeAmt > getTotal(cartProducts) ? (
              <p>
                {t('Spend')} <span className='shipping'>{convertCurrency(shippingFreeAmt - getTotal(cartProducts))}</span> {t('MoreAndEnjoy')} <span className='shipping'>{t('FreeShipping!')}</span>
              </p>
            ) : (
              <p>
                <span className='shipping'>{t('Congratulations')}!</span> {t('EnjoyFreeShippingOnUs')}!
              </p>
            )}
            <Progress multi>
              {shippingCal <= 30 ? (
                <Progress striped animated color='danger' value={shippingCal}>
                  <div className='progress-icon'>
                    <RiTruckLine />
                  </div>
                </Progress>
              ) : shippingCal >= 31 && shippingCal <= 80 ? (
                <Progress striped animated color='warning' value={shippingCal}>
                  <div className='progress-icon'>
                    <RiTruckLine />
                  </div>
                </Progress>
              ) : (
                <Progress striped animated value={shippingCal}>
                  <div className='progress-icon'>
                    <RiTruckLine />
                  </div>
                </Progress>
              )}
            </Progress>
          </div>
          <SelectedCart setSelectedVariation={setSelectedVariation} setModal={setModal} modal={modal} />
        </>
      )}
      <CartVariationModal modal={modal} setModal={setModal} selectedVariation={selectedVariation} />
      {!cartProducts?.length && (
        <div className='empty-cart-box'>
          <div className='empty-icon'>
            <RiShoppingCartLine />
          </div>
          <h5>{'Your cart is currently empty.'}</h5>
        </div>
      )}
      {cartProducts?.length ? (
        <div className='bottom-box'>
          <p className='free'>{t('ShippingAndTaxesAreComputedAtCheckout')}.</p>
          <>
            <div className='price-box'>
              <h5>{t('Total')} :</h5>
              <h4 className='theme-color fw-bold'>{convertCurrency(total)}</h4>
            </div>
            <div className='button-group'>
              <Link href={`/${i18Lang}/cart`} className='btn btn-sm cart-button' onClick={() => setCartCanvas('')}>
                {t('ViewCart')}
              </Link>
              <Link href={isAuth ? `/${i18Lang}/checkout` : `/${i18Lang}/auth/login`} className='btn btn-sm cart-button theme-bg-color text-white' onClick={() => setCartCanvas('')}>
                {t('Checkout')}
              </Link>
            </div>
          </>
        </div>
      ) : null}
    </>
  );
};

export default HeaderCartBottom;
