'use client';
import Breadcrumb from '@/components/common/Breadcrumb';
import WrapperComponent from '@/components/common/WrapperComponent';
import AccountSidebar from '../common/AccountSidebar';
import { Col, TabContent, TabPane } from 'reactstrap';
import ResponsiveMenuOpen from '../common/ResponsiveMenuOpen';
import NotificationData from './NotificationData';

const AccountNotificationContent = () => {
  return (
    <>
      <Breadcrumb title={'Notification'} subNavigation={[{ name: 'Notification' }]} />
      <WrapperComponent classes={{ sectionClass: 'user-dashboard-section section-b-space' }} customCol={true}>
        <AccountSidebar tabActive={'notification'} />

        <Col xxl={9} lg={8}>
          <ResponsiveMenuOpen />
          <div className='dashboard-right-sidebar'>
            <TabContent>
              <TabPane className='show active'>
                <NotificationData />
              </TabPane>
            </TabContent>
          </div>
        </Col>
      </WrapperComponent>
    </>
  );
};

export default AccountNotificationContent;
