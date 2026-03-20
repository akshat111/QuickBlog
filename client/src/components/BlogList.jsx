import React, { useState, useMemo } from "react";
import { blogCategories } from "../assets/assets";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  // ⚡ Bolt: Performance Improvement
  // Combined search filtering and category filtering into a single O(n) pass
  // instead of multiple passes, and memoized the result to prevent recalculation
  // on unrelated re-renders.
  const filteredBlogs = useMemo(() => {
    const lowerInput = input.toLowerCase();

    return blogs.filter((blog) => {
      // Check category match first (cheaper operation)
      const matchesCategory = menu === "All" || blog.category === menu;

      if (!matchesCategory) return false;

      // If category matches and no input, keep it
      if (!input) return true;

      // Finally check search string match
      return blog.title.toLowerCase().includes(lowerInput) ||
             blog.category.toLowerCase().includes(lowerInput);
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
