import { useContext } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { Col, Row } from 'reactstrap';
import Link from 'next/link';
import { RiFacebookFill, RiInstagramLine, RiPinterestFill, RiTwitterFill } from 'react-icons/ri';
import WrapperComponent from '../common/WrapperComponent';
import { teamMembersData } from '../../data/AboutUs';
import { creativeTeamSlider } from '../../data/SliderSettings';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';
const CreativeTeam = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <WrapperComponent classes={{ sectionClass: 'team-section section-lg-space' }} colProps={{ xs: 12 }} noRowCol>
      <div className='about-us-title text-center'>
        <h4 className='text-content'>{t('OurCreativeTeam')}</h4>
        <h2 className='center'>{t('FastkartTeamMember')}</h2>
      </div>
      <Row>
        <Col xs='12'>
          <Slider className='slider-user product-wrapper ' {...creativeTeamSlider}>
            {teamMembersData.map((data, index) => (
              <div className='team-box' key={index}>
                <div className='team-iamge'>
                  <Image height={183.5} width={183.5} src={data.profile_image} className='img-fluid' alt={data.name} />
                </div>
                <div className='team-name'>
                  <h3>{data.name}</h3>
                  <h5>{t(data.designation)}</h5>
                  <p>{t(data.description)}</p>
                  <ul className='team-media'>
                    <li>
                      <Link href='https://www.facebook.com/' className='fb-bg' target='_blank'>
                        <RiFacebookFill />
                      </Link>
                    </li>
                    <li>
                      <Link href='https://in.pinterest.com/' className='pint-bg' target='_blank'>
                        <RiPinterestFill />
                      </Link>
                    </li>
                    <li>
                      <Link href='https://twitter.com/' className='twitter-bg' target='_blank'>
                        <RiTwitterFill />
                      </Link>
                    </li>
                    <li>
                      <Link href='https://www.instagram.com/' className='insta-bg' target='_blank'>
                        <RiInstagramLine />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </Slider>
        </Col>
      </Row>
    </WrapperComponent>
  );
};

export default CreativeTeam;
