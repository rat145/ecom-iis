import I18NextContext from '@/helper/i18NextContext';
import ProductIdsContext from '@/helper/productIdsContext';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';

const VegetableBanner = ({ dataAPI }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { filteredProduct } = useContext(ProductIdsContext);
  const redirectToProduct = (productId) => {
    const product = filteredProduct.find((elem) => elem?.id == productId);
    return 'product/' + product?.slug;
  };
  return (
    <div className='section-t-space'>
      {dataAPI?.main_content?.section8_full_width_banner?.redirect_link?.link_type === 'external_url' ? (
        <Link href={dataAPI?.main_content?.section8_full_width_banner?.redirect_link?.link || '/'} target='_blank'>
          <div className='banner-contain hover-effect'>
            <Image src={dataAPI?.main_content?.section8_full_width_banner?.image_url} className='img-fluid' alt='banner' width={1182} height={249} />
          </div>
        </Link>
      ) : dataAPI?.main_content?.section8_full_width_banner?.redirect_link?.link_type === 'collection' ? (
        <Link href={`/${i18Lang}/collections?category=${dataAPI?.main_content?.section8_full_width_banner?.redirect_link?.link}` || '/'}>
          <div className='banner-contain hover-effect'>
            <Image src={dataAPI?.main_content?.section8_full_width_banner?.image_url} className='img-fluid' alt='banner' width={1182} height={249} />
          </div>
        </Link>
      ) : dataAPI?.main_content?.section8_full_width_banner?.redirect_link?.link_type === 'product' ? (
        <Link href={`/${i18Lang}/${redirectToProduct(dataAPI?.main_content?.section8_full_width_banner?.redirect_link?.link)}` || '/'}>
          <div className='banner-contain hover-effect'>
            <Image src={dataAPI?.main_content?.section8_full_width_banner?.image_url} className='img-fluid' alt='banner' width={1182} height={249} />
          </div>
        </Link>
      ) : (
        <div className='banner-contain hover-effect'>
          <div className='banner-contain hover-effect'>
            <Image src={dataAPI?.main_content?.section8_full_width_banner?.image_url} className='img-fluid' alt='banner' width={1182} height={249} />
          </div>
        </div>
      )}
    </div>
  );
};

export default VegetableBanner;
