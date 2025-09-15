'use client';
import Breadcrumb from '@/components/common/Breadcrumb';
import SellerPoster from './SellerPoster';
import SellerService from './SellerService';
import SellerBusiness from './SellerBusiness';
import SellerSelling from './SellerSelling';

const BecomeSellerContent = () => {
  return (
    <>
      <Breadcrumb title={'BecomeVendor'} subNavigation={[{ name: 'BecomeVendor' }]} />
      <SellerPoster />
      <SellerService />
      <SellerBusiness />
      <SellerSelling />
    </>
  );
};

export default BecomeSellerContent;
