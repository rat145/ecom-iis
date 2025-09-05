'use client';
import React, { useContext } from 'react';
import Link from 'next/link';
import { AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap';
import Avatar from '@/components/common/Avatar';
import { formatDateForDateRange } from '@/utils/customFunctions/DateFormat';
import { placeHolderImage } from '../../../data/CommonPath';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';
import BlogContext from '@/helper/blogContext';

const RecentPost = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { blogState } = useContext(BlogContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <AccordionItem>
      <AccordionHeader targetId='1'>{t('RecentPost')}</AccordionHeader>
      <AccordionBody accordionId='1' className='pt-0'>
        <div className='recent-post-box'>
          {blogState?.slice(0, 5).map((blog, index) => (
            <div className='recent-box' key={index}>
              <Link href={`/${i18Lang}/blogs/${blog?.slug}`} className='recent-image'>
                <Avatar data={blog?.blog_thumbnail} placeHolder={placeHolderImage} name={blog?.blog_thumbnail?.name} width={124} height={124} />
              </Link>

              <div className='recent-detail'>
                <Link href={`/${i18Lang}/blogs/${blog?.slug}`}>
                  <h5 className='recent-name'>{blog.title}</h5>
                </Link>
                <h6>
                  {formatDateForDateRange(blog.created_at)}
                </h6>
              </div>
            </div>
          ))}
        </div>
      </AccordionBody>
    </AccordionItem>
  );
};

export default RecentPost;
