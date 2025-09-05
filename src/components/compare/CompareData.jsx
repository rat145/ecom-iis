import { useContext } from 'react';
import { Col } from 'reactstrap';
import Image from 'next/image';
import Link from 'next/link';
import I18NextContext from '@/helper/i18NextContext';
import CompareAction from './CompareAction';
import CompareWrapper from './CompareWrapper';
import ProductBox1Rating from '../common/productBox/productBox1/ProductBox1Rating';
import CompareContext from '@/helper/compareContext';
import NoDataFound from '../common/NoDataFound';
import emptyImage from '../../../public/assets/svg/no-category.svg';
import { ModifyString } from '@/utils/customFunctions/ModifyString';
import SettingContext from '@/helper/settingContext';

const CompareData = () => {
  const { compareState } = useContext(CompareContext);
  const { i18Lang } = useContext(I18NextContext);
  const { convertCurrency } = useContext(SettingContext);
  return (
    <>
      {compareState?.length > 0 ? (
        compareState?.map((product, i) => (
          <Col key={i}>
            <div className='compare-part'>
              <div className='img-section'>
                <div>
                  <Image src={product.product_thumbnail ? product.product_thumbnail.original_url : placeHolderImage} className='img-fluid' alt={product.name} height={130} width={130} />
                </div>
                <Link href={`/${i18Lang}/product/${product?.slug}`}>
                  <h5 className='text-title'>{product?.name}</h5>
                </Link>
              </div>
              <CompareWrapper data={{ title: 'Discount', value: product?.discount ? product?.discount : '-' }} />
              <CompareWrapper data={{ title: 'Price', value: convertCurrency(product?.sale_price) }} />
              <CompareWrapper data={{ title: 'Availability', value: ModifyString(product?.stock_status) }} />
              <CompareWrapper data={{ title: 'Rating' }}>
                <div className='compare-rating'>
                  <ProductBox1Rating totalRating={product?.rating_count} />
                  <span className='text-content rating-text'>{`(${product?.rating_count?.toFixed(2) || 0} Rating)`}</span>
                </div>
              </CompareWrapper>
              <CompareWrapper data={{ title: 'Weight', value: product?.weight ? product?.weight : '-' }} />
              <CompareAction product={product} />
            </div>
          </Col>
        ))
      ) : (
        <NoDataFound
          data={{
            customClass: 'no-data-added',
            imageUrl: emptyImage,
            title: 'NoItemsAdded',
            description: 'NoItemsAddedDescription',
            height: 50,
            width: 50,
          }}
        />
      )}
    </>
  );
};

export default CompareData;
