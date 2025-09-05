import { useContext, useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { Input } from 'reactstrap';
import Cookies from 'js-cookie';
import I18NextContext from '@/helper/i18NextContext';
import { ForgotPasswordSchema } from '@/utils/hooks/auth/useForgotPassword';
import { useTranslation } from '@/app/i18n/client';
import useOtpVerification from '@/utils/hooks/auth/useOtpVerification';
import Btn from '@/elements/buttons/Btn';

const OTPVerificationForm = () => {
  const cookies = Cookies.get('ue');
  const [otp, setOtp] = useState('');
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { mutate: otpVerification } = useOtpVerification();
  const handleChange = (e) => {
    if (e.target.value.length <= 5 && !isNaN(Number(e.target.value))) {
      setOtp(e.target.value);
    }
  };
  useEffect(() => {
    otp && otp.length === 5 && otpVerification({ email: cookies, token: otp });
  }, [otp]);
  return (
    <>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={(values) => mutate(values)}>
        {() => (
          <Form className='row g-2'>
            <div className='log-in-title'>
              <h3 className='text-content'>{t('OtpDescription')}</h3>
              <h5 className='text-content'>{t('CodeSend') + ' '}</h5>
            </div>
            <div className='outer-otp'>
              <div className='inner-otp'>
                <Input type='text' className='no-background' maxLength='5' onChange={handleChange} value={otp} />
              </div>
            </div>
            <Btn title={'Validate'} type='button' className="btn-animation mt-3 w-100"/>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default OTPVerificationForm;
