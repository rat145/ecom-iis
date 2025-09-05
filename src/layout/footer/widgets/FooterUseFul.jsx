import { useContext } from 'react';
import Link from 'next/link';
import { Col } from 'reactstrap';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';

const FooterUseFul = ({ footerMenu, setFooterMenu }) => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');

  return (
    <Col xl={2} lg={3} md={4} sm={6}>
      <div className={`footer-title ${footerMenu == 'usefull' ? 'show' : ''}`} onClick={() => setFooterMenu((prev) => (prev !== 'usefull' ? 'usefull' : ''))}>
        <h4>{t('UsefulLinks')}</h4>
      </div>
      <div className='footer-contain'>
        <ul>
           {themeOption?.footer?.useful_link?.map((elem, i) => (
            <li key={i}>
              <Link href={`/${i18Lang}/${elem.link}`} className='text-content text-capitalize'>
                {elem.label}
              </Link>
            </li>
          ))} 
        </ul>
      </div>
    </Col>
  );
};

export default FooterUseFul;
