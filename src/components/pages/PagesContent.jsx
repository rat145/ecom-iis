'use client';
import { Container } from 'reactstrap';
import Breadcrumb from '../common/Breadcrumb';
import PageCard from './PageCard';

const PagesContent = ({ params }) => {
  return (
    <>
      <Breadcrumb title={params.split('-').join(' ')} subNavigation={[{ name: 'Pages' }, { name: params }]} />
      <section className='blog-section section-b-space section-t-space'>
        <Container>
          <PageCard params={params} />
        </Container>
      </section>
    </>
  );
};

export default PagesContent;
