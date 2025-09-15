'use client';
import React, { useContext, useEffect, useState } from 'react';
import Btn from '@/elements/buttons/Btn';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import Avatar from '@/components/common/Avatar';
import Link from 'next/link';
import logoImage from '../../../../../public/assets/images/logo/1.png';
import { RiMenuLine } from 'react-icons/ri';
import { usePathname } from 'next/navigation';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';
import ParisLogo from '../../../../../public/assets/images/logo/1.png';
import TokyoLogo from '../../../../../public/assets/images/logo/2.png';
import RomeLogo from '../../../../../public/assets/images/logo/3.png';
import MadridLogo from '../../../../../public/assets/images/logo/4.png';
import OtherLogo from '../../../../../public/assets/images/logo/6.png';

const HeaderLogo = () => {
  const [logo, setLogo] = useState('');
  const { themeOption, mobileSideBar, setMobileSideBar } = useContext(ThemeOptionContext);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const pathName = usePathname();
  useEffect(() => {
    let logo = themeOption?.logo?.header_logo;
    if (pathName == `/${i18Lang}/theme/paris`) {
      logo = { original_url: ParisLogo };
    } else if (pathName == `/${i18Lang}/theme/tokyo`) {
      logo = { original_url: TokyoLogo };
    } else if (pathName == `/${i18Lang}/theme/rome`) {
      logo = { original_url: RomeLogo };
    } else if (pathName == `/${i18Lang}/theme/madrid`) {
      logo = { original_url: MadridLogo };
    } else if (pathName == `/${i18Lang}/theme/berlin` || pathName == `/${i18Lang}/theme/denver`) {
      logo = { original_url: OtherLogo };
    } else {
      logo = themeOption?.logo?.header_logo;
    }
    setLogo(logo);
  }, [pathName, i18Lang, themeOption?.logo?.header_logo]);
  return (
    <>
      <Btn className='navbar-toggler d-xl-none d-inline navbar-menu-button me-2' type='button'>
        <span className='navbar-toggler-icon' onClick={() => setMobileSideBar(!mobileSideBar)}>
          <RiMenuLine />
        </span>
      </Btn>
      <Link href='/' className='web-logo nav-logo'>
        <Avatar data={logo} placeHolder={logoImage} name={'Header'} customImageClass={'img-fluid'} height={28} width={162} />
      </Link>
    </>
  );
};

export default HeaderLogo;
