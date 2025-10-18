// Category Service for Firestore
// src/services/categoryService.js

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
  serverTimestamp
} from 'firebase/firestore';
import { db } from '@/config/firebase.config';

/**
 * Get all categories with optional filters
 * @param {Object} filters - Filter options
 * @returns {Promise<Array>} Array of categories
 */
export const getCategories = async (filters = {}) => {
  try {
    const categoriesRef = collection(db, 'categories');
    let q = query(categoriesRef);

    // Filter by type
    if (filters.type) {
      q = query(q, where('type', '==', filters.type));
    }

    // Filter by status
    if (filters.status !== undefined) {
      q = query(q, where('status', '==', filters.status));
    } else {
      // Default: only active categories
      q = query(q, where('status', '==', 1));
    }

    // Filter by parent
    if (filters.parent_id !== undefined) {
      q = query(q, where('parent_id', '==', filters.parent_id));
    }

    // Apply sorting
    q = query(q, orderBy('name', 'asc'));

    const querySnapshot = await getDocs(q);
    const categories = [];

    querySnapshot.forEach((doc) => {
      categories.push({
        id: doc.id,
        ...doc.data()
      });
    });

    // Build category tree if needed
    if (filters.tree) {
      return buildCategoryTree(categories);
    }

    return categories;
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
};

/**
 * Build category tree structure
 * @param {Array} categories - Flat array of categories
 * @returns {Array} Tree structure of categories
 */
const buildCategoryTree = (categories) => {
  const categoryMap = {};
  const tree = [];

  // Create a map of categories
  categories.forEach(category => {
    categoryMap[category.id] = { ...category, subcategories: [] };
  });

  // Build tree structure
  categories.forEach(category => {
    if (category.parent_id && categoryMap[category.parent_id]) {
      categoryMap[category.parent_id].subcategories.push(categoryMap[category.id]);
    } else {
      tree.push(categoryMap[category.id]);
    }
  });

  return tree;
};

/**
 * Get a single category by ID
 * @param {string} categoryId - Category ID
 * @returns {Promise<Object>} Category data
 */
export const getCategoryById = async (categoryId) => {
  try {
    const categoryDoc = await getDoc(doc(db, 'categories', categoryId));
    
    if (!categoryDoc.exists()) {
      throw new Error('Category not found');
    }

    return {
      id: categoryDoc.id,
      ...categoryDoc.data()
    };
  } catch (error) {
    console.error('Error getting category:', error);
    throw error;
  }
};

/**
 * Get a category by slug
 * @param {string} slug - Category slug
 * @returns {Promise<Object>} Category data
 */
export const getCategoryBySlug = async (slug) => {
  try {
    const categoriesRef = collection(db, 'categories');
    const q = query(categoriesRef, where('slug', '==', slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error('Category not found');
    }

    const categoryDoc = querySnapshot.docs[0];
    return {
      id: categoryDoc.id,
      ...categoryDoc.data()
    };
  } catch (error) {
    console.error('Error getting category by slug:', error);
    throw error;
  }
};

/**
 * Create a new category (Admin only)
 * @param {Object} categoryData - Category data
 * @returns {Promise<Object>} Created category
 */
export const createCategory = async (categoryData) => {
  try {
    const categoriesRef = collection(db, 'categories');
    
    const newCategory = {
      ...categoryData,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      products_count: 0
    };

    const docRef = await addDoc(categoriesRef, newCategory);

    return {
      id: docRef.id,
      ...newCategory
    };
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

/**
 * Update a category (Admin only)
 * @param {string} categoryId - Category ID
 * @param {Object} categoryData - Updated category data
 * @returns {Promise<Object>} Updated category
 */
export const updateCategory = async (categoryId, categoryData) => {
  try {
    const categoryRef = doc(db, 'categories', categoryId);
    
    const updatedData = {
      ...categoryData,
      updated_at: serverTimestamp()
    };

    await updateDoc(categoryRef, updatedData);

    return {
      id: categoryId,
      ...updatedData
    };
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

/**
 * Delete a category (Admin only)
 * @param {string} categoryId - Category ID
 * @returns {Promise<void>}
 */
export const deleteCategory = async (categoryId) => {
  try {
    await deleteDoc(doc(db, 'categories', categoryId));
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

/**
 * Get subcategories of a category
 * @param {string} parentId - Parent category ID
 * @returns {Promise<Array>} Array of subcategories
 */
export const getSubcategories = async (parentId) => {
  try {
    const categoriesRef = collection(db, 'categories');
    const q = query(
      categoriesRef,
      where('parent_id', '==', parentId),
      where('status', '==', 1),
      orderBy('name', 'asc')
    );

    const querySnapshot = await getDocs(q);
    const subcategories = [];

    querySnapshot.forEach((doc) => {
      subcategories.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return subcategories;
  } catch (error) {
    console.error('Error getting subcategories:', error);
    throw error;
  }
};

