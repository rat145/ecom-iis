import request from "@/utils/axiosUtils";
import { SettingAPI } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import SettingContext from ".";

const SettingProvider = (props) => {
  const [selectedCurrency, setSelectedCurrency] = useState({});
  const [settingData, setSettingData] = useState({});
  const [settingObj, setSettingObj] = useState({});
  const { data, isLoading, refetch } = useQuery({ queryKey: [SettingAPI], queryFn: () => request({ url: SettingAPI }), enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data?.values });
  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    if (data) {
      if (data?.maintenance?.maintenance_mode) {
        Cookies.set("maintenance", JSON.stringify(true));
      } else {
        Cookies.remove("maintenance");
      }
      setSettingData(data);
      setSettingObj(data);
    }
  }, [isLoading]);

  // Convert Currency as per Exchange Rate
  const convertCurrency = useCallback(
    (value) => {
      let position = selectedCurrency?.symbol_position ? selectedCurrency?.symbol_position : settingObj?.general?.default_currency?.symbol_position || "before_price";
      let symbol = selectedCurrency?.symbol ? selectedCurrency?.symbol : settingObj?.general?.default_currency?.symbol || "$";
      let amount = Number(value);
      amount = amount * (selectedCurrency?.exchange_rate ? selectedCurrency?.exchange_rate : settingObj?.general?.default_currency?.exchange_rate);
      if (position == "before_price") {
        return `${symbol} ${amount.toFixed(2)}`;
      } else return `${amount.toFixed(2)} ${symbol}`;
    },
    [settingObj, selectedCurrency]
  );
  return <SettingContext.Provider value={{ ...props, settingData, convertCurrency, selectedCurrency, setSelectedCurrency }}>{props.children}</SettingContext.Provider>;
};
export default SettingProvider;
