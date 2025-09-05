import { useContext } from 'react';
import { Col } from 'reactstrap';
import Link from 'next/link';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';
import CategoryContext from '@/helper/categoryContext';

const FooterCategory = ({ footerMenu, setFooterMenu }) => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { filterCategory } = useContext(CategoryContext);
  const categoryData = filterCategory('product');
  return (
    <Col xl={2} lg={3} md={4} sm={6}>
      <div className={`footer-title ${footerMenu == 'category' ? 'show' : ''}`} onClick={() => setFooterMenu((prev) => (prev !== 'category' ? 'category' : ''))}>
        <h4>{t('Categories')}</h4>
      </div>
      <div className='footer-contain'>
        <ul>
          {categoryData
            ?.filter((elem) => themeOption?.footer?.footer_categories.includes(elem.id))
            .map((result, i) => (
              <li key={i}>
                <Link href={`/${i18Lang}/collections?category=${result?.slug}`} className='text-content'>
                  {result?.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </Col>
  );
};

export default FooterCategory;
