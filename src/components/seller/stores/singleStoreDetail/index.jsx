'use client';
import { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import request from '@/utils/axiosUtils';
import { StoreAPI } from '@/utils/axiosUtils/API';
import SellerDetailBasic from './SellerDetailBasic';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import { useCustomSearchParams } from '@/utils/hooks/useCustomSearchParams';
import SellerDetailClassic from './SellerDetailClassic';
import Breadcrumb from '@/components/common/Breadcrumb';
import { ModifyString } from '@/utils/customFunctions/ModifyString';
import Loader from '@/layout/loader';

const SingleStoreDetail = ({ params }) => {
  const { data: StoreData, isLoading, refetch } = useQuery({queryKey: [params], queryFn: () => request({ url: `${StoreAPI}/slug/${params}` }), enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data });
  useEffect(() => {
    params && refetch();
  }, [params]);

  const [filter, setFilter] = useState({ category: [], price: [], attribute: [], rating: [], sortBy: '', field: '' });
  const { themeOption } = useContext(ThemeOptionContext);
  const [category, attribute, price, rating, sortBy, field, layout] = useCustomSearchParams(['category', 'attribute', 'price', 'rating', 'sortBy', 'field', 'layout']);
  const sellerDetailLayout = layout?.layout ? layout?.layout : themeOption?.collection?.collection_layout;

  useEffect(() => {
    setFilter((prev) => {
      return {
        ...prev,
        category: category ? category?.category?.split(',') : [],
        attribute: attribute ? attribute?.attribute?.split(',') : [],
        price: price ? price?.price?.split(',') : [],
        rating: rating ? rating?.rating?.split(',') : [],
        sortBy: sortBy ? sortBy?.sortBy : '',
        field: field ? field?.field : '',
      };
    });
  }, [category, attribute, price, rating, sortBy, field]);
  const storeName = ModifyString(params, false, '-');
  if (isLoading) return <Loader />;
  return (
    <>
      <Breadcrumb title={storeName} subNavigation={[{ name: 'SellerStores' }, { name: storeName }]} />
      {sellerDetailLayout == 'basic_store_details' ? (
        <SellerDetailBasic filter={filter} setFilter={setFilter} StoreData={StoreData} />
      ) : sellerDetailLayout == 'classic_store_details' ? (
        <SellerDetailClassic filter={filter} setFilter={setFilter} StoreData={StoreData} />
      ) : (
        <SellerDetailBasic filter={filter} setFilter={setFilter} StoreData={StoreData} />
      )}
    </>
  );
};
export default SingleStoreDetail;
