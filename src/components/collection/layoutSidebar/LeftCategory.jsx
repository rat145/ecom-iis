import Image from 'next/image';
import React, { useContext } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { placeHolderImage } from '../../../data/CommonPath';
import CategoryContext from '@/helper/categoryContext';
import I18NextContext from '@/helper/i18NextContext';
import { useCustomSearchParams } from '@/utils/hooks/useCustomSearchParams';
import { useTranslation } from '@/app/i18n/client';
import { usePathname, useRouter } from 'next/navigation';

const LeftCategory = ({ filter, setFilter }) => {
  const { filterCategory } = useContext(CategoryContext);
  const categoryData = filterCategory('product');
  const { i18Lang } = useContext(I18NextContext);
  const [layout] = useCustomSearchParams(['layout']);
  const { t } = useTranslation(i18Lang, 'common');
  const router = useRouter();
  const pathname = usePathname();
  const redirectToCollection = (slug) => {
    let temp = [...filter?.category];
    if (!temp.includes(slug)) {
      temp.push(slug);
    } else {
      temp = temp.filter((elem) => elem !== slug);
    }
    setFilter((prev) => {
      return {
        ...prev,
        category: temp,
      };
    });
    if (temp.length > 0) {
      const queryParams = new URLSearchParams({ ...layout, category: temp }).toString();
      router.push(`${pathname}?${queryParams}`);
    } else {
      const queryParams = new URLSearchParams({ ...layout }).toString();
      router.push(`${pathname}?${queryParams}`);
    }
  };
  return (
    <div className='col-custome-3'>
      <div className='left-box'>
        <div className='shop-left-sidebar'>
          <Nav className='nav-pills mb-3 custom-nav-tab'>
            {categoryData?.map((category, i) => (
              <NavItem onClick={() => redirectToCollection(category?.slug)} key={i}>
                <NavLink className={filter?.category?.includes(category?.slug) ? 'active' : ''}>
                  {category?.name}
                  <Image src={category?.category_icon?.original_url || placeHolderImage} alt={category?.name} height={80} width={80} />
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </div>
      </div>
    </div>
  );
};

export default LeftCategory;
