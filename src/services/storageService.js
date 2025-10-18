// Firebase Storage Service
// src/services/storageService.js

import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '@/config/firebase.config';

/**
 * Upload a file to Firebase Storage
 * @param {File} file - File to upload
 * @param {string} path - Storage path (e.g., 'products/product-id/image.jpg')
 * @returns {Promise<string>} Download URL
 */
export const uploadFile = async (file, path) => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

/**
 * Upload product image
 * @param {File} file - Image file
 * @param {string} productId - Product ID
 * @param {string} type - Image type ('thumbnail' | 'gallery' | 'size-chart')
 * @returns {Promise<string>} Download URL
 */
export const uploadProductImage = async (file, productId, type = 'gallery') => {
  try {
    const timestamp = Date.now();
    const fileName = `${type}-${timestamp}-${file.name}`;
    const path = `products/${productId}/${fileName}`;
    return await uploadFile(file, path);
  } catch (error) {
    console.error('Error uploading product image:', error);
    throw error;
  }
};

/**
 * Upload category image
 * @param {File} file - Image file
 * @param {string} categoryId - Category ID
 * @param {string} type - Image type ('image' | 'icon')
 * @returns {Promise<string>} Download URL
 */
export const uploadCategoryImage = async (file, categoryId, type = 'image') => {
  try {
    const timestamp = Date.now();
    const fileName = `${type}-${timestamp}-${file.name}`;
    const path = `categories/${categoryId}/${fileName}`;
    return await uploadFile(file, path);
  } catch (error) {
    console.error('Error uploading category image:', error);
    throw error;
  }
};

/**
 * Upload user avatar
 * @param {File} file - Image file
 * @param {string} userId - User ID
 * @returns {Promise<string>} Download URL
 */
export const uploadUserAvatar = async (file, userId) => {
  try {
    const timestamp = Date.now();
    const fileName = `avatar-${timestamp}-${file.name}`;
    const path = `users/${userId}/${fileName}`;
    return await uploadFile(file, path);
  } catch (error) {
    console.error('Error uploading user avatar:', error);
    throw error;
  }
};

/**
 * Upload store logo
 * @param {File} file - Image file
 * @param {string} storeId - Store ID
 * @param {string} type - Image type ('logo' | 'cover')
 * @returns {Promise<string>} Download URL
 */
export const uploadStoreImage = async (file, storeId, type = 'logo') => {
  try {
    const timestamp = Date.now();
    const fileName = `${type}-${timestamp}-${file.name}`;
    const path = `stores/${storeId}/${fileName}`;
    return await uploadFile(file, path);
  } catch (error) {
    console.error('Error uploading store image:', error);
    throw error;
  }
};

/**
 * Upload blog image
 * @param {File} file - Image file
 * @param {string} blogId - Blog ID
 * @param {string} type - Image type ('thumbnail' | 'content')
 * @returns {Promise<string>} Download URL
 */
export const uploadBlogImage = async (file, blogId, type = 'content') => {
  try {
    const timestamp = Date.now();
    const fileName = `${type}-${timestamp}-${file.name}`;
    const path = `blogs/${blogId}/${fileName}`;
    return await uploadFile(file, path);
  } catch (error) {
    console.error('Error uploading blog image:', error);
    throw error;
  }
};

/**
 * Upload review image
 * @param {File} file - Image file
 * @param {string} reviewId - Review ID
 * @returns {Promise<string>} Download URL
 */
export const uploadReviewImage = async (file, reviewId) => {
  try {
    const timestamp = Date.now();
    const fileName = `review-${timestamp}-${file.name}`;
    const path = `reviews/${reviewId}/${fileName}`;
    return await uploadFile(file, path);
  } catch (error) {
    console.error('Error uploading review image:', error);
    throw error;
  }
};

/**
 * Delete a file from Firebase Storage
 * @param {string} fileUrl - Full download URL of the file
 * @returns {Promise<void>}
 */
export const deleteFile = async (fileUrl) => {
  try {
    // Extract path from URL
    const baseUrl = 'https://firebasestorage.googleapis.com/v0/b/';
    if (!fileUrl.startsWith(baseUrl)) {
      throw new Error('Invalid Firebase Storage URL');
    }

    // Parse the URL to get the file path
    const urlParts = fileUrl.split('/o/');
    if (urlParts.length < 2) {
      throw new Error('Invalid Firebase Storage URL format');
    }

    const pathWithParams = urlParts[1];
    const path = decodeURIComponent(pathWithParams.split('?')[0]);

    const fileRef = ref(storage, path);
    await deleteObject(fileRef);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

/**
 * Upload multiple files
 * @param {File[]} files - Array of files
 * @param {string} basePath - Base storage path
 * @returns {Promise<string[]>} Array of download URLs
 */
export const uploadMultipleFiles = async (files, basePath) => {
  try {
    const uploadPromises = files.map((file, index) => {
      const timestamp = Date.now();
      const fileName = `${timestamp}-${index}-${file.name}`;
      const path = `${basePath}/${fileName}`;
      return uploadFile(file, path);
    });

    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Error uploading multiple files:', error);
    throw error;
  }
};

/**
 * Validate image file
 * @param {File} file - File to validate
 * @param {number} maxSizeMB - Maximum file size in MB
 * @returns {boolean}
 */
export const validateImageFile = (file, maxSizeMB = 5) => {
  // Check file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.');
  }

  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    throw new Error(`File size exceeds ${maxSizeMB}MB limit.`);
  }

  return true;
};

