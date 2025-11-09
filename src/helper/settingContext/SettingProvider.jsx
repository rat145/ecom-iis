"use client";

import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import SettingContext from ".";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";

const SettingProvider = (props) => {
  const [selectedCurrency, setSelectedCurrency] = useState({});
  const [settingData, setSettingData] = useState({});
  const [settingObj, setSettingObj] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Default settings structure
  const defaultSettings = {
    general: {
      site_name: "FastKart",
      site_title: "Organic & Grocery Market",
      site_tagline: "Online Grocery Shopping Center",
      default_currency: {
        symbol: "$",
        symbol_position: "before_price",
        exchange_rate: 1,
        code: "USD",
      },
    },
    maintenance: {
      maintenance_mode: false,
    },
    email: {
      mail_from_name: "FastKart",
      mail_from_address: "noreply@fastkart.com",
    },
  };

  // Load settings from Firestore
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);

      // Try to load settings from Firestore
      const settingsDoc = await getDoc(doc(db, "settings", "site_settings"));

      if (settingsDoc.exists()) {
        const data = settingsDoc.data();

        // Check maintenance mode
        if (data?.maintenance?.maintenance_mode) {
          Cookies.set("maintenance", JSON.stringify(true));
        } else {
          Cookies.remove("maintenance");
        }

        setSettingData(data);
        setSettingObj(data);
      } else {
        // Use default settings if no settings document exists
        console.log("No settings found in Firestore, using defaults");
        setSettingData(defaultSettings);
        setSettingObj(defaultSettings);
      }
    } catch (error) {
      console.error("Error loading settings:", error);
      // Fallback to default settings on error
      setSettingData(defaultSettings);
      setSettingObj(defaultSettings);
    } finally {
      setIsLoading(false);
    }
  };

  // Refetch settings
  const refetch = () => {
    loadSettings();
  };

  // Convert Currency as per Exchange Rate
  const convertCurrency = useCallback(
    (value) => {
      const position = selectedCurrency?.symbol_position
        ? selectedCurrency?.symbol_position
        : settingObj?.general?.default_currency?.symbol_position ||
          "before_price";

      const symbol = selectedCurrency?.symbol
        ? selectedCurrency?.symbol
        : settingObj?.general?.default_currency?.symbol || "$";

      let amount = Number(value);
      amount =
        amount *
        (selectedCurrency?.exchange_rate
          ? selectedCurrency?.exchange_rate
          : settingObj?.general?.default_currency?.exchange_rate || 1);

      if (position === "before_price") {
        return `${symbol} ${amount.toFixed(2)}`;
      } else {
        return `${amount.toFixed(2)} ${symbol}`;
      }
    },
    [settingObj, selectedCurrency]
  );

  return (
    <SettingContext.Provider
      value={{
        ...props,
        settingData,
        settingObj,
        isLoading,
        convertCurrency,
        selectedCurrency,
        setSelectedCurrency,
        refetch,
      }}
    >
      {props.children}
    </SettingContext.Provider>
  );
};

export default SettingProvider;
