import { useContext } from 'react';
import { FiBookmark } from 'react-icons/fi';
import { Col, Row } from 'reactstrap';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import { useHeaderScroll } from '@/utils/HeaderScroll';
import ClassicHeaderMenu from './common/ClassicHeaderMenu';
import HeaderLogo from './common/HeaderLogo';
import HeaderTopBar from './common/HeaderTopBar';
import RightSideHeader from './rightSideHeader';

const ClassicHeader = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const UpScroll = useHeaderScroll(false);
  return (
    <header className={themeOption?.header?.sticky_header_enable && UpScroll ? 'active' : ''}>
      {themeOption?.header?.page_top_bar_enable && <HeaderTopBar />}
      <div className='top-nav top-header sticky-header'>
        <div className='container-fluid-lg'>
          <Row>
            <Col xs='12'>
              <div className='navbar-top'>
                <HeaderLogo />
                <ClassicHeaderMenu />
                <RightSideHeader noContactUs={true} wishListIcon={<FiBookmark />} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </header>
  );
};

export default ClassicHeader;
