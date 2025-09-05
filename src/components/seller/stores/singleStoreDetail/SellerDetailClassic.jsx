import MainCollection from '@/components/collection/mainCollection';
import SellerClassicCard from './SellerClassicCard';
import CollectionSidebar from '@/components/collection/collectionSidebar';
import WrapperComponent from '@/components/common/WrapperComponent';

const SellerDetailClassic = ({ filter, setFilter, StoreData }) => {
  return (
    <WrapperComponent classes={{ sectionClass: 'section-b-space shop-section' }} customCol={true}>
      <CollectionSidebar filter={filter} setFilter={setFilter} isAttributes={false} />
      <MainCollection filter={filter} setFilter={setFilter} classicStoreCard={<SellerClassicCard StoreData={StoreData} />} />
    </WrapperComponent>
  );
};

export default SellerDetailClassic;
