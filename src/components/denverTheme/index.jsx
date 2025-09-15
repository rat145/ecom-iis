'use client';
import { useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import request from '@/utils/axiosUtils';
import { HomePageAPI } from '@/utils/axiosUtils/API';
import DenverHomeBanner from './DenverHomeBanner';
import WrapperComponent from '../common/WrapperComponent';
import ProductSection2 from '../parisTheme/productSections/ProductSection2';
import { osakaCategoryOption, osakaSliderOption } from '../../data/SliderSettings';
import ProductWrapper from '../madridTheme/ProductWrapper';
import OtherDenverSection from './OtherDenverSection';
import StickyCart from '@/layout/stickyCart';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import ProductIdsContext from '@/helper/productIdsContext';
import Loader from '@/layout/loader';

const DenverTheme = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { setGetProductIds, isLoading: productLoader } = useContext(ProductIdsContext);
  const { data, isLoading, refetch, fetchStatus } = useQuery({queryKey: ['denver'], queryFn: () => request({ url: `${HomePageAPI}/denver` }),
    enabled: false,
    refetchOnWindowFocus: false,
    select: (res) => res?.data,
  });

  useEffect(() => {
    document.documentElement.style.setProperty('--theme-color', '#417394');
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
      <DenverHomeBanner dataAPI={data?.content} />

      {data?.content?.categories_icon_list?.status && (
        <WrapperComponent noRowCol={true}>
          <ProductSection2 dataAPI={data?.content?.categories_icon_list} classes={{ sliderOption: osakaCategoryOption, noCustomClass: true }} />
        </WrapperComponent>
      )}

      {data?.content?.products_list_1?.status && data?.content?.products_list_1?.product_ids.length > 0 && (
        <ProductWrapper
          dataAPI={data?.content?.products_list_1}
          noSectionClass={true}
          noWrapperRowCol={true}
          noCustomClass={true}
          classObj={{ productStyle: 'product-solid', productBoxClass: 'product-box-bg' }}
          customSliderOption={osakaSliderOption}
        />
      )}

      <OtherDenverSection dataAPI={data?.content} />
      {themeOption?.general?.sticky_cart_enable && themeOption?.general?.cart_style !== 'cart_sidebar' && <StickyCart />}
    </>
  );
};

export default DenverTheme;
