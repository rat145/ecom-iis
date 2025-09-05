import { useContext } from 'react';
import Cookies from 'js-cookie';
import { RiHeartLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import I18NextContext from '@/helper/i18NextContext';
import Btn from '@/elements/buttons/Btn';

const AddToWishlist = ({ productObj, customClass }) => {
  const { i18Lang } = useContext(I18NextContext);
  const router = useRouter();
  const handelWishlist = (productObj) => {
    if (Cookies.get('uat')) {
      // Add your add to wishlist logic here
    } else {
      router.push(`/${i18Lang}/auth/login`);
    }
  };
  return (
    <>
      {customClass ? (
        <Btn className={customClass ? customClass : ''} onClick={() => handelWishlist(productObj)}>
          <RiHeartLine />
        </Btn>
      ) : (
        <li title='Wishlist' onClick={() => handelWishlist(productObj)}>
          <a className={'notifi-wishlist'}>
            <RiHeartLine />
          </a>
        </li>
      )}
    </>
  );
};

export default AddToWishlist;
