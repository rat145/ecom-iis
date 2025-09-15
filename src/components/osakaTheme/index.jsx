'use client';
import { useContext, useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import { useQuery } from '@tanstack/react-query';
import request from '@/utils/axiosUtils';
import { HomePageAPI } from '@/utils/axiosUtils/API';
import HomeBannerOsaka from './HomeBannerOsaka';
import BannerSection from './BannerSection';
import ProductSection2 from '../parisTheme/productSections/ProductSection2';
import TopSelling from '../tokyoTheme/topSelling';
import NewsLetter from '../parisTheme/NewsLetter';
import FeatureBlog from '../parisTheme/FeatureBlog';
import CustomHeading from '../common/CustomHeading';
import { osakaCategoryOption, osakaFeatureBlogOption } from '../../data/SliderSettings';
import MiddleContent from './MiddleContent';
import WrapperComponent from '../common/WrapperComponent';
import { LeafSVG } from '../common/CommonSVG';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import StickyCart from '@/layout/stickyCart';
import ProductIdsContext from '@/helper/productIdsContext';
import Loader from '@/layout/loader';

const OsakaTheme = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { setGetProductIds, isLoading: productLoader } = useContext(ProductIdsContext);
  const { data, isLoading, refetch, fetchStatus } = useQuery({queryKey: ['osaka'], queryFn: () => request({ url: `${HomePageAPI}/osaka` }),
    enabled: false,
    refetchOnWindowFocus: false,
    select: (res) => res?.data,
  });
  useEffect(() => {
    refetch();
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
      <HomeBannerOsaka dataAPI={data?.content?.home_banner} />

      {data?.content?.categories_icon_list.status && (
        <WrapperComponent noRowCol={true}>
          <ProductSection2
            isHeadingVisible={true}
            dataAPI={data?.content?.categories_icon_list}
            svgUrl={<LeafSVG className='icon-width' />}
            classes={{ sliderOption: osakaCategoryOption, noCustomClass: true }}
          />
        </WrapperComponent>
      )}

      {data?.content?.coupons?.status && <BannerSection dataAPI={data?.content?.coupons} />}

      <MiddleContent dataAPI={data?.content} />

      {data?.content?.slider_products?.status && <TopSelling dataAPI={data?.content?.slider_products} classes={{ boxClass: 'category-menu', colClass: { sm: 6, xl: 4, xxl: 3 } }} />}

      {data?.content?.featured_blogs?.status && data?.content?.featured_blogs?.blog_ids?.length > 0 && (
        <WrapperComponent noRowCol={true}>
          <CustomHeading title={data?.content?.featured_blogs?.title} subTitle={data?.content?.featured_blogs?.description} svgUrl={<LeafSVG className='icon-width' />} />
          <Row>
            <Col xs={12}>
              <FeatureBlog dataAPI={data?.content?.featured_blogs} classes={{ sliderClass: 'slider-5 ratio_87', sliderOption: osakaFeatureBlogOption, height: 238, width: 417 }} />
            </Col>
          </Row>
        </WrapperComponent>
      )}

      {data?.content?.news_letter?.status && <NewsLetter dataAPI={data?.content?.news_letter} />}
      {themeOption?.general?.sticky_cart_enable && themeOption?.general?.cart_style !== 'cart_sidebar' && <StickyCart />}
    </>
  );
};

export default OsakaTheme;
