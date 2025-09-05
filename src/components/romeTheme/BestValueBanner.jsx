import Slider from 'react-slick';
import { Col, Row } from 'reactstrap';
import WrapperComponent from '../common/WrapperComponent';
import { bestValueSliderOption } from '../../data/SliderSettings';
import CustomHeading from '../common/CustomHeading';
import OfferBanner from '../parisTheme/OfferBanner';

const BestValueBanner = ({ dataAPI }) => {
  return (
    <WrapperComponent noRowCol={true}>
      <CustomHeading title={dataAPI?.title} />
      <Row>
        <Col xs={12}>
          <Slider {...bestValueSliderOption}>
            {dataAPI?.banners?.map((elem, i) => (
              <div className='three-slider arrow-slider ratio_58' key={i}>
                <OfferBanner classes={{ customHoverClass: 'offer-banner hover-effect' }} imgUrl={elem?.image_url} ratioImage={true} elem={elem} />
              </div>
            ))}
          </Slider>
        </Col>
      </Row>
    </WrapperComponent>
  );
};

export default BestValueBanner;
