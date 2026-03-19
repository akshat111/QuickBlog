import React, { useState, useMemo } from "react";
import { blogCategories } from "../assets/assets";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  // ⚡ Bolt Performance Optimization:
  // - Combine two filter passes (search input and category menu) into a single pass.
  // - Cache the lowercase search input outside the filter loop to prevent re-computing it on every item.
  // - Wrap the operation in useMemo so it only recalculates when 'blogs', 'input', or 'menu' change,
  //   reducing unnecessary overhead on component re-renders.
  const filteredAndCategorizedBlogs = useMemo(() => {
    // ⚡ Calculate once per render instead of per item in the array
    const lowercasedInput = input.trim().toLowerCase();

    return blogs.filter((blog) => {
      // Pass 1: Category filter
      if (menu !== "All" && blog.category !== menu) {
        return false;
      }

      // Pass 2: Search input filter
      if (lowercasedInput !== "") {
        return (
          blog.title.toLowerCase().includes(lowercasedInput) ||
          blog.category.toLowerCase().includes(lowercasedInput)
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
        {filteredAndCategorizedBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
