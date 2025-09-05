import { Col } from 'reactstrap';
import CustomHeading from '@/components/common/CustomHeading';
import ContactUsForm from './ContactUsForm';

const ContactRightSidebar = () => {
  return (
    <Col lg={6}>
      <CustomHeading title={'ContactUs'} customtitleClass={'d-xxl-none d-block'} />
      <div className='right-sidebar-box'>
        <ContactUsForm />
      </div>
    </Col>
  );
};

export default ContactRightSidebar;
