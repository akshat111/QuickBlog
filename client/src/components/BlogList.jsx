import React, { useState, useMemo } from "react";
import { blogCategories } from "../assets/assets";
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  // Performance Optimization: Combine text search and category filter into a single pass
  // and memoize the result to reduce redundant re-renders and computations on large lists.
  const filteredBlogs = useMemo(() => {
    if (!blogs) return [];

    // Cache the lowercase input outside the loop for O(1) string access
    const searchInput = input ? input.toLowerCase() : "";
    const isSearchEmpty = searchInput === "";

    return blogs.filter((blog) => {
      // 1. Check category first (faster check)
      const matchesCategory = menu === "All" || blog.category === menu;
      if (!matchesCategory) return false;

      // 2. Then check search text if necessary
      if (isSearchEmpty) return true;

      return (
        blog.title.toLowerCase().includes(searchInput) ||
        blog.category.toLowerCase().includes(searchInput)
      );
    });
  }, [blogs, input, menu]);

  return (
    <div>
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer text-gray-500 ${
                menu === item && "text-white px-4 pt-0.5 "
              }`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full"
                ></motion.div>
              )}
            </button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {filteredBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
