import { useContext } from 'react';
import { Col, Input, Label, Row } from 'reactstrap';
import CustomModal from '@/components/common/CustomModal';
import SettingContext from '@/helper/settingContext';
import { ModifyString } from '@/utils/customFunctions/ModifyString';
import Btn from '@/elements/buttons/Btn';
import { ErrorMessage, Form, Formik } from 'formik';
import { YupObject, nameSchema } from '@/utils/validation/ValidationSchemas';
import { handleModifier } from '@/utils/validation/ModifiedErrorMessage';

const PayNowModal = ({ modal, setModal, params }) => {
  const { settingData } = useContext(SettingContext);
  return (
    <CustomModal modal={modal} setModal={setModal} classes={{ modalClass: 'theme-modal', modalBodyClass: 'address-form', title: `PayNow` }}>
      <Formik
        initialValues={{ payment_method: '' }}
        validationSchema={YupObject({
          payment_method: nameSchema,
        })}
        onSubmit={(values) => {
          // Add your logic here
          values['order_number'] = params;
          setModal(false)
        }}>
        {({ values, setFieldValue }) => (
          <Form>
            <div className='checkout-box'>
              <div className='checkout-detail'>
                <Row className='g-3'>
                  {settingData?.payment_methods?.map((payment, i) => (
                    <Col md={6} key={i}>
                      <div className='payment-option'>
                        <div className='payment-category w-100'>
                          <div className='form-check'>
                            <Input
                              className='form-check-input'
                              type='radio'
                              name='payment_method'
                              value={payment.name}
                              id={payment.name}
                              onChange={() => setFieldValue('payment_method', payment.name)}
                            />
                            <Label className='form-check-label' htmlFor={payment.name}>
                              {ModifyString(payment.name, 'upper')}
                            </Label>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
            <ErrorMessage name={'payment_method'} render={(msg) => <div className='invalid-feedback d-block'>{handleModifier(msg)}</div>} />
            <div className='modal-footer'>
              <Btn title='Cancel' className='btn-md btn-theme-outline fw-bold' onClick={() => setModal(false)} />
              <Btn title='Submit' type='submit' className='btn-md fw-bold text-light theme-bg-color' />
            </div>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};

export default PayNowModal;
