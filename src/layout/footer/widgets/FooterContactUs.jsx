import React, { useContext } from 'react';
import { Col } from 'reactstrap';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import FooterDownloadAppLink from './FooterDownloadAppLink';
import FooterSupportEmail from './FooterSupportEmail';
import FooterSupportNumber from './FooterSupportNumber';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';

const FooterContactUs = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <Col xl={3} lg={4} sm={6}>
      {themeOption?.footer?.support_number || themeOption?.footer?.support_email ? (
        <div className={`footer-title contact-title`}>
          <h4>{t('ContactUs')}</h4>
        </div>
      ) : (
        ''
      )}
      <div className='footer-contact'>
        <ul>
          <FooterSupportNumber />
          <FooterSupportEmail />
          <FooterDownloadAppLink />
        </ul>
      </div>
    </Col>
  );
};

export default FooterContactUs;
