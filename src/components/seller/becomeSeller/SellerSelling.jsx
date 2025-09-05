import { useContext } from 'react';
import WrapperComponent from '@/components/common/WrapperComponent';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import { Col, Form, Input, Row } from 'reactstrap';
import Btn from '@/elements/buttons/Btn';
import { useRouter } from 'next/navigation';
import I18NextContext from '@/helper/i18NextContext';

const SellerSelling = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const router = useRouter();
  const { i18Lang } = useContext(I18NextContext);
  return (
    <WrapperComponent classes={{ sectionClass: 'selling-section section-b-space' }}>
      <div className='vendor-title'>
        <h5>{themeOption?.seller?.start_selling?.title}</h5>
        <p>{themeOption?.seller?.start_selling?.description}</p>
      </div>
      <Form className='mt-3'>
        <Row className='g-3'>
          <Col sm='6'>
            <Input type='email' placeholder='Email ID'></Input>
          </Col>
          <Col sm='6'>
            <Input type='number' placeholder='Phone Number'></Input>
          </Col>
        </Row>
        <Btn title="Start Selling" type="button" className='text-light theme-bg-color d-inline-block mt-3' onClick={()=>router.push(`/${i18Lang}/auth/register`)} />
      </Form>
    </WrapperComponent>
  );
};

export default SellerSelling;
