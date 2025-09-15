import React, { useContext } from 'react';
import Btn from '@/elements/buttons/Btn';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { useRouter } from 'next/navigation';

const PlaceOrder = ({ values }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const router = useRouter();
  const handleClick = () => {
    router.push(`/${i18Lang}/account/order/details/1000`)
  };
  return (
    <Btn className='btn-md fw-bold mt-4 text-white theme-bg-color w-100' onClick={handleClick}>
      {t('PlaceOrder')}
    </Btn>
  );
};

export default PlaceOrder;
