import CustomModal from '@/components/common/CustomModal';
import Image from 'next/image';

const SizeModal = ({ modal, setModal, productState }) => {
  return (
    <CustomModal modal={modal ? true : false} setModal={setModal} classes={{ modalClass: 'theme-modal modal-lg', title: 'SizeCart' }}>
      <Image src={productState?.product?.size_chart_image?.original_url} className='img-fluid' alt='size_chart_image' height={312} width={768} />
    </CustomModal>
  );
};

export default SizeModal;
