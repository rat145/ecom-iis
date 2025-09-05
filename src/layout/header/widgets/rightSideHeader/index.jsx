import React, { useContext } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import ResponsiveSearch from '../common/ResponsiveSearch';
import HeaderWishList from './HeaderWishList';
import HeaderCart from './HeaderCart';
import HeaderContactUs from './HeaderContactUs';
import HeaderProfile from './HeaderProfile';
import { useRouter } from 'next/navigation';
import I18NextContext from '@/helper/i18NextContext';
import ThemeOptionContext from '@/helper/themeOptionsContext';

const RightSideHeader = ({ noContactUs, wishListIcon }) => {
  const router = useRouter();
  const { i18Lang } = useContext(I18NextContext);
  const { cartCanvas, setCartCanvas } = useContext(ThemeOptionContext);

  return (
    <div className='rightside-box'>
      <ResponsiveSearch />
      <ul className='right-side-menu'>
        <li className='right-side'>
          <div className='delivery-login-box'>
            <div className='delivery-icon'>
              <div className='search-box' onClick={() => router.push(`/${i18Lang}/search`)}>
                <RiSearchLine />
              </div>
            </div>
          </div>
        </li>
        {!noContactUs && <HeaderContactUs />}
        <HeaderWishList wishListIcon={wishListIcon} />
        <HeaderCart />
        <HeaderProfile />
      </ul>
      <div className={`bg-overlay  ${cartCanvas ? 'show' : ''}`} onClick={() => setCartCanvas((prev) => !prev)} />
    </div>
  );
};

export default RightSideHeader;