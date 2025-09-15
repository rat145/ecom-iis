'use client';
import { useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/layout/loader';
import request from '@/utils/axiosUtils';
import MadridHomeBanner from './MadridHomeBanner';
import { HomePageAPI } from '@/utils/axiosUtils/API';
import HomeBanner from '../parisTheme/HomeBanner';
import ShopCategory from './ShopCategory';
import ProductWrapper from './ProductWrapper';
import BankOfferBanner from './BankOfferBanner';
import DealProduct from './dealProducts';
import GiftBanner from './GiftBanner';
import OtherSection from './OtherSection';
import StickyCart from '@/layout/stickyCart';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import ProductIdsContext from '@/helper/productIdsContext';
import { madridFullSlider } from '../../data/SliderSettings';

const MadridTheme = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { setGetProductIds, isLoading: productLoader } = useContext(ProductIdsContext);
  const { data, isLoading, refetch, fetchStatus } = useQuery({queryKey: ['madrid'], queryFn: () => request({ url: `${HomePageAPI}/madrid` }),
    enabled: false,
    refetchOnWindowFocus: false,
    select: (res) => res?.data,
  });
  useEffect(() => {
    document.documentElement.style.setProperty('--theme-color', '#239698');
    refetch();
    return () => {
      document.documentElement.style.removeProperty('--theme-color');
    };
  }, []);

  useEffect(() => {
    if (!isLoading && fetchStatus == 'fetching') {
      document.body.classList.add('skeleton-body');
    } else {
      document.body.classList.remove('skeleton-body');
    }

    if (data?.content?.products_ids?.length > 0) {
      setGetProductIds({ ids: Array.from(new Set(data?.content?.products_ids))?.join(',') });
    }
  }, [fetchStatus == 'fetching', !isLoading]);
  if (isLoading) return <Loader />;
  return (
    <>
      <MadridHomeBanner dataAPI={data?.content?.home_banner?.main_banner} />

      {data?.content?.featured_banners?.banners?.length > 0 && data?.content?.featured_banners?.banners?.length >= 4 && <HomeBanner bannersData={data?.content?.featured_banners?.banners} />}

      {data?.content?.categories_image_list?.status && <ShopCategory dataAPI={data?.content?.categories_image_list} />}

      {data?.content?.products_list_1?.status && (
        <ProductWrapper
          dataAPI={data?.content?.products_list_1}
          noCustomClass={false}
          titleClass='title'
          customSliderOption={madridFullSlider}
          classObj={{ productStyle: 'product-standard theme-plus', productBoxClass: 'product-box-bg' }}
        />
      )}

      {data?.content?.bank_wallet_offers?.offers?.length > 0 && data?.content?.bank_wallet_offers?.status && <BankOfferBanner dataAPI={data?.content?.bank_wallet_offers} />}

      {data?.content?.product_with_deals?.status && <DealProduct dataAPI={data?.content?.product_with_deals} />}

      {data?.content?.full_width_banner?.status && <GiftBanner dataAPI={data?.content?.full_width_banner} />}

      <OtherSection dataAPI={data?.content} />
      {themeOption?.general?.sticky_cart_enable && themeOption?.general?.cart_style !== 'cart_sidebar' && <StickyCart />}
    </>
  );
};

export default MadridTheme;
