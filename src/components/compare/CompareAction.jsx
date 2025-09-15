import React, { useContext } from 'react';
import Btn from '@/elements/buttons/Btn';
import CartContext from '@/helper/cartContext';
import CompareContext from '@/helper/compareContext';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { RiDeleteBinLine } from 'react-icons/ri';

const CompareAction = ({ product }) => {
  const { setCompareState } = useContext(CompareContext);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { handleIncDec, isLoading } = useContext(CartContext);
  const removeFromCompare = (productObj) => {
    setCompareState((prevState) => prevState.filter((elem) => elem.id !== productObj?.id));
  };
  const addToCart = () => {
    handleIncDec(1, product);
  };
  return (
    <>
      <div className='btn-part'>
        <Btn className='btn-animation btn-sm' onClick={addToCart}>
          {t('AddToCart')}
        </Btn>
      </div>
      <div className='remove-part' onClick={() => removeFromCompare(product)}>
        <a className='text-content remove_column'>
          <RiDeleteBinLine /> {t('Remove')}
        </a>
      </div>
    </>
  );
};

export default CompareAction;
