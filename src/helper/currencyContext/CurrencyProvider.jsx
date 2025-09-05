import React, { useEffect, useState } from 'react';
import CurrencyContext from '.';
import { CurrencyAPI } from '@/utils/axiosUtils/API';
import { useQuery } from '@tanstack/react-query';
import request from '@/utils/axiosUtils';

const CurrencyProvider = (props) => {
  const [currencyState, setCurrencyState] = useState([]);
  const { data, isLoading, refetch } = useQuery({queryKey: [CurrencyAPI], queryFn:() => request({ url: CurrencyAPI }), enabled: true, refetchOnWindowFocus: false, select: (res) => res?.data?.data }); //enabled: true means automatice fetching, Every time the user switches back to the browser tab, the query automatically refetches if refetchWindowFocus is true
  useEffect(() => {
    if (data) {
      setCurrencyState(data);
    }
  }, [isLoading]);

  return <CurrencyContext.Provider value={{ ...props, currencyState }}>{props.children}</CurrencyContext.Provider>;
};

export default CurrencyProvider;
