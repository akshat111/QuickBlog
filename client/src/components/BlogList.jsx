import React, { useState, useMemo } from "react";
import { blogCategories } from "../assets/assets";
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  // ⚡ Bolt Performance Optimization:
  // Memoize the filtered blogs list to prevent expensive re-calculations on every render
  // and combine the two filter passes into a single pass to iterate over the array only once.
  // Reduces unnecessary re-renders when blogs, menu, or input haven't changed.
  const filteredBlogs = useMemo(() => {
    const lowerInput = input.toLowerCase();
    return blogs.filter((blog) => {
      // 1. Menu filtering
      const matchesMenu = menu === "All" ? true : blog.category === menu;

      // 2. Search input filtering
      const matchesInput =
        input === "" ||
        blog.title.toLowerCase().includes(lowerInput) ||
        blog.category.toLowerCase().includes(lowerInput);

      return matchesMenu && matchesInput;
    });
  }, [blogs, menu, input]);

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
