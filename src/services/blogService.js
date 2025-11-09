// Blog Service for Firestore
// src/services/blogService.js

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
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";

/**
 * Get all blogs with optional filters
 * @param {Object} filters - Filter options
 * @returns {Promise<Array>} Array of blogs
 */
export const getBlogs = async (filters = {}) => {
  try {
    const blogsRef = collection(db, "blogs");
    let q = query(blogsRef);

    // Filter by status
    if (filters.status !== undefined) {
      q = query(q, where("status", "==", filters.status));
    } else {
      // Default: only published blogs
      q = query(q, where("status", "==", 1));
    }

    // Filter by category
    if (filters.category_id) {
      q = query(
        q,
        where("category_ids", "array-contains", filters.category_id)
      );
    }

    // Apply sorting
    if (filters.sortBy === "oldest") {
      q = query(q, orderBy("created_at", "asc"));
    } else {
      q = query(q, orderBy("created_at", "desc"));
    }

    // Apply pagination
    if (filters.limit) {
      q = query(q, limit(filters.limit));
    }

    const querySnapshot = await getDocs(q);
    const blogs = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      blogs.push({
        id: doc.id,
        ...data,
        created_at: data.created_at?.toDate().toISOString(),
        updated_at: data.updated_at?.toDate().toISOString(),
      });
    });

    // Client-side search filter (if needed)
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      return blogs.filter(
        (blog) =>
          blog.title?.toLowerCase().includes(searchTerm) ||
          blog.content?.toLowerCase().includes(searchTerm)
      );
    }

    return blogs;
  } catch (error) {
    console.error("Error getting blogs:", error);
    throw error;
  }
};

/**
 * Get a single blog by ID
 * @param {string} blogId - Blog ID
 * @returns {Promise<Object>} Blog data
 */
export const getBlogById = async (blogId) => {
  try {
    const blogDoc = await getDoc(doc(db, "blogs", blogId));

    if (!blogDoc.exists()) {
      throw new Error("Blog not found");
    }

    const data = blogDoc.data();
    return {
      id: blogDoc.id,
      ...data,
      created_at: data.created_at?.toDate().toISOString(),
      updated_at: data.updated_at?.toDate().toISOString(),
    };
  } catch (error) {
    console.error("Error getting blog:", error);
    throw error;
  }
};

/**
 * Get a blog by slug
 * @param {string} slug - Blog slug
 * @returns {Promise<Object>} Blog data
 */
export const getBlogBySlug = async (slug) => {
  try {
    const blogsRef = collection(db, "blogs");
    const q = query(blogsRef, where("slug", "==", slug), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Blog not found");
    }

    const blogDoc = querySnapshot.docs[0];
    const data = blogDoc.data();
    return {
      id: blogDoc.id,
      ...data,
      created_at: data.created_at?.toDate().toISOString(),
      updated_at: data.updated_at?.toDate().toISOString(),
    };
  } catch (error) {
    console.error("Error getting blog by slug:", error);
    throw error;
  }
};

/**
 * Create a new blog (Admin only)
 * @param {Object} blogData - Blog data
 * @param {string} userId - User ID creating the blog
 * @returns {Promise<Object>} Created blog
 */
export const createBlog = async (blogData, userId) => {
  try {
    const blogsRef = collection(db, "blogs");

    const newBlog = {
      ...blogData,
      created_by_id: userId,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      views_count: 0,
      comments_count: 0,
    };

    const docRef = await addDoc(blogsRef, newBlog);

    return {
      id: docRef.id,
      ...newBlog,
    };
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
};

/**
 * Update a blog (Admin only)
 * @param {string} blogId - Blog ID
 * @param {Object} blogData - Updated blog data
 * @returns {Promise<Object>} Updated blog
 */
export const updateBlog = async (blogId, blogData) => {
  try {
    const blogRef = doc(db, "blogs", blogId);

    const updatedData = {
      ...blogData,
      updated_at: serverTimestamp(),
    };

    await updateDoc(blogRef, updatedData);

    return {
      id: blogId,
      ...updatedData,
    };
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

/**
 * Delete a blog (Admin only)
 * @param {string} blogId - Blog ID
 * @returns {Promise<void>}
 */
export const deleteBlog = async (blogId) => {
  try {
    await deleteDoc(doc(db, "blogs", blogId));
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};

/**
 * Get related blogs
 * @param {string} blogId - Blog ID
 * @param {number} limitCount - Number of blogs to return
 * @returns {Promise<Array>} Array of related blogs
 */
export const getRelatedBlogs = async (blogId, limitCount = 3) => {
  try {
    const blog = await getBlogById(blogId);

    // Get blogs from same category
    const blogsRef = collection(db, "blogs");
    const q = query(
      blogsRef,
      where("category_ids", "array-contains-any", blog.category_ids || []),
      where("status", "==", 1),
      orderBy("created_at", "desc"),
      limit(limitCount + 1)
    );

    const querySnapshot = await getDocs(q);
    const blogs = [];

    querySnapshot.forEach((doc) => {
      if (doc.id !== blogId) {
        const data = doc.data();
        blogs.push({
          id: doc.id,
          ...data,
          created_at: data.created_at?.toDate().toISOString(),
          updated_at: data.updated_at?.toDate().toISOString(),
        });
      }
    });

    return blogs.slice(0, limitCount);
  } catch (error) {
    console.error("Error getting related blogs:", error);
    return [];
  }
};
