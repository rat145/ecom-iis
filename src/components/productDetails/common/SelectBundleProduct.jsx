import Btn from '@/elements/buttons/Btn';
import CartContext from '@/helper/cartContext';
import I18NextContext from '@/helper/i18NextContext';
import ProductIdsContext from '@/helper/productIdsContext';
import SettingContext from '@/helper/settingContext';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import { ToastNotification } from '@/utils/customFunctions/ToastNotification';
import { useTranslation } from '@/app/i18n/client';
import { useContext, useEffect, useState } from 'react';
import { Input, Label } from 'reactstrap';

const SelectBundleProduct = ({ crossSellProduct }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { cartProducts, setCartProducts } = useContext(CartContext);
  const { setCartCanvas } = useContext(ThemeOptionContext);
  const { convertCurrency } = useContext(SettingContext);
  const { filteredProduct } = useContext(ProductIdsContext);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const onProductCheck = (event) => {
    event.stopPropagation();
    const productId = Number(event?.target?.value);
    if (event.target.checked) {
      setSelectedProductIds((prev) => [...prev, productId]);
    } else {
      setSelectedProductIds((prev) => prev.filter((id) => id !== productId));
    }
  };
  useEffect(() => {
    const selected = filteredProduct?.filter((elem) => selectedProductIds?.includes(elem?.id));
    setSelectedProducts(selected);
    const newTotal = selected.reduce((sum, item) => sum + item.sale_price, 0);
    setTotal(newTotal);
  }, [selectedProductIds, filteredProduct]);

  const addToCart = (qty, products) => {
    let cloneCart = [...cartProducts];
    if (products.length) {
      products.forEach((elem) => {
        const index = cloneCart?.findIndex((item) => item?.product_id === elem.id);
        const productStockQty = cloneCart[index]?.product?.quantity;
        if (productStockQty < cloneCart[index]?.quantity + qty) {
          ToastNotification('error', `You can not add more items than available. In stock ${productStockQty} items.`);
          return false;
        }
        if (index !== -1) {
          let temp = { ...cloneCart[index], quantity: cloneCart[index].quantity + qty, sub_total: (cloneCart[index].quantity + qty) * cloneCart[index]?.product?.sale_price };
          setCartProducts((prev) => [...prev.filter((value) => value?.product_id !== cloneCart[index]?.product_id), temp]);
        } else {
          let params = { product: elem, product_id: elem.id, quantity: qty, sub_total: elem?.sale_price };
          setCartProducts((prev) => [...prev, params]);
        }
      });
    }
    setCartCanvas(true);
  };
  return (
    <div className='budle-list'>
      <ul>
        {crossSellProduct.map((elem, i) => (
          <li key={i}>
            <div className='form-check'>
              <Input className='checkbox_animated' type='checkbox' value={elem?.id} id={`crossSell-${elem?.id}`} onChange={(e) => onProductCheck(e)} />
              <Label className='form-check-label' htmlFor={`crossSell-${elem?.id}`}>
                <span className='color color-1'>
                  {elem?.name}
                  <span className='ms-1'>{convertCurrency(elem?.sale_price)}</span>
                </span>
              </Label>
            </div>
          </li>
        ))}
        <li className='contant'>
          <h5>{t('ProductSelectedFor')}</h5>
          <h4 className='theme-color'>{convertCurrency(total)}</h4>
          <Btn title='AddAllToCart' disabled={!total} className='text-white theme-bg-color btn-md mt-sm-4 mt-3 fw-bold' onClick={(e) => addToCart(1, selectedProducts)}></Btn>
        </li>
      </ul>
    </div>
  );
};

export default SelectBundleProduct;
