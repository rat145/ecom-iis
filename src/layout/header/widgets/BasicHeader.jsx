import { useContext } from 'react';
import { Col, Row } from 'reactstrap';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import { useHeaderScroll } from '@/utils/HeaderScroll';
import HeaderCategory from './common/HeaderCategory';
import HeaderLogo from './common/HeaderLogo';
import HeaderSearchBar from './common/HeaderSearchBar';
import HeaderTopBar from './common/HeaderTopBar';
import RightSideHeader from './rightSideHeader';

const BasicHeader = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const UpScroll = useHeaderScroll(false);
  return (
    <header className={`pb-md-4 pb-0 ${themeOption?.header?.sticky_header_enable && UpScroll ? 'active' : ''}`}>
      {themeOption?.header?.page_top_bar_enable && <HeaderTopBar />}
      <div className='top-nav top-header sticky-header'>
        <div className='container-fluid-lg'>
          <Row>
            <Col xs='12'>
              <div className='navbar-top'>
                <HeaderLogo />
                <HeaderSearchBar />
                <RightSideHeader />
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className='container-fluid-lg'>
        <Row>
          <HeaderCategory />
        </Row>
      </div>
    </header>
  );
};

export default BasicHeader;
