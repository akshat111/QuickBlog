import React, { useState, useMemo } from "react";
import { blogCategories } from "../assets/assets";
import { motion } from "motion/react"; // eslint-disable-line no-unused-vars
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  // Memoize filtered blogs to prevent recalculation on every render
  const filteredBlogs = useMemo(() => {
    // ⚡ Bolt Performance Optimization:
    // 1. Cache the lowercase input string outside the loop to avoid redundant conversions
    // 2. Combine multiple filtering conditions into a single pass (O(n) instead of O(2n))
    const searchInput = input.toLowerCase();

    return blogs.filter((blog) => {
      if (menu !== "All" && blog.category !== menu) {
        return false;
      }

      if (searchInput !== "") {
        return (
          blog.title.toLowerCase().includes(searchInput) ||
          blog.category.toLowerCase().includes(searchInput)
        );
      }

      return true;
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
