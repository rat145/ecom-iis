import React, { useContext } from 'react';
import { RiTimeLine } from 'react-icons/ri';
import TopbarSlider from '../common/TopbarSlider';
import Btn from '@/elements/buttons/Btn';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';

const StandardTopbar = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <div className='header-notification theme-bg-color overflow-hidden py-2'>
      <TopbarSlider customClassName='text-center' />
      <Btn className='btn close-notification'>
        <span>{t('Close')}</span> <RiTimeLine />
      </Btn>
    </div>
  );
};

export default StandardTopbar;
