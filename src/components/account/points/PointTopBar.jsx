import { useContext, useEffect, useState } from 'react';
import { PointAPI } from '@/utils/axiosUtils/API';
import { useQuery } from '@tanstack/react-query';
import request from '@/utils/axiosUtils';
import Loader from '@/layout/loader';
import NoDataFound from '@/components/common/NoDataFound';
import emptyImage from '../../../../public/assets/svg/empty-items.svg';
import PointTable from './PointTable';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';
import AccountHeading from '@/components/common/AccountHeading';

const PointTopBar = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useQuery({queryKey: [PointAPI], queryFn: () => request({ url: PointAPI, params: { page, paginate: 10 } }),
    enabled: false,
    refetchOnWindowFocus: false,
    select: (res) => res?.data,
  });
  useEffect(() => {
    refetch();
  }, [page]);
  if (isLoading) return <Loader />;
  return (
    <>
      <AccountHeading title="Points" />
      {data?.transactions?.data?.length > 0 ? (
        <PointTable data={data} setPage={setPage} />
      ) : (
        <NoDataFound
          data={{
            customClass: 'no-data-added',
            imageUrl: emptyImage,
            title: 'No Transaction Found',
            description: 'You have not earned any points yet',
            height: 300,
            width: 300,
          }}
        />
      )}
    </>
  );
};

export default PointTopBar;
