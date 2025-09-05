import { useContext, useState } from 'react';
import Link from 'next/link';
import { RiEyeLine } from 'react-icons/ri';
import { Table } from 'reactstrap';
import NoDataFound from '@/components/common/NoDataFound';
import Pagination from '@/components/common/Pagination';
import SettingContext from '@/helper/settingContext';
import Loader from '@/layout/loader';
import request from '@/utils/axiosUtils';
import { OrderAPI } from '@/utils/axiosUtils/API';
import { dateFormat } from '@/utils/customFunctions/DateFormat';
import { useQuery } from '@tanstack/react-query';
import emptyImage from '../../../../public/assets/svg/empty-items.svg';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';
import AccountHeading from '@/components/common/AccountHeading';

const MyOrders = () => {
  const [page, setPage] = useState(1);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { convertCurrency } = useContext(SettingContext);
  const { data, isLoading, refetch } = useQuery({queryKey: [page], queryFn: () => request({ url: OrderAPI, params: { page: page, paginate: 10 } }),
    enabled: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    select: (res) => res?.data,
  });
  if (isLoading) return <Loader />;
  return (
    <>
      <AccountHeading title="MyOrders" />
      {data?.data?.length > 0 ? (
        <>
          <div className='total-box mt-0'>
            <div className='wallet-table mt-0'>
              <Table>
                <tbody>
                  <tr>
                    <th>{t('No')}</th>
                    <th>{t('OrderNumber')}</th>
                    <th>{t('Date')}</th>
                    <th>{t('Amount')}</th>
                    <th>{t('PaymentStatus')}</th>
                    <th>{t('PaymentMethod')}</th>
                    <th>{t('Option')}</th>
                  </tr>
                  {data?.data?.map((order, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <span className='fw-bolder'>#{order.order_number}</span>
                      </td>
                      <td>{dateFormat(order?.created_at)}</td>
                      <td>{convertCurrency(order?.total)} </td>
                      <td>
                        <div className={`status-${order.payment_status.toLowerCase()}`}>
                          <span>{order.payment_status}</span>
                        </div>
                      </td>
                      <td>{order.payment_method.toUpperCase()}</td>
                      <td>
                        <Link href={`/${i18Lang}/account/order/details/${order.order_number}`}>
                          <RiEyeLine />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
          <nav className='custome-pagination'>
            <Pagination current_page={data?.current_page} total={data?.total} per_page={data?.per_page} setPage={setPage} />
          </nav>
        </>
      ) : (
        <NoDataFound
          data={{
            customClass: 'no-data-added',
            imageUrl: emptyImage,
            title: 'No Orders Found',
            description: 'No orders have been made yet',
            height: 300,
            width: 300,
          }}
        />
      )}
    </>
  );
};

export default MyOrders;
