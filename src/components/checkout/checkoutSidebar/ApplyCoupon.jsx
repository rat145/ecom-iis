import React, { useContext, useState } from 'react';
import { Input } from 'reactstrap';
import Image from 'next/image';
import SettingContext from '@/helper/settingContext';
import Btn from '@/elements/buttons/Btn';
import { useTranslation } from '@/app/i18n/client';
import I18NextContext from '@/helper/i18NextContext';
import OfferImage from '../../../../public/assets/images/offer.gif';

const ApplyCoupon = ({ setFieldValue, setStoreCoupon, storeCoupon }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const { convertCurrency } = useContext(SettingContext);

  const onCouponApply = (value) => {
    setStoreCoupon(value);
  };
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setFieldValue('coupon', '');
    setStoreCoupon('');
  };
  return (
    <>
      {appliedCoupon == 'applied' ? (
        <li className='coupon-sec'>
          <div className='apply-sec mb-3'>
            <div>
              <Image src={OfferImage} className='img-fluid' height={20} width={20} alt='offer' />
              <h4>
                {t('YouSaved')} <span>{convertCurrency(10)}</span> {t('WithThisCode')} 🎉 <p>{t('CouponApplied')}</p>
              </h4>
            </div>
            <a onClick={() => removeCoupon()}>{t('Remove')}</a>
          </div>
        </li>
      ) : (
        <li className='coupon-sec'>
          <div className='coupon-box mt-2 mb-3 d-flex w-100'>
            <div className='input-group'>
              <Input type='text' placeholder={t('EnterCoupon')} onChange={(e) => onCouponApply(e.target.value)} />
              <Btn className='btn-apply' onClick={() => storeCoupon !== '' && setAppliedCoupon('applied')}>
                {t('Apply')}
              </Btn>
            </div>
          </div>
        </li>
      )}
    </>
  );
};

export default ApplyCoupon;
