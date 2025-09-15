'use client';
import React, { useContext } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap';
import I18NextContext from '@/helper/i18NextContext';
import request from '@/utils/axiosUtils';
import { TagAPI } from '@/utils/axiosUtils/API';
import { useTranslation } from '@/app/i18n/client';

const Tags = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  // Get Tag Data
  const { data: BlogTagData, isLoading } = useQuery({queryKey: [TagAPI], queryFn: () => request({ url: TagAPI, params: { type: 'post' } }),
    enabled: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    select: (data) => data.data.data,
  });

  return (
    <AccordionItem>
      <AccordionHeader targetId='3'>{t('ProductTags')}</AccordionHeader>
      <AccordionBody accordionId='3' className='pt-0'>
        <div className='product-tags-box'>
          <ul>
            {BlogTagData?.map((tags, index) => (
              <li key={index}>
                <Link href={{ pathname: `/${i18Lang}/blogs`, query: { tag: tags?.slug } }}>{tags.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </AccordionBody>
    </AccordionItem>
  );
};

export default Tags;
