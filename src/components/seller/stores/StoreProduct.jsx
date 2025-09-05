import Image from 'next/image';
import { placeHolderImage } from '../../../data/CommonPath';

const StoreProduct = ({ elem }) => {
  return (
    <>
      <ul className='product-image'>
        {elem?.product_images?.slice(0, 3)?.map((data, i) => (
          <li key={i}>
            <Image src={data || placeHolderImage} height={32} width={32} alt='Store'/>
          </li>
        ))}
        {elem?.products_count > 3 ? <li>+{elem?.products_count - 3}</li> : null}
      </ul>
    </>
  );
};

export default StoreProduct;
