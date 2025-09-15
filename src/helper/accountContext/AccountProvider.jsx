import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AccountContext from '.';
import request from '../../utils/axiosUtils';
import { SelfAPI } from '@/utils/axiosUtils/API';

const AccountProvider = (props) => {
  const [mobileSideBar, setMobileSideBar] = useState(false);
  const [accountData, setAccountData] = useState();
  const { data, refetch, isLoading } = useQuery({
    queryKey: [SelfAPI],
    queryFn: () => request({ url: SelfAPI }),
    enabled: true,
    select: (res) => {
      return res?.data;
    },
  });  
  useEffect(() => {
    if (data) {
      setAccountData(data);
    }
  }, [isLoading, data]);

  return <AccountContext.Provider value={{ ...props, accountData, setAccountData, refetch, mobileSideBar, setMobileSideBar }}>{props.children}</AccountContext.Provider>;
};

export default AccountProvider;
