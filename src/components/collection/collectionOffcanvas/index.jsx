import { useContext } from 'react';
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';
import WrapperComponent from '@/components/common/WrapperComponent';
import MainCollection from '../mainCollection';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import CollectionSidebar from '../collectionSidebar';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';

const CollectionOffCanvas = ({ filter, setFilter }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { openOffCanvas, setOpenOffCanvas } = useContext(ThemeOptionContext);
  const toggle = () => {
    setOpenOffCanvas(!openOffCanvas);
  };
  return (
    <>
      <WrapperComponent classes={{ sectionClass: 'section-b-space shop-section' }} customCol={true}>
        <MainCollection filter={filter} setFilter={setFilter} isOffcanvas={true} />
      </WrapperComponent>
      <Offcanvas toggle={toggle} isOpen={openOffCanvas} className='shop-offcanvas-filter'>
        <OffcanvasHeader toggle={toggle}>{t('Back')}</OffcanvasHeader>
        <OffcanvasBody>
          <CollectionSidebar filter={filter} setFilter={setFilter} isOffcanvas={true} />
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
};

export default CollectionOffCanvas;
