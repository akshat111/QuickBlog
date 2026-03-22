import React, { useState, useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { blog_data, blogCategories } from "../assets/assets";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  // ⚡ Bolt Performance Optimization:
  // Combined search and category filtering into a single pass.
  // Lifted input.toLowerCase() out of the loop and wrapped in useMemo
  // to prevent unnecessary re-computations and array allocations on every render.
  const filteredBlogs = useMemo(() => {
    if (!blogs) return [];

    const lowerInput = input.toLowerCase();
    const isAllMenu = menu === "All";

    return blogs.filter((blog) => {
      // Category filter
      if (!isAllMenu && blog.category !== menu) {
        return false;
      }

      // Search input filter
      if (lowerInput === "") {
        return true;
      }

      return (
        blog.title.toLowerCase().includes(lowerInput) ||
        blog.category.toLowerCase().includes(lowerInput)
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
