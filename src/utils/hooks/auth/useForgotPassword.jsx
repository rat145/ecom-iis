import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import request from '../../axiosUtils';
import { ForgotPasswordAPI } from '../../axiosUtils/API';
import { ToastNotification } from '../../customFunctions/ToastNotification';
import { emailSchema, YupObject } from '../../validation/ValidationSchemas';

export const ForgotPasswordSchema = YupObject({ email: emailSchema });

const useHandleForgotPassword = () => {
  const router = useRouter();
  return useMutation({useMutation: (data) => request({ url: ForgotPasswordAPI, method: 'post', data }),
    onSuccess: (responseData, requestData) => {
      if (responseData.status === 200 || responseData.status === 201) {
        ToastNotification('success', responseData.data.message);
        Cookies.set('ue', requestData.email);
        router.push('/auth/otp-verification');
      }
    },
  });
};
export default useHandleForgotPassword;
