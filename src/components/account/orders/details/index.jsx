'use client';
import Breadcrumb from '@/components/common/Breadcrumb';
import WrapperComponent from '@/components/common/WrapperComponent';
import AccountSidebar from '../../common/AccountSidebar';
import { Col, TabContent, TabPane } from 'reactstrap';
import ResponsiveMenuOpen from '../../common/ResponsiveMenuOpen';
import Details from './Details';

const OrderDetailsContain = ({ params }) => {
  return (
    <>
      <Breadcrumb title={'Orders'} subNavigation={[{ name: 'Orders' }]} />
      <WrapperComponent classes={{ sectionClass: 'user-dashboard-section section-b-space' }} customCol={true}>
        <AccountSidebar tabActive={'order'} />
        <Col xxl={9} lg={8}>
          <ResponsiveMenuOpen />
          <div className='dashboard-right-sidebar'>
            <TabContent>
              <TabPane className='show active'>
                <Details params={params} />
              </TabPane>
            </TabContent>
          </div>
        </Col>
      </WrapperComponent>
    </>
  );
};

export default OrderDetailsContain;
