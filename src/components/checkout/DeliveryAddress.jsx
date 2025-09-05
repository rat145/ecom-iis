import React, { useContext, useEffect } from 'react';
import { Row } from 'reactstrap';
import { RiAddLine, RiMapPinLine } from 'react-icons/ri';
import { useTranslation } from '@/app/i18n/client';
import CheckoutCard from './common/CheckoutCard';
import CustomModal from '../common/CustomModal';
import AddAddressForm from './common/AddAddressForm';
import I18NextContext from '@/helper/i18NextContext';
import ShowAddress from './ShowAddress';

const DeliveryAddress = ({ type, title, address, modal, mutate, setModal, setFieldValue }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');

  useEffect(() => {
    address?.length > 0 && setFieldValue(`${type}_address_id`, address[0].id);
  }, [address]);
  return (
    <>
      <CheckoutCard icon={<RiMapPinLine />}>
        <div className='checkout-title'>
          <h4>
            {t(title)}
          </h4>
          <a className='d-flex align-items-center fw-bold' onClick={() => setModal(type)}>
            <RiAddLine className='me-1'></RiAddLine>
            {t('AddNew')}
          </a>
        </div>
        <div className='checkout-detail'>
          {
            <>
              {address?.length > 0 ? (
                <Row className='g-4'>
                  {address?.map((item, i) => (
                    <ShowAddress item={item} key={i} type={type} index={i} />
                  ))}
                </Row>
              ) : (
                <div className='empty-box'>
                  <h2>{t('NoAddressFound')}</h2>
                </div>
              )}
            </>
          }
          <CustomModal modal={modal == type ? true : false} setModal={setModal} classes={{ modalClass: 'theme-modal view-modal modal-lg', modalHeaderClass: 'p-0' }}>
            <div className='right-sidebar-box'>
              <AddAddressForm mutate={mutate} setModal={setModal} type={type} />
            </div>
          </CustomModal>
        </div>
      </CheckoutCard>
    </>
  );
};

export default DeliveryAddress;
