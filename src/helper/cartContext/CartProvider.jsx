import React, { useContext, useEffect, useMemo, useState } from 'react';
import Cookies from 'js-cookie';
import CartContext from '.';
import { ToastNotification } from '@/utils/customFunctions/ToastNotification';
import { AddToCartAPI } from '@/utils/axiosUtils/API';
import request from '@/utils/axiosUtils';
import { useQuery } from '@tanstack/react-query';
import ThemeOptionContext from '../themeOptionsContext';

const CartProvider = (props) => {
  const isCookie = Cookies.get('uat');
  const [cartProducts, setCartProducts] = useState([]);
  const [variationModal, setVariationModal] = useState('');
  const [cartTotal, setCartTotal] = useState(0);
  const { setCartCanvas } = useContext(ThemeOptionContext);
  const {
    data: CartAPIData,
    isLoading: getCartLoading,
    refetch,
  } = useQuery({queryKey:[AddToCartAPI],queryFn: () => request({ url: AddToCartAPI }), enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data });  //enabled: false, // <-- disables automatic fetching

  // Refetching Cart API
  useEffect(() => {
    if (isCookie) {
      refetch();
    }
  }, [isCookie]);

  // Setting CartAPI data to state and LocalStorage
  useEffect(() => {
    if (isCookie) {
      if (CartAPIData) {
        setCartProducts(CartAPIData?.items);
        setCartTotal(CartAPIData?.total);
      }
    } else {
      const isCartAvailable = JSON.parse(localStorage.getItem('cart'));
      if (isCartAvailable?.items?.length > 0) {
        setCartProducts(isCartAvailable?.items);
        setCartTotal(isCartAvailable?.total);
      }
    }
  }, [getCartLoading]);

  // Adding data in localstorage when not Login
  useEffect(() => {
    storeInLocalStorage();
  }, [cartProducts]);

  // Getting total
  const total = useMemo(() => {
    return cartProducts?.reduce((prev, curr) => {
      return prev + Number(curr.sub_total);
    }, 0);
  }, [getCartLoading, cartProducts]);

  // Total Function for child components
  const getTotal = (value) => {
    return value?.reduce((prev, curr) => {
      return prev + Number(curr.sub_total);
    }, 0);
  };

  // Remove and Delete cart data from API and State
  const removeCart = (id, cartId) => {
    const updatedCart = cartProducts?.filter((item) => item.product_id !== id);
    setCartProducts(updatedCart);
  };

  // Common Handler for Increment and Decrement
  const handleIncDec = (qty, productObj, isProductQty, setIsProductQty, isOpenFun, cloneVariation) => {
    const cartUid = null;
    const updatedQty = isProductQty ? isProductQty : 0 + qty;
    const cart = [...cartProducts];
    const index = cart.findIndex((item) => item.product_id === productObj?.id);
    let tempProductId = productObj?.id;
    let tempVariantProductId = cloneVariation?.selectedVariation?.product_id;

    // Checking conditions for Replace Cart
    if (cart[index]?.variation && cloneVariation?.variation_id && tempProductId == tempVariantProductId && cloneVariation?.variation_id !== cart[index]?.variation_id) {
      return replaceCart(updatedQty, productObj, cloneVariation);
    }

    // Add data when not present in Cart variable
    if (index === -1) {
      const params = {
        id: null,
        product: productObj,
        product_id: productObj?.id,
        variation: cloneVariation?.selectedVariation ? cloneVariation?.selectedVariation : null,
        variation_id: cloneVariation?.selectedVariation?.id ? cloneVariation?.selectedVariation?.id : null,
        quantity: cloneVariation?.selectedVariation?.productQty ? cloneVariation?.selectedVariation?.productQty : updatedQty,
        sub_total: cloneVariation?.selectedVariation?.sale_price ? updatedQty * cloneVariation?.selectedVariation?.sale_price : updatedQty * productObj?.sale_price,
      };
      isCookie ? setCartProducts((prev) => [...prev, params]) : setCartProducts((prev) => [...prev, params]);
    } else {
      // Checking the Stock QTY of particular product
      const productStockQty = cart[index]?.variation?.quantity ? cart[index]?.variation?.quantity : cart[index]?.product?.quantity;
      if (productStockQty < cart[index]?.quantity + qty) {
        ToastNotification('error', `You can not add more items than available. In stock ${productStockQty} items.`);
        return false;
      }

      if (cart[index]?.variation) {
        cart[index].variation.selected_variation = cart[index]?.variation?.attribute_values?.map((values) => values.value).join('/');
      }

      const newQuantity = cart[index].quantity + qty;
      if (newQuantity < 1) {
        // Remove the item from the cart if the new quantity is less than 1
        return removeCart(productObj?.id, cartUid ? cartUid : cart[index].id);
      } else {
        cart[index] = {
          ...cart[index],
          id: cartUid?.id ? cartUid?.id : cart[index].id ? cart[index].id : null,
          quantity: newQuantity,
          sub_total: newQuantity * (cart[index]?.variation ? cart[index]?.variation?.sale_price : cart[index]?.product?.sale_price),
        };
        isCookie ? setCartProducts([...cart]) : setCartProducts([...cart]);
      }
    }
    // Update the productQty state immediately after updating the cartProducts state
    if (isCookie) {
      setIsProductQty && setIsProductQty(updatedQty);
      isOpenFun && isOpenFun(true);
    } else {
      setIsProductQty && setIsProductQty(updatedQty);
      isOpenFun && isOpenFun(true);
    }
    setCartCanvas(true);
  };

  // Replace Cart
  const replaceCart = (updatedQty, productObj, cloneVariation) => {
    const cart = [...cartProducts];
    const index = cart.findIndex((item) => item.product_id === productObj?.id);
    cart[index].quantity = 0;

    const productQty = cart[index]?.variation ? cart[index]?.variation?.quantity : cart[index]?.product?.quantity;

    if (cart[index]?.variation) {
      cart[index].variation.selected_variation = cart[index]?.variation?.attribute_values?.map((values) => values.value).join('/');  // assigning it to a new property called selected_variation.
    }

    // Checking the Stock QTY of particular product
    if (productQty < cart[index]?.quantity + updatedQty) {
      ToastNotification('error', `You can not add more items than available. In stock ${productQty} items.`);
      return false;
    }

    const params = {
      id: null,
      product: productObj,
      product_id: productObj?.id,
      variation: cloneVariation?.selectedVariation ? cloneVariation?.selectedVariation : null,
      variation_id: cloneVariation?.selectedVariation?.id ? cloneVariation?.selectedVariation?.id : null,
      quantity: cloneVariation?.productQty ? cloneVariation?.productQty : updatedQty,
      sub_total: cloneVariation?.selectedVariation?.sale_price ? updatedQty * cloneVariation?.selectedVariation?.sale_price : updatedQty * productObj?.sale_price,
    };

    isCookie
      ? setCartProducts((prevCartProducts) =>
          prevCartProducts.map((elem) => {
            if (elem?.product_id === cloneVariation?.selectedVariation?.product_id) {
              return params;
            } else {
              return elem;
            }
          }),
        )
      : setCartProducts((prevCartProducts) =>
          prevCartProducts.map((elem) => {
            if (elem?.product_id === cloneVariation?.selectedVariation?.product_id) {
              return params;
            } else {
              return elem;
            }
          }),
        );
  };

  // Setting data to localstorage when UAT is not there
  const storeInLocalStorage = () => {
    setCartTotal(total);
    localStorage.setItem('cart', JSON.stringify({ items: cartProducts, total: total }));
  };

  return (
    <CartContext.Provider
      value={{
        ...props,
        cartProducts,
        setCartProducts,
        cartTotal,
        setCartTotal,
        removeCart,
        getTotal,
        handleIncDec,
        variationModal,
        setVariationModal,
        replaceCart,
      }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
