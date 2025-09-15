'use client';
import Breadcrumb from '@/components/common/Breadcrumb';
import WrapperComponent from '@/components/common/WrapperComponent';
import AccountSidebar from '../common/AccountSidebar';
import { Col, TabContent, TabPane } from 'reactstrap';
import DashboardContent from './DashboardContent';
import ResponsiveMenuOpen from '../common/ResponsiveMenuOpen';

const AccountDashboard = () => {
  return (
    <>
      <Breadcrumb title={'UserDashboard'} subNavigation={[{ name: 'UserDashboard' }]} />
      <WrapperComponent classes={{ sectionClass: 'user-dashboard-section section-b-space' }} customCol={true}>
        <AccountSidebar tabActive={'dashboard'} />
        <Col xxl={9} lg={8}>
          <ResponsiveMenuOpen />
          <div className='dashboard-right-sidebar'>
            <TabContent>
              <TabPane className='show active'>
                <DashboardContent />
              </TabPane>
            </TabContent>
          </div>
        </Col>
      </WrapperComponent>
    </>
  );
};

export default AccountDashboard;
