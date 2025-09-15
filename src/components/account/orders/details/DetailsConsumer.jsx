import { useContext } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import I18NextContext from '@/helper/i18NextContext';
import { ModifyString } from '@/utils/customFunctions/ModifyString';
import { useTranslation } from '@/app/i18n/client';
import SettingContext from '@/helper/settingContext';

const DetailsConsumer = ({ data }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { convertCurrency } = useContext(SettingContext);
  return (
    <>
      <Row>
        <Col xxl={8} lg={12} md={7}>
          <Card>
            <CardBody>
              <h3 className='fw-semibold mb-3'>{t('ConsumerDetails')}</h3>
              <div className='customer-detail tracking-wrapper'>
                <ul className='row g-3'>
                  {data?.billing_address ? (
                    <li className='col-sm-6'>
                      <label>{t('BillingAddress')}:</label>
                      <h4>
                        {data.billing_address.street}
                        {data.billing_address.city} {data.billing_address.state.name} {data.billing_address.country.name}
                        {data.billing_address.pincode} <br></br>
                        {t('Phone')} : +{data.shipping_address.country_code} {data.billing_address.phone}
                      </h4>
                    </li>
                  ) : null}
                  {data?.shipping_address ? (
                    <li className='col-sm-6'>
                      <label>{t('ShippingAddress')}:</label>
                      <h4>
                        {data.shipping_address.street}
                        {data.shipping_address.city} {data.shipping_address.state.name} {data.shipping_address.country.name}
                        {data.shipping_address.pincode} <br></br>
                        {t('Phone')} : +{data.shipping_address.country_code} {data.shipping_address.phone}
                      </h4>
                    </li>
                  ) : null}
                  {data?.delivery_description ? (
                    <li className='col-sm-6'>
                      <label>{t('DeliverySlot')}:</label>
                      <h4>{data.delivery_description}</h4>
                    </li>
                  ) : null}
                  {data?.payment_method ? (
                    <li className='col-3'>
                      <label>{t('PaymentMode')}:</label>
                      <div className='d-flex align-items-center gap-2'>
                        <h4>{ModifyString(data.payment_method, 'upper')}</h4>
                      </div>
                    </li>
                  ) : null}
                   {data?.payment_status ? (
                    <li className='col-3'>
                      <label>{t('PaymentStatus')}:</label>
                      <div className='d-flex align-items-center gap-2'>
                        <h4>{ModifyString(data.payment_status, 'upper')}</h4>
                      </div>
                    </li>
                  ) : null}
                </ul>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xxl={4} lg={12} md={5}>
          <Card className='h-m30'>
            <CardBody>
              <h3 className='fw-semibold mb-3'>{'summary'}</h3>
              <div className='tracking-total tracking-wrapper'>
                <ul>
                  <li>
                    {t('Subtotal')} <span>{convertCurrency(data?.amount ? data?.amount : 0)}</span>
                  </li>
                  <li>
                    {t('Shipping')} <span>{convertCurrency(data?.shipping_total ? data?.shipping_total : 0)}</span>
                  </li>
                  <li>
                    {t('Tax')} <span>{convertCurrency(data?.tax_total ? data?.tax_total : 0)}</span>
                  </li>
                  {data?.points_amount != 0 ? (
                    <li className='txt-primary fw-bold'>
                      {t('Points')} <span>{convertCurrency(data?.points_amount)}</span>
                    </li>
                  ) : null}
                  {data?.wallet_balance != 0 ? (
                    <li className='txt-primary fw-bold'>
                      {t('WalletBalance')}
                      <span>{convertCurrency(data?.wallet_balance)}</span>
                    </li>
                  ) : null}
                  <li>
                    {t('Total')} <span>{convertCurrency(data?.total ? data?.total : 0)}</span>
                  </li>
                </ul>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DetailsConsumer;
