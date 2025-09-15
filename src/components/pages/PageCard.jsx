import React, { useEffect } from 'react';
import Loader from '@/layout/loader';
import request from '@/utils/axiosUtils';
import { PageAPI } from '@/utils/axiosUtils/API';
import { useQuery } from '@tanstack/react-query';

const PageCard = ({ params }) => {
  const { data: Page, isLoading, refetch } = useQuery({queryKey: [params], queryFn: () => request({ url: `${PageAPI}/slug/${params}` }), enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data });
  useEffect(() => {
    params && refetch();
  }, [params]);
  if (isLoading) return <Loader />;
  return <div dangerouslySetInnerHTML={{ __html: Page?.content }} />;
};

export default PageCard;
