import { Form, Formik } from 'formik';
import { Col, Row } from 'reactstrap';
import DeliveryAddress from './DeliveryAddress';
import DeliveryOptions from './DeliveryOptions';
import PaymentOptions from './PaymentOptions';
import { useContext, useEffect, useState } from 'react';
import AccountContext from '@/helper/accountContext';
import CheckoutSidebar from './checkoutSidebar';

const CheckoutForm = () => {
  const { accountData, refetch } = useContext(AccountContext);
  const [address, setAddress] = useState([]);
  const [modal, setModal] = useState('');
  useEffect(() => {
    accountData?.address.length > 0 && setAddress((prev) => [...accountData?.address]);
  }, [accountData]);
  const addAddress = () => {
    setModal('');
  }
  return (
    <Formik initialValues={{}}>
      {({ values, setFieldValue }) => (
        <Form>
          <div className='pb-4 checkout-section-2'>
            <Row className='g-sm-4 g-3'>
              <Col xxl='8' xl='7'>
                <div className='left-sidebar-checkout'>
                  <div className='checkout-detail-box'>
                    <ul>
                      <DeliveryAddress key='shipping' type='shipping' title={'ShippingAddress'} values={values} updateId={values['consumer_id']} setFieldValue={setFieldValue} address={address} modal={modal} mutate={addAddress} setModal={setModal}
                      />
                      <DeliveryAddress key='billing' type='billing' title={'BillingAddress'} values={values} updateId={values['consumer_id']} setFieldValue={setFieldValue} address={address} modal={modal} mutate={addAddress} setModal={setModal}
                      />
                      <DeliveryOptions values={values} setFieldValue={setFieldValue} />
                      <PaymentOptions values={values} setFieldValue={setFieldValue} />
                    </ul>
                  </div>
                </div>
              </Col>
              <CheckoutSidebar values={values} setFieldValue={setFieldValue} />
            </Row>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CheckoutForm;
