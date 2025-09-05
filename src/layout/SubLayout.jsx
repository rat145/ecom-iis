import { useContext, useEffect } from 'react';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import TabFocusChecker from '@/utils/customFunctions/TabFocus';
import CookiesComponent from './cookies';
import MainFooter from './footer';
import MainHeader from './header';
import MobileMenu from './mobileMenu';
import NewsLetterModal from './newsLetter';
import RecentPurchase from './recentPurchase';
import StickyCompare from './StickyCompare';
import TapTop from './tapTop';
import ExitModal from './exitModal';
import Cookies from 'js-cookie';

const SubLayout = ({ children }) => {
  const isNewsLetter = Cookies.get('newsLetterModal');
  const isTabActive = TabFocusChecker();
  const { themeOption } = useContext(ThemeOptionContext);
  useEffect(() => {
    const message = ['⚡ Come Back !!!', "🔥 Don't forget this....."];
    let timer;

    const updateTitle = (index) => {
      document.title = message[index];
      timer = setTimeout(() => {
        const nextIndex = (index + 1) % message.length;
        updateTitle(nextIndex);
      }, 500);
    };

    if (!isTabActive) {
      updateTitle(0);
    } else {
      let value =
        themeOption?.general?.site_title && themeOption?.general?.site_tagline
          ? `${themeOption?.general?.site_title} | ${themeOption?.general?.site_tagline}`
          : 'FastKart Marketplace: Where Vendors Shine Together';
      document.title = value;
      clearTimeout(timer);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isTabActive, themeOption]);
  return (
    <>
      <MainHeader />
      <MobileMenu />
      {children}
      <TapTop />
      <MainFooter />
      <CookiesComponent />
      <StickyCompare />
      <RecentPurchase />
      {!isNewsLetter && <NewsLetterModal />}
      <ExitModal />
    </>
  );
};

export default SubLayout;