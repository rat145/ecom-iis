import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RiArrowRightFill, RiTimeLine, RiUserLine } from 'react-icons/ri';
import Btn from '@/elements/buttons/Btn';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import { dateFormat } from '@/utils/customFunctions/DateFormat';
import TextLimit from '@/utils/customFunctions/TextLimit';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';

const BlogContain = ({ blog }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { themeOption } = useContext(ThemeOptionContext);
  const router = useRouter();
  return (
    <div className='blog-contain'>
      <div className='blog-label'>
        <span className='time'>
          <RiTimeLine />
          {dateFormat(blog?.created_at)}
        </span>
        {themeOption?.blog?.blog_author_enable && (
          <span className='super'>
            <RiUserLine /> {blog?.created_by?.name}
          </span>
        )}
      </div>
      <Link href={`/${i18Lang}/blogs/${blog.slug}`}>
        <h3>{blog?.title}</h3>
      </Link>
      <TextLimit value={blog?.description} maxLength={200} tag='p' />
      {themeOption?.blog?.read_more_enable && (
        <Btn className='blog-button' onClick={() => router.push(`/${i18Lang}/blogs/${blog.slug}`)}>
          {t('ReadMore')} <RiArrowRightFill />
        </Btn>
      )}
    </div>
  );
};

export default BlogContain;
