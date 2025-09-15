import React, { useContext } from 'react';
import { Col, ModalFooter, Row } from 'reactstrap';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';
import SimpleInputField from '@/components/common/inputFields/SimpleInputField';
import Btn from '@/elements/buttons/Btn';

const UpdatePasswordForm = ({ isLoading, setModal }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <Row>
      <SimpleInputField
        nameList={[
          { name: 'current_password', placeholder: t('EnterCurrentPassword'), toplabel: 'Current Password', colprops: { xs: 12 }, require: 'true', type: 'password' },
          { name: 'password', placeholder: t('EnterPassword'), toplabel: 'New Password', colprops: { xs: 12 }, require: 'true', type: 'password' },
          { name: 'password_confirmation', placeholder: t('EnterPasswordConfirmation'), toplabel: 'Confirm Password', colprops: { xs: 12 }, require: 'true', type: 'password' },
        ]}
      />
      <Col xs={12}>
      <ModalFooter className='ms-auto justify-content-end save-back-button pt-0'>
        <Btn className='btn btn-md btn-theme-outline fw-bold' title='Cancel' onClick={() => setModal(false)} />
        <Btn className='btn-md fw-bold text-light theme-bg-color' type='submit' title='Submit' loading={Number(isLoading)} />
      </ModalFooter>
      </Col>
    </Row>
  );
};

export default UpdatePasswordForm;
