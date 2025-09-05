"use client";
import React, { useContext, useEffect, useState } from 'react';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SubLayout from './SubLayout';
import ThemeOptionProvider from '@/helper/themeOptionsContext/ThemeOptionProvider';
import SettingProvider from '@/helper/settingContext/SettingProvider';
import ProductProvider from '@/helper/productContext/ProductProvider';
import I18NextContext from '@/helper/i18NextContext';
import CategoryProvider from '@/helper/categoryContext/CategoryProvider';
import AccountProvider from '@/helper/accountContext/AccountProvider';
import CartProvider from '@/helper/cartContext/CartProvider';
import { ToastContainer } from 'react-toastify';
import BlogProvider from '@/helper/blogContext/BlogProvider';
import CompareProvider from '@/helper/compareContext/CompareProvider';
import ProductIdsProvider from '@/helper/productIdsContext/ProductIdsProvider';
import CurrencyProvider from '@/helper/currencyContext/CurrencyProvider';

const MainLayout = ({ children, lng  }) => {
  const { i18Lang, setI18Lang } = useContext(I18NextContext);
  const [queryClient] = useState(() => new QueryClient());
  useEffect(() => {
    if (i18Lang == '') {
      setI18Lang(lng);
    }
  }, [lng]);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={children.dehydratedState}>
          <ThemeOptionProvider>
            <AccountProvider>
              <BlogProvider>
                <ProductIdsProvider>
                  <CompareProvider>
                    <CartProvider>
                      <CategoryProvider>
                        <ProductProvider>
                          <SettingProvider>
                            <CurrencyProvider>
                              <SubLayout children={children}  />
                            </CurrencyProvider>
                          </SettingProvider>
                        </ProductProvider>
                      </CategoryProvider>
                    </CartProvider>
                  </CompareProvider>
                </ProductIdsProvider>
              </BlogProvider>
            </AccountProvider>
          </ThemeOptionProvider>
        </HydrationBoundary>
      </QueryClientProvider>
      <ToastContainer theme='colored' />
    </>
  );
};

export default MainLayout;
