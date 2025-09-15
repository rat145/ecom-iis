import Btn from '@/elements/buttons/Btn';
import { RiAddLine } from 'react-icons/ri';
import AddressData from './AddressData';
import { useContext, useEffect, useState } from 'react';
import AccountContext from '@/helper/accountContext';
import CustomModal from '@/components/common/CustomModal';
import AddAddressForm from '@/components/checkout/common/AddAddressForm';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';

const AddressHeader = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [addressState, setAddressState] = useState([]);
  const [editAddress, setEditAddress] = useState();
  const [modal, setModal] = useState('');
  const { accountData } = useContext(AccountContext);
  useEffect(() => {
    accountData?.address.length > 0 && setAddressState((prev) => [...accountData?.address]);
  }, [accountData]);
  const addAddress = () => {
    setModal('');
  }
  const editMutate = () => {
    setModal('');
  }
  return (
    <>
      <div className='dashboard-address'>
        <div className='title-header'>
          <div className='d-flex align-items-center w-100 justify-content-between'>
            <h5>{t("SavedAddress")}</h5>
            <Btn className='theme-bg-color text-white btn-sm fw-bold mt-lg-0 mt-3 ms-auto' onClick={() => setModal('add')} title={'Add Address'}>
              <RiAddLine />
            </Btn>
          </div>
        </div>
        <AddressData addressState={addressState} setAddressState={setAddressState} modal={modal} setModal={setModal} setEditAddress={setEditAddress} />
      </div>
      <div className='checkout-detail'>
        <CustomModal modal={modal == 'add' || modal == 'edit' ? true : false} setModal={setModal} classes={{ modalClass: 'theme-modal view-modal address-modal modal-lg', modalHeaderClass: 'p-0' }}>
          <div className='right-sidebar-box'>
            <AddAddressForm
              mutate={modal == 'add' ? addAddress : editMutate}
              setModal={setModal}
              setEditAddress={setEditAddress}
              editAddress={editAddress}
              modal={modal}
              setAddressState={setAddressState}
            />
          </div>
        </CustomModal>
      </div>
    </>
  );
};

export default AddressHeader;
