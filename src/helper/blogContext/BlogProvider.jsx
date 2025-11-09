"use client";

import { useEffect, useState } from "react";
import BlogContext from ".";
import { getBlogs, getBlogById, getBlogBySlug } from "@/services/blogService";

const BlogProvider = (props) => {
  const [blogState, setBlogState] = useState([]);
  const [blogParams, setBlogParams] = useState("");
  const [blogContextLoader, setBlogContextLoader] = useState(false);

  // Load blogs on mount
  useEffect(() => {
    loadBlogs();
  }, []);

  // Load blogs from Firebase
  const loadBlogs = async (filters = {}) => {
    try {
      setBlogContextLoader(true);
      const blogsData = await getBlogs({ status: 1, ...filters });
      setBlogState(blogsData);
    } catch (error) {
      console.error("Error loading blogs:", error);
      setBlogState([]);
    } finally {
      setBlogContextLoader(false);
    }
  };

  // Refetch blogs
  const refetch = () => {
    loadBlogs();
  };

  // Handle query params
  const handleSetQueryParams = (value) => {
    setBlogParams(value);
  };

  // Get blog by ID
  const getBlog = async (blogId) => {
    try {
      return await getBlogById(blogId);
    } catch (error) {
      console.error("Error getting blog:", error);
      return null;
    }
  };

  // Get blog by slug
  const getBlogSlug = async (slug) => {
    try {
      return await getBlogBySlug(slug);
    } catch (error) {
      console.error("Error getting blog by slug:", error);
      return null;
    }
  };

  return (
    <BlogContext.Provider
      value={{
        handleSetQueryParams,
        blogParams,
        blogState,
        setBlogParams,
        setBlogState,
        blogContextLoader,
        loadBlogs,
        refetch,
        getBlog,
        getBlogSlug,
        ...props,
      }}
    >
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;
