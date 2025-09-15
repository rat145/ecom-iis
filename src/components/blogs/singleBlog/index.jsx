'use client';
import Breadcrumb from '@/components/common/Breadcrumb';
import Sidebar from '../sidebar/Sidebar';
import BlogCardDetails from '../BlogCardDetails';
import WrapperComponent from '@/components/common/WrapperComponent';
import { useQuery } from '@tanstack/react-query';
import request from '@/utils/axiosUtils';
import { BlogAPI } from '@/utils/axiosUtils/API';
import Loader from '@/layout/loader';

const SingleBlog = ({ params }) => {
  const { data: Blog, isLoading, refetch } = useQuery({queryKey: [params], queryFn: () => request({ url: `${BlogAPI}/slug/${params}` }), enabled: true, refetchOnWindowFocus: false, select: (res) => res?.data });
  if (isLoading) return <Loader/>
  return (
    <>
      <Breadcrumb title={Blog?.title} subNavigation={[{ name: 'Blogs', link: '/blogs' }, { name: Blog?.title }]} />
      <WrapperComponent classes={{ sectionClass: 'blog-section section-b-space', row: 'g-4' }} customCol={true}>
        <BlogCardDetails Blog={Blog} key={params}/>
        <Sidebar />
      </WrapperComponent>
    </>
  );
};

export default SingleBlog;
