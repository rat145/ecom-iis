import { useContext } from 'react';
import { Form, Formik } from 'formik';
import CustomModal from '@/components/common/CustomModal';
import { placeHolderImage } from '../../../../data/CommonPath';
import Avatar from '@/components/common/Avatar';
import SettingContext from '@/helper/settingContext';
import SimpleInputField from '@/components/common/inputFields/SimpleInputField';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { Label } from 'reactstrap';
import Btn from '@/elements/buttons/Btn';
import { YupObject, nameSchema } from '@/utils/validation/ValidationSchemas';

const RefundModal = ({ modal, setModal, storeData }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { convertCurrency } = useContext(SettingContext);
  return (
    <CustomModal modal={modal ? true : false} setModal={setModal} classes={{ modalClass: 'theme-modal view-modal refund-modal', title: 'Refund' }}>
      <Formik
        initialValues={{ reason: '', payment_type: '', product_id: storeData?.id }}
        validationSchema={YupObject({
          reason: nameSchema,
        })}
        onSubmit={(values) => {
          setModal(false);
        }}>
        {({ values, setFieldValue, errors }) => (
          <Form className='product-review-form'>
            <div className='product-wrapper'>
              <div className='product-image'>
                <Avatar data={storeData?.product_thumbnail ? storeData?.product_thumbnail : placeHolderImage} customImageClass='img-fluid' name={storeData?.name} />
              </div>
              <div className='product-content'>
                <h5 className='name'>{storeData?.name}</h5>
                <div className='product-review-rating'>
                  <div className='product-rating'>
                    <h6 className='price-number'>{convertCurrency(storeData.sale_price)}</h6>
                  </div>
                </div>
              </div>
            </div>

            <div className='review-box'>
              <SimpleInputField nameList={[{ name: 'reason', placeholder: t('EnterReason'), type: 'textarea', toplabel: 'Reason', require: 'true', rows: 3 }]} />
              <Label className='form-label' htmlFor='address1'>
                {t('PaymentOption')}
              </Label>
              <select className='form-control' name='payment_type' onChange={(e) => setFieldValue('payment_type', e.target.value)}>
                <option disabled>{t('SelectPaymentOption')}</option>
                <option value='wallet'>{t('Wallet')}</option>
                <option value='paypal'>{t('Paypal')}</option>
              </select>
            </div>
            <div className='modal-footer'>
              <Btn className='btn-md btn-theme-outline fw-bold' title='Cancel' type='button' onClick={() => setModal('')} />
              <Btn className='btn-md fw-bold text-light theme-bg-color' title='Submit' type='submit' />
            </div>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};

export default RefundModal;
