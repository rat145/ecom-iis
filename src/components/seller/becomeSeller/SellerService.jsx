import { useContext } from 'react';
import { Row } from 'reactstrap';
import WrapperComponent from '@/components/common/WrapperComponent';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import SellerServiceBox from './SellerServiceBox';

const SellerService = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  return (
    <WrapperComponent classes={{ sectionClass: 'become-service section-b-space' }} noRowCol={true}>
      <Row className='g-md-4 g-3'>
        <SellerServiceBox data={themeOption?.seller?.services?.service_1} />
        <SellerServiceBox data={themeOption?.seller?.services?.service_2} />
        <SellerServiceBox data={themeOption?.seller?.services?.service_3} />
        <SellerServiceBox data={themeOption?.seller?.services?.service_4} />
      </Row>
    </WrapperComponent>
  );
};

export default SellerService;
