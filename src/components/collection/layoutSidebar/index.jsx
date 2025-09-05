import WrapperComponent from '@/components/common/WrapperComponent';
import MainCollection from '../mainCollection';
import LeftCategory from './LeftCategory';

const LayoutSidebar = ({ filter, setFilter }) => {
  return (
    <>
      <WrapperComponent classes={{ sectionClass: 'section-b-space shop-section' }} customCol={true}>
        <LeftCategory filter={filter} setFilter={setFilter} />
        <MainCollection filter={filter} setFilter={setFilter} />
      </WrapperComponent>
    </>
  );
};

export default LayoutSidebar;
