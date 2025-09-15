import { useContext, useMemo, useState } from 'react';
import { Row } from 'reactstrap';
import FooterCategory from './widgets/FooterCategory';
import FooterUseFul from './widgets/FooterUseFul';
import FooterQuickPage from './widgets/FooterQuickPage';
import SubFooter from './widgets/SubFooter';
import FooterContactUs from './widgets/FooterContactUs';
import FooterLogoContent from './widgets/FooterLogoContent';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import { usePathname } from 'next/navigation';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';

const MainFooter = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [footerMenu, setFooterMenu] = useState('');
  const { themeOption } = useContext(ThemeOptionContext);
  const pathname = usePathname();
  const footerColor = useMemo(() => {
    if (pathname == `/${i18Lang}/theme/madrid` || pathname == `/${i18Lang}/theme/denver` || pathname == `/${i18Lang}/theme/berlin`) {
      return 'dark_mode';
    } else {
      return null;
    }
  }, [pathname, i18Lang]);
  return (
    <footer className={`section-t-space ${footerColor == 'dark_mode' ? 'footer-section-2 footer-color-2' : themeOption?.footer?.footer_style == 'dark_mode' ? 'footer-section-2 footer-color-2' : ''}`}>
      <div className='container-fluid-lg'>
        <div className='main-footer section-b-space'>
          <Row className='g-md-4 g-3'>
            <FooterLogoContent />
            {themeOption?.footer?.footer_categories.length > 0 && <FooterCategory footerMenu={footerMenu} setFooterMenu={setFooterMenu} />}
            {themeOption?.footer?.useful_link.length > 0 && <FooterUseFul footerMenu={footerMenu} setFooterMenu={setFooterMenu} />}
            <FooterQuickPage footerMenu={footerMenu} setFooterMenu={setFooterMenu} />
            <FooterContactUs footerMenu={footerMenu} setFooterMenu={setFooterMenu} />
          </Row>
        </div>
        <SubFooter />
      </div>
    </footer>
  );
};

export default MainFooter;
