// Product Service for Firestore
// src/services/productService.js

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  increment
} from 'firebase/firestore';
import { db } from '@/config/firebase.config';

/**
 * Get all products with optional filters
 * @param {Object} filters - Filter options
 * @returns {Promise<Array>} Array of products
 */
export const getProducts = async (filters = {}) => {
  try {
    const productsRef = collection(db, 'products');
    let q = query(productsRef);

    // Apply filters
    if (filters.category) {
      q = query(q, where('category_ids', 'array-contains', filters.category));
    }

    if (filters.store_id) {
      q = query(q, where('store_id', '==', filters.store_id));
    }

    if (filters.is_featured) {
      q = query(q, where('is_featured', '==', 1));
    }

    if (filters.is_trending) {
      q = query(q, where('is_trending', '==', 1));
    }

    if (filters.status !== undefined) {
      q = query(q, where('status', '==', filters.status));
    } else {
      // Default: only active products
      q = query(q, where('status', '==', 1));
    }

    // Apply sorting
    if (filters.sortBy === 'price_asc') {
      q = query(q, orderBy('sale_price', 'asc'));
    } else if (filters.sortBy === 'price_desc') {
      q = query(q, orderBy('sale_price', 'desc'));
    } else if (filters.sortBy === 'name_asc') {
      q = query(q, orderBy('name', 'asc'));
    } else if (filters.sortBy === 'name_desc') {
      q = query(q, orderBy('name', 'desc'));
    } else {
      q = query(q, orderBy('created_at', 'desc'));
    }

    // Apply pagination
    if (filters.limit) {
      q = query(q, limit(filters.limit));
    }

    if (filters.startAfter) {
      q = query(q, startAfter(filters.startAfter));
    }

    const querySnapshot = await getDocs(q);
    const products = [];

    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });

    // Client-side search filter (if needed)
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      return products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description?.toLowerCase().includes(searchTerm)
      );
    }

    return products;
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};

/**
 * Get a single product by ID
 * @param {string} productId - Product ID
 * @returns {Promise<Object>} Product data
 */
export const getProductById = async (productId) => {
  try {
    const productDoc = await getDoc(doc(db, 'products', productId));
    
    if (!productDoc.exists()) {
      throw new Error('Product not found');
    }

    return {
      id: productDoc.id,
      ...productDoc.data()
    };
  } catch (error) {
    console.error('Error getting product:', error);
    throw error;
  }
};

/**
 * Get a product by slug
 * @param {string} slug - Product slug
 * @returns {Promise<Object>} Product data
 */
export const getProductBySlug = async (slug) => {
  try {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('slug', '==', slug), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error('Product not found');
    }

    const productDoc = querySnapshot.docs[0];
    return {
      id: productDoc.id,
      ...productDoc.data()
    };
  } catch (error) {
    console.error('Error getting product by slug:', error);
    throw error;
  }
};

/**
 * Create a new product (Admin only)
 * @param {Object} productData - Product data
 * @param {string} userId - User ID creating the product
 * @returns {Promise<Object>} Created product
 */
export const createProduct = async (productData, userId) => {
  try {
    const productsRef = collection(db, 'products');
    
    const newProduct = {
      ...productData,
      created_by_id: userId,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      orders_count: 0,
      reviews_count: 0,
      rating_count: 0
    };

    const docRef = await addDoc(productsRef, newProduct);

    return {
      id: docRef.id,
      ...newProduct
    };
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

/**
 * Update a product (Admin only)
 * @param {string} productId - Product ID
 * @param {Object} productData - Updated product data
 * @returns {Promise<Object>} Updated product
 */
export const updateProduct = async (productId, productData) => {
  try {
    const productRef = doc(db, 'products', productId);
    
    const updatedData = {
      ...productData,
      updated_at: serverTimestamp()
    };

    await updateDoc(productRef, updatedData);

    return {
      id: productId,
      ...updatedData
    };
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

/**
 * Delete a product (Admin only)
 * @param {string} productId - Product ID
 * @returns {Promise<void>}
 */
export const deleteProduct = async (productId) => {
  try {
    await deleteDoc(doc(db, 'products', productId));
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

/**
 * Get related products
 * @param {string} productId - Product ID
 * @param {number} limitCount - Number of products to return
 * @returns {Promise<Array>} Array of related products
 */
export const getRelatedProducts = async (productId, limitCount = 6) => {
  try {
    const product = await getProductById(productId);
    
    if (product.related_product_ids && product.related_product_ids.length > 0) {
      // Get specific related products
      const relatedProducts = [];
      for (const relatedId of product.related_product_ids.slice(0, limitCount)) {
        try {
          const relatedProduct = await getProductById(relatedId);
          relatedProducts.push(relatedProduct);
        } catch (error) {
          console.error(`Error getting related product ${relatedId}:`, error);
        }
      }
      return relatedProducts;
    } else {
      // Get random products from same category
      const productsRef = collection(db, 'products');
      const q = query(
        productsRef,
        where('category_ids', 'array-contains-any', product.category_ids || []),
        where('status', '==', 1),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      const products = [];
      
      querySnapshot.forEach((doc) => {
        if (doc.id !== productId) {
          products.push({
            id: doc.id,
            ...doc.data()
          });
        }
      });
      
      return products;
    }
  } catch (error) {
    console.error('Error getting related products:', error);
    throw error;
  }
};

/**
 * Increment product view count
 * @param {string} productId - Product ID
 * @returns {Promise<void>}
 */
export const incrementProductViews = async (productId) => {
  try {
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, {
      views_count: increment(1)
    });
  } catch (error) {
    console.error('Error incrementing product views:', error);
    // Don't throw error, this is not critical
  }
};

