// Wishlist and Review Services for Firestore
// src/services/wishlistReviewService.js

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  increment,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { reviewValidationSchema } from "@/utils/validation/schemas";

// ============ WISHLIST SERVICES ============

/**
 * Get user's wishlist
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Wishlist data
 */
export const getWishlist = async (userId) => {
  try {
    const wishlistDoc = await getDoc(doc(db, "wishlists", userId));

    if (!wishlistDoc.exists()) {
      return {
        user_id: userId,
        product_ids: [],
      };
    }

    return wishlistDoc.data();
  } catch (error) {
    console.error("Error getting wishlist:", error);
    throw error;
  }
};

/**
 * Add product to wishlist
 * @param {string} userId - User ID
 * @param {string} productId - Product ID
 * @returns {Promise<Object>} Updated wishlist
 */
export const addToWishlist = async (userId, productId) => {
  try {
    const wishlistRef = doc(db, "wishlists", userId);
    const wishlistDoc = await getDoc(wishlistRef);

    if (!wishlistDoc.exists()) {
      // Create new wishlist
      await setDoc(wishlistRef, {
        user_id: userId,
        product_ids: [productId],
        updated_at: serverTimestamp(),
      });
    } else {
      // Add to existing wishlist
      await updateDoc(wishlistRef, {
        product_ids: arrayUnion(productId),
        updated_at: serverTimestamp(),
      });
    }

    return await getWishlist(userId);
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
};

/**
 * Remove product from wishlist
 * @param {string} userId - User ID
 * @param {string} productId - Product ID
 * @returns {Promise<Object>} Updated wishlist
 */
export const removeFromWishlist = async (userId, productId) => {
  try {
    const wishlistRef = doc(db, "wishlists", userId);

    await updateDoc(wishlistRef, {
      product_ids: arrayRemove(productId),
      updated_at: serverTimestamp(),
    });

    return await getWishlist(userId);
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    throw error;
  }
};

/**
 * Check if product is in wishlist
 * @param {string} userId - User ID
 * @param {string} productId - Product ID
 * @returns {Promise<boolean>}
 */
export const isInWishlist = async (userId, productId) => {
  try {
    const wishlist = await getWishlist(userId);
    return wishlist.product_ids.includes(productId);
  } catch (error) {
    console.error("Error checking wishlist:", error);
    return false;
  }
};

// ============ REVIEW SERVICES ============

/**
 * Get product reviews
 * @param {string} productId - Product ID
 * @param {Object} filters - Filter options
 * @returns {Promise<Array>} Array of reviews
 */
export const getProductReviews = async (productId, filters = {}) => {
  try {
    const reviewsRef = collection(db, "reviews");
    let q = query(reviewsRef, where("product_id", "==", productId));

    // Filter by status
    if (filters.status !== undefined) {
      q = query(q, where("status", "==", filters.status));
    } else {
      // Default: only approved reviews
      q = query(q, where("status", "==", 1));
    }

    // Apply sorting
    q = query(q, orderBy("created_at", "desc"));

    const querySnapshot = await getDocs(q);
    const reviews = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      reviews.push({
        id: doc.id,
        ...data,
        created_at: data.created_at?.toDate().toISOString(),
        updated_at: data.updated_at?.toDate().toISOString(),
      });
    });

    return reviews;
  } catch (error) {
    console.error("Error getting reviews:", error);
    throw error;
  }
};

/**
 * Get user's reviews
 * @param {string} userId - User ID
 * @returns {Promise<Array>} Array of reviews
 */
export const getUserReviews = async (userId) => {
  try {
    const reviewsRef = collection(db, "reviews");
    const q = query(
      reviewsRef,
      where("user_id", "==", userId),
      orderBy("created_at", "desc")
    );

    const querySnapshot = await getDocs(q);
    const reviews = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      reviews.push({
        id: doc.id,
        ...data,
        created_at: data.created_at?.toDate().toISOString(),
        updated_at: data.updated_at?.toDate().toISOString(),
      });
    });

    return reviews;
  } catch (error) {
    console.error("Error getting user reviews:", error);
    throw error;
  }
};

