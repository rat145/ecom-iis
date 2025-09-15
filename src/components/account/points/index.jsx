'use client';

import Breadcrumb from '@/components/common/Breadcrumb';
import WrapperComponent from '@/components/common/WrapperComponent';
import AccountSidebar from '../common/AccountSidebar';
import { Col, TabContent, TabPane } from 'reactstrap';
import ResponsiveMenuOpen from '../common/ResponsiveMenuOpen';
import PointTopBar from './PointTopBar';

const AccountPoints = () => {
  return (
    <>
      <Breadcrumb title={'Point'} subNavigation={[{ name: 'Point' }]} />
      <WrapperComponent classes={{ sectionClass: 'user-dashboard-section section-b-space' }} customCol={true}>
        <AccountSidebar tabActive={'point'} />

        <Col xxl={9} lg={8}>
          <ResponsiveMenuOpen />
          <div className='dashboard-right-sidebar'>
            <TabContent>
              <TabPane className='show active'>
                <PointTopBar />
              </TabPane>
            </TabContent>
          </div>
        </Col>
      </WrapperComponent>
    </>
  );
};

export default AccountPoints;
