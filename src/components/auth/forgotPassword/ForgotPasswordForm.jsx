import { useContext } from 'react';
import { Form, Formik } from 'formik';
import FormBtn from '@/components/common/FormBtn';
import SimpleInputField from '@/components/common/inputFields/SimpleInputField';
import I18NextContext from '@/helper/i18NextContext';
import useHandleForgotPassword, { ForgotPasswordSchema } from '@/utils/hooks/auth/useForgotPassword';
import { useTranslation } from '@/app/i18n/client';

const ForgotPasswordForm = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { mutate, isLoading } = useHandleForgotPassword();
  return (
    <>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={(values) => mutate(values)}>
        {() => (
          <Form className='row g-4'>
            <SimpleInputField nameList={[{ name: 'email', placeholder: t('EmailAddress'), title: 'Email', label: 'Email Address' }]} />
            <FormBtn title={'ForgotPassword'} classes={{ btnClass: 'btn-animation w-100 justify-content-center' }} loading={isLoading} />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ForgotPasswordForm;
