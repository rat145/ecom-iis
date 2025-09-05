'use client';
import { useContext, useEffect } from 'react';
import RomeHomeBanner from './RomeHomeBanner';
import { useQuery } from '@tanstack/react-query';
import request from '@/utils/axiosUtils';
import { HomePageAPI } from '@/utils/axiosUtils/API';
import ShopCategory from './ShopCategory';
import BestValueBanner from './BestValueBanner';
import FilterProduct from './filterProduct';
import TwoBanner from './TwoBanner';
import TopSelling from '../tokyoTheme/topSelling';
import RomeFullBanner from './RomeFullBanner';
import TopProducts from './TopProducts';
import RomeFeatureBlog from './RomeFeatureBlog';
import RomeNewsLetter from './RomeNewsLetter';
import StickyCart from '@/layout/stickyCart';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import ProductIdsContext from '@/helper/productIdsContext';
import Loader from '@/layout/loader';

const RomeTheme = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { setGetProductIds, isLoading: productLoader } = useContext(ProductIdsContext);
  const { data, isLoading, refetch, fetchStatus } = useQuery({queryKey: ['rome'], queryFn: () => request({ url: `${HomePageAPI}/rome` }), enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data });
  useEffect(() => {
    document.documentElement.style.setProperty('--theme-color', '#0baf9a');
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
      {<RomeHomeBanner dataAPI={data?.content} />}

      {data?.content?.categories_image_list?.status && <ShopCategory dataAPI={data?.content?.categories_image_list} />}

      {data?.content?.value_banners?.status && data?.content?.value_banners?.banners?.length > 0 && <BestValueBanner dataAPI={data?.content?.value_banners} />}

      {data?.content?.categories_products?.status && data?.content?.categories_products?.category_ids.length > 0 && <FilterProduct dataAPI={data?.content?.categories_products} />}

      {data?.content?.two_column_banners?.status && <TwoBanner dataAPI={data?.content?.two_column_banners} />}

      {data?.content?.slider_products?.status && <TopSelling dataAPI={data?.content?.slider_products} classes={{ boxClass: 'category-menu' }} />}

      {data?.content?.full_width_banner?.status && <RomeFullBanner dataAPI={data?.content?.full_width_banner} />}

      {data?.content?.products_list_1?.status && data?.content?.products_list_1?.product_ids?.length > 0 && <TopProducts dataAPI={data?.content} />}

      {data?.content?.featured_blogs?.status && data?.content?.featured_blogs?.blog_ids?.length > 0 && <RomeFeatureBlog dataAPI={data?.content} />}

      {data?.content?.news_letter?.status && <RomeNewsLetter dataAPI={data?.content?.news_letter} />}
      {themeOption?.general?.sticky_cart_enable && themeOption?.general?.cart_style !== 'cart_sidebar' && <StickyCart />}
    </>
  );
};

export default RomeTheme;
