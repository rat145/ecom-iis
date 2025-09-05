import { useContext } from 'react';
import { Form, Formik } from 'formik';
import CustomModal from '@/components/common/CustomModal';
import AccountContext from '@/helper/accountContext';
import { YupObject, nameSchema } from '@/utils/validation/ValidationSchemas';
import EmailPasswordForm from './EmailPasswordForm';
import UpdatePasswordForm from './UpdatePasswordForm';

const EmailPasswordModal = ({ modal, setModal }) => {
  const { accountData, setAccountData } = useContext(AccountContext);
  return (
    <>
      <CustomModal
        modal={modal == 'email' || modal == 'password' ? true : false}
        setModal={setModal}
        classes={{ modalClass: 'theme-modal', modalBodyClass: 'address-form', title: `${modal == 'email' ? 'Edit Profile' : 'ChangePassword'}` }}>
        <Formik
          initialValues={{
            name: accountData?.name || '',
            email: accountData?.email,
            country_code: accountData?.country_code || '91',
            phone: accountData?.phone || '',
            current_password: '',
            password: '',
            password_confirmation: '',
          }}
          validationSchema={YupObject({
            name: nameSchema,
            country_code: nameSchema,
            phone: nameSchema,
            current_password: modal == 'password' && nameSchema,
            password: modal == 'password' && nameSchema,
            password_confirmation: modal == 'password' && nameSchema,
          })}
          onSubmit={(values) => {
            let passwordObj = { current_password: values['current_password'], password: values['password'], password_confirmation: values['password_confirmation'], _method: 'PUT' };
            let emailObj = { name: values['name'], email: values['email'], country_code: values['country_code'], phone: values['phone'], _method: 'PUT' };
            if (modal == 'password') {
              // Add Update password here
              setModal('')
            } else {
              // Add Update password here
              setModal('')
            }
          }}>
          <Form>
            {modal == 'email' && <EmailPasswordForm setModal={setModal} />}
            {modal == 'password' && <UpdatePasswordForm setModal={setModal} />}
          </Form>
        </Formik>
      </CustomModal>
    </>
  );
};

export default EmailPasswordModal;
