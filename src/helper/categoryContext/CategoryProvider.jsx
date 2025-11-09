"use client";

import React, { useEffect, useState } from "react";
import CategoryContext from ".";
import {
  getCategories,
  getCategoryById,
  getCategoryBySlug,
} from "@/services/categoryService";

const CategoryProvider = (props) => {
  const [categories, setCategories] = useState([]);
  const [categoryIsLoading, setCategoryIsLoading] = useState(false);
  const [categoryAPIData, setCategoryAPIData] = useState({
    data: [],
    categoryIsLoading: false,
  });

  // Load all categories on mount
  useEffect(() => {
    loadCategories();
  }, []);

  // Load categories from Firebase
  const loadCategories = async (filters = {}) => {
    try {
      setCategoryIsLoading(true);
      const categoriesData = await getCategories({ status: 1, ...filters });
      setCategories(categoriesData);
      setCategoryAPIData({
        data: categoriesData,
        categoryIsLoading: false,
      });
    } catch (error) {
      console.error("Error loading categories:", error);
      setCategories([]);
      setCategoryAPIData({
        data: [],
        categoryIsLoading: false,
      });
    } finally {
      setCategoryIsLoading(false);
    }
  };

  // Filter categories by type (product, blog, etc.)
  const filterCategory = (type) => {
    if (!categories || categories.length === 0) {
      return [];
    }
    return categories.filter((category) => category.type === type);
  };

  // Get category tree structure
  const getCategoryTree = async () => {
    try {
      return await getCategories({ tree: true, status: 1 });
    } catch (error) {
      console.error("Error getting category tree:", error);
      return [];
    }
  };

  // Get single category by ID
  const getCategory = async (categoryId) => {
    try {
      return await getCategoryById(categoryId);
    } catch (error) {
      console.error("Error getting category:", error);
      return null;
    }
  };

  // Get category by slug
  const getCategorySlug = async (slug) => {
    try {
      return await getCategoryBySlug(slug);
    } catch (error) {
      console.error("Error getting category by slug:", error);
      return null;
    }
  };

  // Refetch categories (for compatibility with existing code)
  const refetchCategory = () => {
    loadCategories();
  };

  return (
    <CategoryContext.Provider
      value={{
        ...props,
        categories,
        categoryAPIData,
        setCategoryAPIData,
        categoryIsLoading,
        filterCategory,
        loadCategories,
        getCategoryTree,
        getCategory,
        getCategorySlug,
        refetchCategory,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
