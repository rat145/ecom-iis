import { useContext } from 'react';
import { Form, Formik } from 'formik';
import Avatar from '@/components/common/Avatar';
import CustomModal from '@/components/common/CustomModal';
import SimpleInputField from '@/components/common/inputFields/SimpleInputField';
import Btn from '@/elements/buttons/Btn';
import I18NextContext from '@/helper/i18NextContext';
import { YupObject, nameSchema } from '@/utils/validation/ValidationSchemas';
import { useTranslation } from '@/app/i18n/client';
import { placeHolderImage } from '../../../../data/CommonPath';
import ProductBox1Rating from '@/components/common/productBox/productBox1/ProductBox1Rating';
import { ModalFooter } from 'reactstrap';

const ReviewModal = ({ modal, setModal, productState }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');

  return (
    <CustomModal modal={modal ? true : false} setModal={setModal} classes={{ modalClass: 'theme-modal', title: productState?.product?.user_review ? 'EditReview' : 'WriteaReview' }}>
      <Formik
        initialValues={{ rating: productState?.product?.user_review?.rating, description: productState?.product?.user_review?.description, product_id: productState?.product?.id, review_image_id: '' }}
        validationSchema={YupObject({
          rating: nameSchema,
        })}
        onSubmit={(values) => {
          // Add your logic here
          setModal(false)
        }}>
        {({ values, setFieldValue, errors }) => (
          <Form className='product-review-form'>
            <div className='product-wrapper'>
              <div className='product-image'>
                <Avatar data={productState?.product?.product_thumbnail ? productState?.product?.product_thumbnail : placeHolderImage} customImageClass='img-fluid' name={productState?.product?.name} />
              </div>
              <div className='product-content'>
                <h5 className='name'>{productState?.product?.name}</h5>
                <div className='product-review-rating'>
                  <label>{t('Rating')}</label>
                  <div className='product-rating'>
                    <ProductBox1Rating totalRating={productState?.product?.rating_count} />
                    <h6 className='rating-number'>{productState?.product?.rating_count?.toFixed(2) || 0}</h6>
                  </div>
                </div>
              </div>
            </div>

            <div className='review-box'>
              <div className='product-review-rating'>
                <label>{t('Rating')}</label>
                <div className='product-rating'>
                  <ProductBox1Rating totalRating={productState?.product?.user_review?.rating} clickAble={true} setFieldValue={setFieldValue} name={'rating'} />
                </div>
              </div>
            </div>
            <div className='review-box'>
              <SimpleInputField nameList={[{ name: 'description', placeholder: t('EnterDescription'), type: 'textarea', toplabel: 'ReviewContent', rows: 3 }]} />
            </div>
            <ModalFooter className='pt-0'>
              <Btn className='btn-md btn-theme-outline fw-bold' title='Cancel' type='button' onClick={() => setModal('')} />
              <Btn className='btn-md fw-bold text-light theme-bg-color' title='Submit' type='submit' />
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};

export default ReviewModal;
