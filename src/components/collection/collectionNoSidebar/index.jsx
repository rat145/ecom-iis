import { useContext } from 'react';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import MainCollection from '../mainCollection';
import WrapperComponent from '@/components/common/WrapperComponent';
import OfferBanner from '@/components/parisTheme/OfferBanner';

const CollectionNoSidebar = ({ filter, setFilter }) => {
  const { themeOption } = useContext(ThemeOptionContext);
  return (
    <>
      <WrapperComponent colProps={{ xs: 12 }}>
        <OfferBanner classes={{ customHoverClass: 'banner-contain hover-effect' }} imgUrl={themeOption?.collection?.collection_banner_image_url} />
      </WrapperComponent>
      <WrapperComponent classes={{ sectionClass: 'section-b-space shop-section' }} customCol={true}>
        <MainCollection filter={filter} setFilter={setFilter} initialGrid={5} noSidebar={true} />
      </WrapperComponent>
    </>
  );
};

export default CollectionNoSidebar;