/**
 * Create a review
 * @param {string} userId - User ID
 * @param {Object} reviewData - Review data
 * @returns {Promise<Object>} Created review
 */
export const createReview = async (userId, reviewData) => {
  try {
    // Validate input
    await reviewValidationSchema.validate(reviewData);
    const reviewsRef = collection(db, "reviews");

    // Check if user already reviewed this product
    const existingReviewQuery = query(
      reviewsRef,
      where("user_id", "==", userId),
      where("product_id", "==", reviewData.product_id)
    );
    const existingReviews = await getDocs(existingReviewQuery);

    if (!existingReviews.empty) {
      throw new Error("You have already reviewed this product");
    }

    const newReview = {
      product_id: reviewData.product_id,
      user_id: userId,
      rating: reviewData.rating,
      comment: reviewData.comment || "",
      images: reviewData.images || [],
      status: 0, // Pending approval
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    };

    const docRef = await addDoc(reviewsRef, newReview);

    // Update product review count and rating
    const productRef = doc(db, "products", reviewData.product_id);
    await updateDoc(productRef, {
      reviews_count: increment(1),
    });

    // Recalculate average rating
    await recalculateProductRating(reviewData.product_id);

    return {
      id: docRef.id,
      ...newReview,
    };
  } catch (error) {
    if (error.name === "ValidationError") {
      throw new Error(`Validation failed: ${error.message}`);
    }
    console.error("Error creating review:", error);
    throw error;
  }
};

/**
 * Update a review
 * @param {string} reviewId - Review ID
 * @param {string} userId - User ID (for verification)
 * @param {Object} updates - Updates to apply
 * @returns {Promise<Object>} Updated review
 */
export const updateReview = async (reviewId, userId, updates) => {
  try {
    const reviewRef = doc(db, "reviews", reviewId);
    const reviewDoc = await getDoc(reviewRef);

    if (!reviewDoc.exists()) {
      throw new Error("Review not found");
    }

    const reviewData = reviewDoc.data();

    // Verify user owns this review
    if (reviewData.user_id !== userId) {
      throw new Error("Unauthorized to update this review");
    }

    const updatedData = {
      ...updates,
      updated_at: serverTimestamp(),
    };

    await updateDoc(reviewRef, updatedData);

    // Recalculate product rating if rating changed
    if (updates.rating) {
      await recalculateProductRating(reviewData.product_id);
    }

    return {
      id: reviewId,
      ...reviewData,
      ...updatedData,
    };
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};

/**
 * Delete a review
 * @param {string} reviewId - Review ID
 * @param {string} userId - User ID (for verification)
 * @returns {Promise<void>}
 */
export const deleteReview = async (reviewId, userId) => {
  try {
    const reviewRef = doc(db, "reviews", reviewId);
    const reviewDoc = await getDoc(reviewRef);

    if (!reviewDoc.exists()) {
      throw new Error("Review not found");
    }

    const reviewData = reviewDoc.data();

    // Verify user owns this review
    if (reviewData.user_id !== userId) {
      throw new Error("Unauthorized to delete this review");
    }

    await deleteDoc(reviewRef);

    // Update product review count
    const productRef = doc(db, "products", reviewData.product_id);
    await updateDoc(productRef, {
      reviews_count: increment(-1),
    });

    // Recalculate average rating
    await recalculateProductRating(reviewData.product_id);
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};

/**
 * Recalculate product average rating
 * @param {string} productId - Product ID
 * @returns {Promise<void>}
 */
const recalculateProductRating = async (productId) => {
  try {
    const reviews = await getProductReviews(productId);

    if (reviews.length === 0) {
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, {
        rating_count: 0,
      });
      return;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, {
      rating_count: parseFloat(averageRating.toFixed(1)),
    });
  } catch (error) {
    console.error("Error recalculating product rating:", error);
  }
};
