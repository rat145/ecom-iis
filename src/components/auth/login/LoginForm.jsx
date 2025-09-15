import { Form, Formik } from 'formik';
import Link from 'next/link';
import { Col, Input, Label } from 'reactstrap';
import FormBtn from '@/components/common/FormBtn';
import SimpleInputField from '@/components/common/inputFields/SimpleInputField';
import useHandleLogin, { LogInSchema } from '@/utils/hooks/auth/useLogin';
import { useContext } from 'react';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';

const LoginForm = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { mutate, isLoading } = useHandleLogin();
  return (
    <Formik
      initialValues={{
        email: 'john.customer@example.com',
        password: '123456789',
      }}
      validationSchema={LogInSchema}
      onSubmit={mutate}>
      {() => (
        <Form className='row g-4'>
          <SimpleInputField
            nameList={[
              { name: 'email', placeholder: t('EmailAddress'), title: 'Email', label: 'Email Address' },
              { name: 'password', placeholder: t('EnterPassword'), type: 'password', title: 'Password', label: 'Password' },
            ]}
          />

          <Col xs={12}>
            <div className='forgot-box'>
              <div className='form-check remember-box'>
                <Input className='checkbox_animated check-box' type='checkbox' id='flexCheckDefault' />
                <Label className='form-check-label' htmlFor='flexCheckDefault'>
                  {t('RememberMe')}
                </Label>
              </div>
              <Link href={`/${i18Lang}/auth/forgot-password`} className='forgot-password'>
                {t('ForgotPassword')}?
              </Link>
            </div>
          </Col>
          <FormBtn title={'LogIn'} classes={{ btnClass: 'btn btn-animation w-100' }} loading={isLoading} />
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
