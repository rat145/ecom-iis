import { useEffect, useState } from 'react';
import { RiTimeLine } from 'react-icons/ri';
import Loader from '@/layout/loader';
import request from '@/utils/axiosUtils';
import { NotificationAPI } from '@/utils/axiosUtils/API';
import { dateFormat } from '@/utils/customFunctions/DateFormat';
import { useQuery } from '@tanstack/react-query';
import AccountHeading from '@/components/common/AccountHeading';

const NotificationData = () => {
  const [isRead, setIsRead] = useState('');
  const { data, isLoading } = useQuery({queryKey: [NotificationAPI], queryFn: () => request({ url: NotificationAPI }), enabled: true, refetchOnWindowFocus: false, select: (res) => res?.data?.data });

  useEffect(() => {
    return () => {
      setIsRead('read')
    };
  }, []);
  if (isLoading) return <Loader />;
  return (
    <>
      <AccountHeading title='Notifications' />
      <ul className='notification-list'>
        {data?.map((elem, i) => (
          <li className={!elem?.read_at && isRead !== 'read' ? 'unread' : ''} key={i}>
            <h4>{elem?.data?.message}</h4>
            <h5>
              <RiTimeLine /> {dateFormat(elem?.created_at)}
            </h5>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NotificationData;
