'use client';
import { useContext, useEffect, useState } from 'react';
import Breadcrumb from '../common/Breadcrumb';
import { useCustomSearchParams } from '@/utils/hooks/useCustomSearchParams';
import LayoutSidebar from './layoutSidebar';
import MainCollectionSlider from './collectionSlider';
import CollectionBanner from './collectionBanner';
import CollectionLeftSidebar from './collectionLeftSidebar';
import CollectionOffCanvas from './collectionOffcanvas';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import CollectionRightSidebar from './collectionRightSidebar';
import CollectionNoSidebar from './collectionNoSidebar';
import Loader from '@/layout/loader';

const CollectionContain = () => {
  const [filter, setFilter] = useState({ category: [], price: [], attribute: [], rating: [], sortBy: '', field: '' });
  const { themeOption, isLoading } = useContext(ThemeOptionContext);
  const [category, attribute, price, rating, sortBy, field, layout] = useCustomSearchParams(['category', 'attribute', 'price', 'rating', 'sortBy', 'field', 'layout']);
  const collectionLayout = layout?.layout ? layout?.layout : themeOption?.collection?.collection_layout;
  useEffect(() => {
    setFilter((prev) => {
      return {
        ...prev,
        category: category ? category?.category?.split(',') : [],
        attribute: attribute ? attribute?.attribute?.split(',') : [],
        price: price ? price?.price?.split(',') : [],
        rating: rating ? rating?.rating?.split(',') : [],
        sortBy: sortBy ? sortBy?.sortBy : '',
        field: field ? field?.field : '',
      };
    });
  }, [category, attribute, price, rating, sortBy, field]);

  const isCollectionMatch = {
    collection_category_slider: <MainCollectionSlider filter={filter} setFilter={setFilter} />,
    collection_category_sidebar: <LayoutSidebar filter={filter} setFilter={setFilter} />,
    collection_banner: <CollectionBanner filter={filter} setFilter={setFilter} />,
    collection_offcanvas_filter: <CollectionOffCanvas filter={filter} setFilter={setFilter} />,
    collection_no_sidebar: <CollectionNoSidebar filter={filter} setFilter={setFilter} />,
    collection_left_sidebar: <CollectionLeftSidebar filter={filter} setFilter={setFilter} />,
    collection_right_sidebar: <CollectionRightSidebar filter={filter} setFilter={setFilter} />,
    collection_3_grid: <CollectionLeftSidebar filter={filter} setFilter={setFilter} />,
    collection_4_grid: <CollectionLeftSidebar filter={filter} setFilter={setFilter} />,
    collection_5_grid: <CollectionLeftSidebar filter={filter} setFilter={setFilter} />,
    collection_list_view: <CollectionLeftSidebar filter={filter} setFilter={setFilter} />,
  };
  if (isLoading) return <Loader />;
  return (
    <>
      <Breadcrumb title={'Collection'} subNavigation={[{ name: 'Collection' }]} />
      {isCollectionMatch[collectionLayout]}
    </>
  );
};

export default CollectionContain;
