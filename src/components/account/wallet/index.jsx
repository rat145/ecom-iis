'use client';
import Breadcrumb from '@/components/common/Breadcrumb';
import WrapperComponent from '@/components/common/WrapperComponent';
import AccountSidebar from '../common/AccountSidebar';
import ResponsiveMenuOpen from '../common/ResponsiveMenuOpen';
import { Col, TabContent, TabPane } from 'reactstrap';
import WalletCard from './WalletCard';

const WalletContent = () => {
  return (
    <>
      <Breadcrumb title={'Wallet'} subNavigation={[{ name: 'Wallet' }]} />
      <WrapperComponent classes={{ sectionClass: 'user-dashboard-section section-b-space' }} customCol={true}>
        <AccountSidebar tabActive={'wallet'} />

        <Col xxl={9} lg={8}>
          <ResponsiveMenuOpen />
          <div className='dashboard-right-sidebar'>
            <TabContent>
              <TabPane className='show active'>
                <WalletCard />
              </TabPane>
            </TabContent>
          </div>
        </Col>
      </WrapperComponent>
    </>
  );
};

export default WalletContent;
