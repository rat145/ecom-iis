import CategoryContext from '@/helper/categoryContext';
import I18NextContext from '@/helper/i18NextContext';
import Link from 'next/link';
import { useContext } from 'react';
import { placeHolderImage } from '../../data/CommonPath';
import Avatar from '../common/Avatar';

const CategoryMenu = ({ dataAPI }) => {
  const { filterCategory } = useContext(CategoryContext);
  const categoryData = filterCategory('product');
  const { i18Lang } = useContext(I18NextContext);
  return (
    <div className='category-menu'>
      <h3>{dataAPI?.main_content?.sidebar?.categories_icon_list?.title}</h3>
      <ul>
        {categoryData
          ?.filter((el) => dataAPI?.main_content?.sidebar?.categories_icon_list?.category_ids.includes(el.id))
          ?.map((elem) => (
            <li key={elem.id}>
              <div className='category-list'>
                <Avatar data={elem?.category_icon} placeHolder={placeHolderImage} name={elem?.name} />
                <h5>
                  <Link href={`/${i18Lang}/collections?category=${elem?.slug}`}>{elem?.name}</Link>
                </h5>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CategoryMenu;
