"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import CartContext from ".";
import { ToastNotification } from "@/utils/customFunctions/ToastNotification";
import ThemeOptionContext from "../themeOptionsContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "@/services/cartService";

const CartProvider = (props) => {
  const { user, isAuthenticated } = useAuth();
  const [cartProducts, setCartProducts] = useState([]);
  const [variationModal, setVariationModal] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { setCartCanvas } = useContext(ThemeOptionContext);

  // Load cart on mount and when user changes
  useEffect(() => {
    loadCart();
  }, [user, isAuthenticated]);

  // Load cart from Firebase or localStorage
  const loadCart = async () => {
    if (isAuthenticated && user) {
      try {
        setLoading(true);
        const cartData = await getCart(user.uid);
        setCartProducts(cartData.items || []);
        calculateTotal(cartData.items || []);
      } catch (error) {
        console.error("Error loading cart:", error);
        ToastNotification("error", "Failed to load cart");
      } finally {
        setLoading(false);
      }
    } else {
      // Load from localStorage for guest users
      const localCart = JSON.parse(
        localStorage.getItem("cart") || '{"items":[]}'
      );
      setCartProducts(localCart.items || []);
      calculateTotal(localCart.items || []);
    }
  };

  // Calculate cart total
  const calculateTotal = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setCartTotal(total);
  };

  // Save to localStorage for guest users
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("cart", JSON.stringify({ items: cartProducts }));
      calculateTotal(cartProducts);
    }
  }, [cartProducts, isAuthenticated]);

  // Add to cart
  const handleAddToCart = async (product, variation = null, quantity = 1) => {
    try {
      if (isAuthenticated && user) {
        const cartItem = {
          product_id: product.id,
          variation_id: variation?.id || null,
          quantity: quantity,
          price: variation?.sale_price || product.sale_price,
        };

        const updatedCart = await addToCart(user.uid, cartItem);
        setCartProducts(updatedCart.items || []);
        calculateTotal(updatedCart.items || []);
        ToastNotification("success", "Added to cart");
        setCartCanvas(true);
      } else {
        // Guest user - add to localStorage
        const newItem = {
          product_id: product.id,
          product: product,
          variation_id: variation?.id || null,
          variation: variation,
          quantity: quantity,
          price: variation?.sale_price || product.sale_price,
        };

        const existingIndex = cartProducts.findIndex(
          (item) =>
            item.product_id === newItem.product_id &&
            item.variation_id === newItem.variation_id
        );

        if (existingIndex > -1) {
          const updated = [...cartProducts];
          updated[existingIndex].quantity += quantity;
          setCartProducts(updated);
        } else {
          setCartProducts([...cartProducts, newItem]);
        }

        ToastNotification("success", "Added to cart");
        setCartCanvas(true);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      ToastNotification("error", "Failed to add to cart");
    }
  };

  // Update cart item quantity
  const handleUpdateQuantity = async (productId, variationId, newQuantity) => {
    try {
      if (isAuthenticated && user) {
        if (newQuantity <= 0) {
          await handleRemoveFromCart(productId, variationId);
        } else {
          const updatedCart = await updateCartItem(
            user.uid,
            productId,
            variationId,
            newQuantity
          );
          setCartProducts(updatedCart.items || []);
          calculateTotal(updatedCart.items || []);
        }
      } else {
        // Guest user
        const updated = cartProducts
          .map((item) => {
            if (
              item.product_id === productId &&
              item.variation_id === variationId
            ) {
              return { ...item, quantity: newQuantity };
            }
            return item;
          })
          .filter((item) => item.quantity > 0);

        setCartProducts(updated);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      ToastNotification("error", "Failed to update cart");
    }
  };

  // Remove from cart
  const handleRemoveFromCart = async (productId, variationId = null) => {
    try {
      if (isAuthenticated && user) {
        const updatedCart = await removeFromCart(
          user.uid,
          productId,
          variationId
        );
        setCartProducts(updatedCart.items || []);
        calculateTotal(updatedCart.items || []);
        ToastNotification("success", "Removed from cart");
      } else {
        // Guest user
        const updated = cartProducts.filter(
          (item) =>
            !(
              item.product_id === productId && item.variation_id === variationId
            )
        );
        setCartProducts(updated);
        ToastNotification("success", "Removed from cart");
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      ToastNotification("error", "Failed to remove from cart");
    }
  };

  // Clear entire cart
  const handleClearCart = async () => {
    try {
      if (isAuthenticated && user) {
        await clearCart(user.uid);
        setCartProducts([]);
        setCartTotal(0);
      } else {
        setCartProducts([]);
        setCartTotal(0);
        localStorage.removeItem("cart");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      ToastNotification("error", "Failed to clear cart");
    }
  };

  // Increment/Decrement handler (keeping interface for backward compatibility)
  const handleIncDec = async (
    qty,
    productObj,
    isProductQty,
    setIsProductQty,
    isOpenFun,
    cloneVariation
  ) => {
    const variation = cloneVariation?.selectedVariation || null;
    const currentItem = cartProducts.find(
      (item) =>
        item.product_id === productObj.id && item.variation_id === variation?.id
    );

    const newQuantity = currentItem ? currentItem.quantity + qty : qty;

    if (newQuantity <= 0) {
      await handleRemoveFromCart(productObj.id, variation?.id);
    } else {
      await handleAddToCart(productObj, variation, qty);
    }

    if (setIsProductQty) setIsProductQty(newQuantity);
    if (isOpenFun) isOpenFun(true);
  };

  // Get total (for backward compatibility)
  const getTotal = (items) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        ...props,
        cartProducts,
        setCartProducts,
        cartTotal,
        setCartTotal,
        loading,
        handleAddToCart,
        handleUpdateQuantity,
        handleRemoveFromCart: handleRemoveFromCart,
        removeCart: handleRemoveFromCart, // Alias for backward compatibility
        handleClearCart,
        getTotal,
        handleIncDec,
        variationModal,
        setVariationModal,
        loadCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
