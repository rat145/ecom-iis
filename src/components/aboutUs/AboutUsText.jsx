import { Col } from 'reactstrap';
import Image from 'next/image';
import { deliveryData } from '../../data/AboutUs';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { useContext } from 'react';
const AboutUsText = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <Col xl='6' xs='12'>
      <div className='fresh-contain p-center-left'>
        <div>
          <div className='review-title'>
            <h4>{t('AboutUs')}</h4>
            <h2>{t('AboutUsText')}</h2>
          </div>
          <div className='delivery-list'>
            <p className='text-content'>{t('AboutUsParaGraph')}</p>
            <ul className='delivery-box'>
              {deliveryData.map((data, index) => (
                <li key={index}>
                  <div className='delivery-box'>
                    <div className='delivery-icon'>
                      <Image src={data.iconSrc} alt='delivery' height={data.height} width={30} />
                    </div>
                    <div className='delivery-detail'>
                      <h5 className='text'>{t(data.text)}</h5>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default AboutUsText;
