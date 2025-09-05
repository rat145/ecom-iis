import { useMutation } from '@tanstack/react-query';
import request from '../../axiosUtils';
import { emailSchema, passwordSchema, YupObject } from '../../validation/ValidationSchemas';
import { LoginAPI } from '../../axiosUtils/API';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import I18NextContext from '@/helper/i18NextContext';
import Cookies from 'js-cookie';
import AccountContext from '@/helper/accountContext';
import CompareContext from '@/helper/compareContext';

export const LogInSchema = YupObject({
  email: emailSchema,
  password: passwordSchema,
});

const LoginHandle = (responseData, router, i18Lang, refetch, compareRefetch) => {
  if (responseData.status === 200 || responseData.status === 201) {
    Cookies.set('uat', responseData.data?.access_token, { path: '/', expires: new Date(Date.now() + 24 * 60 * 6000) });
    const ISSERVER = typeof window === 'undefined';
    if (typeof window !== 'undefined') {
      Cookies.set('account', JSON.stringify(responseData.data));
      localStorage.setItem('account', JSON.stringify(responseData.data));
    }
    refetch();
    compareRefetch();
    router.push(`/${i18Lang}/account/dashboard`);
  }
};

const useHandleLogin = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { refetch } = useContext(AccountContext);
  const { refetch: compareRefetch } = useContext(CompareContext);
  const router = useRouter();
  return useMutation({
    mutationFn: (data) =>
      request({
        url: LoginAPI,
        method: 'post',
        data,
      }),
      onSuccess: (responseData) => LoginHandle(responseData, router, i18Lang, refetch, compareRefetch),
    },
  );
};

export default useHandleLogin;
