import React, { useContext, useEffect, useState } from 'react';
import { Card, Col } from 'reactstrap';
import SettingContext from '../../../helper/settingContext';
import { useTranslation } from '@/app/i18n/client';
import SidebarProduct from './SidebarProduct';
import CartContext from '@/helper/cartContext';
import PointWallet from './PointWallet';
import I18NextContext from '@/helper/i18NextContext';
import ApplyCoupon from './ApplyCoupon';
import PlaceOrder from './PlaceOrder';

const CheckoutSidebar = ({ values, setFieldValue }) => {
  const [storeCoupon, setStoreCoupon] = useState();
  // It Just Static Values as per cart default value (When you are using api then you need calculate as per your requirement)
  const [checkoutData, setCheckoutData] = useState({
    total: {
      convert_point_amount: -10,
      convert_wallet_balance: -84.4,
      coupon_total_discount: 10,
      points: 300,
      points_amount: 10,
      shipping_total: 0,
      sub_total: 35.19,
      tax_total: 2.54,
      total: 37.73,
      wallet_balance: 84.4,
    },
  });
  const { convertCurrency } = useContext(SettingContext);
  const { cartProducts } = useContext(CartContext);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  // Submitting data on Checkout
  useEffect(() => {
    if (values['billing_address_id'] && values['shipping_address_id'] && values['delivery_description'] && values['payment_method']) {
      values['variation_id'] = '';
      delete values['total'];
      values['products'] = cartProducts;
      values['return_url'] = `${process.env.PAYMENT_RETURN_URL}${i18Lang}/account/order/details`;
      values['cancel_url'] = process.env.PAYMENT_CANCEL_URL;
    }
  }, []);

  return (
    <Col xxl='4' xl='5'>
      <Card className='pos-detail-card'>
        <SidebarProduct values={values} setFieldValue={setFieldValue} />
        <div className='pos-loader'>
          <ul className={`summary-total position-relative`}>
            <li>
              <h4>{t('Subtotal')}</h4>
              <h4 className='price'>{checkoutData?.total?.sub_total ? convertCurrency(checkoutData?.total?.sub_total) : t(`NotCalculatedYet`)}</h4>
            </li>
            <li>
              <h4>{t('Shipping')}</h4>
              <h4 className='price'>{checkoutData?.total?.shipping_total >= 0 ? convertCurrency(checkoutData?.total?.shipping_total) : t(`NotCalculatedYet`)}</h4>
            </li>
            <li>
              <h4>{t('Tax')}</h4>
              <h4 className='price'>{checkoutData?.total?.tax_total ? convertCurrency(checkoutData?.total?.tax_total) : t(`NotCalculatedYet`)}</h4>
            </li>

            <PointWallet values={values} setFieldValue={setFieldValue} checkoutData={checkoutData} />

            <ApplyCoupon setFieldValue={setFieldValue} setStoreCoupon={setStoreCoupon} storeCoupon={storeCoupon} />

            <li className='list-total'>
              <h4>{t('Total')}</h4>
              <h4 className='price'>{checkoutData?.total?.total ? convertCurrency(checkoutData?.total?.total) : t(`NotCalculatedYet`)}</h4>
            </li>
          </ul>
        </div>
        <PlaceOrder values={values} />
      </Card>
    </Col>
  );
};

export default CheckoutSidebar;
