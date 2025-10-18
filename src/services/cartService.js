// Cart Service for Firestore
// src/services/cartService.js

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { db } from '@/config/firebase.config';

/**
 * Get user's cart
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Cart data
 */
export const getCart = async (userId) => {
  try {
    const cartDoc = await getDoc(doc(db, 'carts', userId));
    
    if (!cartDoc.exists()) {
      // Return empty cart if doesn't exist
      return {
        user_id: userId,
        items: [],
        updated_at: new Date()
      };
    }

    return {
      ...cartDoc.data(),
      updated_at: cartDoc.data().updated_at?.toDate()
    };
  } catch (error) {
    console.error('Error getting cart:', error);
    throw error;
  }
};

/**
 * Add item to cart
 * @param {string} userId - User ID
 * @param {Object} item - Cart item
 * @returns {Promise<Object>} Updated cart
 */
export const addToCart = async (userId, item) => {
  try {
    const cartRef = doc(db, 'carts', userId);
    const cartDoc = await getDoc(cartRef);

    const cartItem = {
      product_id: item.product_id,
      variation_id: item.variation_id || null,
      quantity: item.quantity || 1,
      price: item.price
    };

    if (!cartDoc.exists()) {
      // Create new cart
      await setDoc(cartRef, {
        user_id: userId,
        items: [cartItem],
        updated_at: serverTimestamp()
      });
    } else {
      // Update existing cart
      const cartData = cartDoc.data();
      const existingItems = cartData.items || [];
      
      // Check if item already exists
      const existingItemIndex = existingItems.findIndex(
        i => i.product_id === cartItem.product_id && 
             i.variation_id === cartItem.variation_id
      );

      if (existingItemIndex > -1) {
        // Update quantity
        existingItems[existingItemIndex].quantity += cartItem.quantity;
        await updateDoc(cartRef, {
          items: existingItems,
          updated_at: serverTimestamp()
        });
      } else {
        // Add new item
        await updateDoc(cartRef, {
          items: arrayUnion(cartItem),
          updated_at: serverTimestamp()
        });
      }
    }

    return await getCart(userId);
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

/**
 * Update cart item quantity
 * @param {string} userId - User ID
 * @param {string} productId - Product ID
 * @param {string} variationId - Variation ID (optional)
 * @param {number} quantity - New quantity
 * @returns {Promise<Object>} Updated cart
 */
export const updateCartItem = async (userId, productId, variationId, quantity) => {
  try {
    const cartRef = doc(db, 'carts', userId);
    const cartDoc = await getDoc(cartRef);

    if (!cartDoc.exists()) {
      throw new Error('Cart not found');
    }

    const cartData = cartDoc.data();
    const items = cartData.items || [];
    
    const itemIndex = items.findIndex(
      i => i.product_id === productId && i.variation_id === variationId
    );

    if (itemIndex === -1) {
      throw new Error('Item not found in cart');
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      items.splice(itemIndex, 1);
    } else {
      // Update quantity
      items[itemIndex].quantity = quantity;
    }

    await updateDoc(cartRef, {
      items: items,
      updated_at: serverTimestamp()
    });

    return await getCart(userId);
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

/**
 * Remove item from cart
 * @param {string} userId - User ID
 * @param {string} productId - Product ID
 * @param {string} variationId - Variation ID (optional)
 * @returns {Promise<Object>} Updated cart
 */
export const removeFromCart = async (userId, productId, variationId = null) => {
  try {
    const cartRef = doc(db, 'carts', userId);
    const cartDoc = await getDoc(cartRef);

    if (!cartDoc.exists()) {
      throw new Error('Cart not found');
    }

    const cartData = cartDoc.data();
    const items = cartData.items || [];
    
    const updatedItems = items.filter(
      i => !(i.product_id === productId && i.variation_id === variationId)
    );

    await updateDoc(cartRef, {
      items: updatedItems,
      updated_at: serverTimestamp()
    });

    return await getCart(userId);
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

/**
 * Clear entire cart
 * @param {string} userId - User ID
 * @returns {Promise<void>}
 */
export const clearCart = async (userId) => {
  try {
    const cartRef = doc(db, 'carts', userId);
    await updateDoc(cartRef, {
      items: [],
      updated_at: serverTimestamp()
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};

/**
 * Replace cart (useful for syncing)
 * @param {string} userId - User ID
 * @param {Array} items - New cart items
 * @returns {Promise<Object>} Updated cart
 */
export const replaceCart = async (userId, items) => {
  try {
    const cartRef = doc(db, 'carts', userId);
    
    await setDoc(cartRef, {
      user_id: userId,
      items: items,
      updated_at: serverTimestamp()
    }, { merge: true });

    return await getCart(userId);
  } catch (error) {
    console.error('Error replacing cart:', error);
    throw error;
  }
};

