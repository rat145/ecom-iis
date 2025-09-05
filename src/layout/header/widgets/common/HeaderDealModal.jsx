'use client';
import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { ModalBody, ModalHeader } from 'reactstrap';
import Avatar from '@/components/common/Avatar';
import Btn from '@/elements/buttons/Btn';
import { placeHolderImage } from '../../../../data/CommonPath';
import CustomModal from '@/components/common/CustomModal';
import ProductContext from '@/helper/productContext';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';
import SettingContext from '@/helper/settingContext';
import { usePathname } from 'next/navigation';

const HeaderDealModal = ({ setModal, modal, data }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { convertCurrency } = useContext(SettingContext);
  const { productAPIData, setTotalDealIds, productRefetch } = useContext(ProductContext);
  const path =usePathname()
  useEffect(() => {
    data?.length > 0 && setTotalDealIds(Array.from(new Set(data))?.join(','));
    let timer = setTimeout(() => {
      productRefetch();
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, [data]); 
   useEffect(() => {
    setModal(false)
  }, [path]);
  return (
    <CustomModal modal={modal} setModal={setModal} classes={{ modalClass: 'theme-modal deal-modal modal-dialog modal-dialog-centered modal-fullscreen-sm-down', customChildren: true }}>
      <ModalHeader>
        <div>
          <h5 className='modal-title w-100'>{t('DealToday')}</h5>
          <p className='mt-1 text-content'>{t('RecommendedDealsForYou')}.</p>
        </div>
        <Btn type='button' className='btn-close' onClick={() => setModal(false)}></Btn>
      </ModalHeader>
      <ModalBody>
        <div className='deal-offer-box'>
          <ul className='deal-offer-list'>
            {productAPIData?.data
              ?.filter((elem) => data?.includes(elem.id))
              .map((result, i) => (
                <li className='list-1' key={i} >
                  <div className='deal-offer-contain'>
                    <Link href={`/${i18Lang}/product/${result?.slug}`} className='deal-image'>
                      <Avatar data={result?.product_thumbnail} placeHolder={placeHolderImage} name={result?.name} height={80} width={80} />
                    </Link>

                    <Link href={`/${i18Lang}/product/${result?.slug}`} className='deal-contain'>
                      <h5>{result?.name}</h5>
                      <h6>
                        {convertCurrency(result?.sale_price)} <del>{convertCurrency(result?.price)}</del> <span>{result?.unit}</span>
                      </h6>
                    </Link>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </ModalBody>
    </CustomModal>
  );
};

export default HeaderDealModal;
