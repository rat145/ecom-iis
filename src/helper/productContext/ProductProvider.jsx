"use client";

import React, { useEffect, useState } from "react";
import ProductContext from ".";
import {
  getProducts,
  getProductById,
  getProductBySlug,
} from "@/services/productService";

const ProductProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState([]);
  const [productIsLoading, setProductIsLoading] = useState(false);
  const [productAPIData, setProductAPIData] = useState({
    data: [],
    productIsLoading: false,
    params: {},
  });

  // Load all products on mount
  useEffect(() => {
    loadProducts();
  }, []);

  // Load products from Firebase
  const loadProducts = async (filters = {}) => {
    try {
      setProductIsLoading(true);
      const productsData = await getProducts({ status: 1, ...filters });
      setProducts(productsData);
      setProductData(productsData);
      setProductAPIData({
        data: productsData,
        productIsLoading: false,
        params: filters,
      });
    } catch (error) {
      console.error("Error loading products:", error);
      setProducts([]);
      setProductData([]);
      setProductAPIData({
        data: [],
        productIsLoading: false,
        params: filters,
      });
    } finally {
      setProductIsLoading(false);
    }
  };

  // Load featured products
  const loadFeaturedProducts = async (limit = 10) => {
    try {
      const productsData = await getProducts({
        is_featured: 1,
        status: 1,
        limit,
      });
      return productsData;
    } catch (error) {
      console.error("Error loading featured products:", error);
      return [];
    }
  };

  // Load trending products
  const loadTrendingProducts = async (limit = 10) => {
    try {
      const productsData = await getProducts({
        is_trending: 1,
        status: 1,
        limit,
      });
      return productsData;
    } catch (error) {
      console.error("Error loading trending products:", error);
      return [];
    }
  };

  // Load products by category
  const loadProductsByCategory = async (categoryId, limit = 20) => {
    try {
      const productsData = await getProducts({
        category: categoryId,
        status: 1,
        limit,
      });
      return productsData;
    } catch (error) {
      console.error("Error loading products by category:", error);
      return [];
    }
  };

  // Search products
  const searchProducts = async (searchTerm) => {
    try {
      const productsData = await getProducts({
        search: searchTerm,
        status: 1,
      });
      return productsData;
    } catch (error) {
      console.error("Error searching products:", error);
      return [];
    }
  };

  // Get single product by ID
  const getProduct = async (productId) => {
    try {
      return await getProductById(productId);
    } catch (error) {
      console.error("Error getting product:", error);
      return null;
    }
  };

  // Get product by slug
  const getProductSlug = async (slug) => {
    try {
      return await getProductBySlug(slug);
    } catch (error) {
      console.error("Error getting product by slug:", error);
      return null;
    }
  };

  // Refetch products (for compatibility with existing code)
  const productRefetch = () => {
    loadProducts();
  };

  // Custom product state (for compatibility)
  const [customProduct, setCustomProduct] = useState([]);
  const [totalDealIds, setTotalDealIds] = useState("");

  return (
    <ProductContext.Provider
      value={{
        ...props,
        products,
        productData,
        productAPIData,
        setProductAPIData,
        productIsLoading,
        customProduct,
        setCustomProduct,
        totalDealIds,
        setTotalDealIds,
        loadProducts,
        loadFeaturedProducts,
        loadTrendingProducts,
        loadProductsByCategory,
        searchProducts,
        getProduct,
        getProductSlug,
        productRefetch,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
