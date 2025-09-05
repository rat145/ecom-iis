import Btn from '@/elements/buttons/Btn';
import AccountContext from '@/helper/accountContext';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { useContext } from 'react';

const ResponsiveMenuOpen = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { mobileSideBar, setMobileSideBar } = useContext(AccountContext);
  
  const { t } = useTranslation(i18Lang, 'common');
  return <Btn className='btn left-dashboard-show btn-animation btn-md fw-bold d-block mb-4 d-lg-none' onClick={()=>setMobileSideBar(!mobileSideBar)}>{t('ShowMenu')}</Btn>;
};

export default ResponsiveMenuOpen;
