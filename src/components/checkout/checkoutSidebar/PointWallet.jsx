import { useContext } from 'react';
import { Input, Label } from 'reactstrap';
import AccountContext from '@/helper/accountContext';
import I18NextContext from '@/helper/i18NextContext';
import SettingContext from '@/helper/settingContext';
import { useTranslation } from '@/app/i18n/client';

const PointWallet = ({ values, setFieldValue, checkoutData }) => {
  const { convertCurrency } = useContext(SettingContext);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { accountData } = useContext(AccountContext);
  return (
    <>
      {accountData?.point?.balance > 0 && checkoutData?.total?.convert_point_amount ? (
        <>
          <li>
            <h4 className={`${values['points_amount'] ? 'fw-bold txt-primary' : 'text-muted'}`}>{t('Points')}</h4>
            <h4 className={`${values['points_amount'] ? 'price fw-bold txt-primary' : 'price text-muted'}`}>{convertCurrency(checkoutData?.total?.convert_point_amount || 0)}</h4>
          </li>
          <li className='border-cls'>
            <Label className='form-check-label m-0'>{t('WouldYouPreferToPayUsingPoints')}?</Label>
            <Input
              type='checkbox'
              className='checkbox_animated check-it'
              checked={values['points_amount'] ? true : false}
              onChange={(e) => {
                setFieldValue('points_amount', !values['points_amount']);
              }}
            />
          </li>
        </>
      ) : null}
      {accountData?.wallet?.balance > 0 && checkoutData?.total?.convert_wallet_balance ? (
        <>
          <li>
            <h4 className={`${values['wallet_balance'] ? 'fw-bold txt-primary' : 'text-muted'}`}>{t('WalletBalance')}</h4>
            <h4 className={`${values['wallet_balance'] ? 'price fw-bold txt-primary' : 'price text-muted'}`}>{convertCurrency(checkoutData?.total?.convert_wallet_balance || 0)}</h4>
          </li>
          <li className='border-cls'>
            <Label className='form-check-label m-0'>{t('WouldYouPreferToPayUsingWallet')}?</Label>
            <Input
              type='checkbox'
              className='checkbox_animated check-it'
              onChange={(e) => {
                setFieldValue('wallet_balance', !values['wallet_balance']);
              }}
            />
          </li>
        </>
      ) : null}
    </>
  );
};

export default PointWallet;
