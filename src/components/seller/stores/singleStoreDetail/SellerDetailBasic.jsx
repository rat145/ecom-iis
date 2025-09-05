import CollectionSidebar from '@/components/collection/collectionSidebar';
import MainCollection from '@/components/collection/mainCollection';
import WrapperComponent from '@/components/common/WrapperComponent';
import SellerBasicCard from './SellerBasicCard';

const SellerDetailBasic = ({ filter, setFilter, StoreData, isLoading }) => {
  return (
    <WrapperComponent classes={{ sectionClass: 'section-b-space shop-section' }} customCol={true}>
      <CollectionSidebar
        filter={filter}
        setFilter={setFilter}
        basicStoreCard={<SellerBasicCard StoreData={StoreData} isLoading={isLoading} />}
        sellerClass={'col-xxl-3 col-lg-4'}
        isAttributes={false}
      />
      <MainCollection filter={filter} setFilter={setFilter} sellerClass={'col-xxl-9 col-lg-8'} />
    </WrapperComponent>
  );
};
export default SellerDetailBasic;
