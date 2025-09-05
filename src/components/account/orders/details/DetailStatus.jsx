import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import request from '@/utils/axiosUtils';
import { OrderStatusAPI } from '@/utils/axiosUtils/API';
import processingImage from '../../../../../public/assets/images/svg/tracking/processing.svg';
import pendingImage from '../../../../../public/assets/images/svg/tracking/pending.svg';
import shippedImage from '../../../../../public/assets/images/svg/tracking/shipped.svg';
import deliveredImage from '../../../../../public/assets/images/svg/tracking/delivered.svg';
import outForDeliveryImage from '../../../../../public/assets/images/svg/tracking/out-for-delivery.svg';
import cancelledImage from '../../../../../public/assets/images/svg/tracking/cancelled.svg';

const DetailStatus = ({ data }) => {
  const { data: orderStatus } = useQuery({queryKey: [OrderStatusAPI], queryFn: () => request({ url: OrderStatusAPI }),
    enabled: true,
    refetchOnWindowFocus: false,
    select: (res) => res?.data?.data,
  });
  const imageObj = {
    processing: processingImage,
    pending: pendingImage,
    shipped: shippedImage,
    delivered: deliveredImage,
    outForDelivery: outForDeliveryImage,
    cancelled: cancelledImage,
  };
  return (
    <div className='mb-4'>
      <div className='tracking-panel'>
        {data && !data?.sub_orders?.length ? (
          <ul>
            {orderStatus?.length > 0
              ? orderStatus?.map((elem, i) => (
                  <li
                    key={i}
                    className={`${elem?.sequence <= data?.order_status?.sequence ? 'active' : ''} ${
                      (elem?.sequence >= data?.order_status?.sequence && data?.order_status?.slug == 'cancelled') || elem?.slug == 'cancelled' ? 'd-none' : ''
                    }`}>
                    <div className='panel-content'>
                      <div className='icon'>
                        {elem?.slug && (
                          <Image src={elem?.slug == 'out-for-delivery' ? imageObj['outForDelivery'] : imageObj[elem?.slug]} className='img-fluid' alt={elem?.slug} height={40} width={40} />
                        )}
                      </div>
                      <div className='status'>{elem?.name?.replace('_', ' ')}</div>
                    </div>
                  </li>
                ))
              : null}
            {data?.order_status?.slug == 'cancelled' ? (
              <li className='active cancelled-box'>
                <div className='panel-content'>
                  <div className='icon'>
                    <Image src={imageObj[data?.order_status?.slug] || cancelledImage} className='img-fluid' alt='image' height={40} width={40} />
                  </div>
                  <div className='status'>{data?.order_status.name.replace('_', ' ')}</div>
                </div>
              </li>
            ) : null}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default DetailStatus;
