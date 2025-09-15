'use client';
import React, { useContext } from 'react';
import { AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';
import CategoryContext from '@/helper/categoryContext';
import Link from 'next/link';

const Category = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { filterCategory } = useContext(CategoryContext);
  const categoryData = filterCategory('post');
  return (
    <AccordionItem>
      <AccordionHeader targetId='2'>{t('Category')}</AccordionHeader>
      <AccordionBody accordionId='2' className='p-0'>
        <div className='category-list-box'>
          <ul>
            {categoryData?.map((category, index) => (
              <li key={index}>
                <Link href={{ pathname: `/${i18Lang}/blogs`, query: { category: category?.slug } }}>
                  <div className='category-name'>
                    <h5>{category.name}</h5>
                    <span>({category?.blogs_count})</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </AccordionBody>
    </AccordionItem>
  );
};

export default Category;
