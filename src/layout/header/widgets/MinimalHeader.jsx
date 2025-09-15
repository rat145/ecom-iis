import { Col, Row } from 'reactstrap';
import HeaderLogo from './common/HeaderLogo';
import ResponsiveSearch from './common/ResponsiveSearch';
import MinimalNavMenu from './minimalHeaderComponent/MinimalNavMenu';
import SearchBox from './minimalHeaderComponent/SearchBox';
import SupportBox from './minimalHeaderComponent/SupportBox';

const MinimalHeader = () => {
  return (
    <header className='header-3'>
      <div className='top-nav sticky-header sticky-header-2'>
        <div className='container-fluid-lg'>
          <Row>
            <Col xs={12}>
              <div className='navbar-top'>
                <HeaderLogo />
                <ResponsiveSearch />
                <SearchBox />
                <SupportBox />
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className='container-fluid-lg'>
        <Row>
          <Col xs={12} className='position-relative'>
            <MinimalNavMenu />
          </Col>
        </Row>
      </div>
    </header>
  );
};

export default MinimalHeader;
