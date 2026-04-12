import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import main from "../configs/gemini.js"

export const addBlog = async (req,res)=> {
    try {
        const {title, subTitle, description , category, isPublished} = JSON.parse(req.body.blog);
        const imageFile = req.file;

        //Check if all fields are present 
        if(!title || !description || !category || !imageFile){
            return res.json({success: false, message: "Missing field required"})
        }
        // Optimization: Use asynchronous readFile to prevent event loop starvation during disk operations,
        // which can block other concurrent requests and significantly degrade server responsiveness.
        const fileBuffer = await fs.promises.readFile(imageFile.path)

        // Upload Image to ImageKits
        const response = await imagekit.upload({
            file : fileBuffer,
            fileName : imageFile.originalname,
            folder: "/blogs"
        })

        //optimization through imageKit URL transformation 

        const optimizedImageURL = imagekit.url({
            path:response.filePath,
            transformation: [
                {quality : "auto"},
                {format : "webp"},
                {width : "1280"}
            ]
        });

        const image = optimizedImageURL;

        await Blog.create({title, subTitle, description, category, image, isPublished})
        res.json({success: true, message: "Blog added successfully"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getAllBlogs = async (req, res)=> {
    try {
        // Optimization: Use .lean() for read-only queries to bypass document hydration
        const blogs = await Blog.find({isPublished: true}).lean()
        res.json({success: true, blogs})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getBlogByID = async (req,res) => {
    try {
        const {blogId} = req.params;
        // Optimization: Use .lean() for read-only queries to bypass document hydration
        const blog = await Blog.findById(blogId).lean();
        if(!blog){
            return res.json({success: false, message: "Blog not found"})
        } 
        res.json({success: true, blog})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const deleteBlogByID = async (req,res) => {
    try {
        const {id} = req.body;
        await Blog.findByIdAndDelete(id)

        //Delete the comment associated with the blog
        await Comment.deleteMany({blog: id});

        res.json({success: true, message: "Blog deleted successfully"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const togglePublish = async (req,res) => {
    try {
        const {id} = req.body;
        const blog = await Blog.findById(id);

        if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({success: true, message: "Blog status updated"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const addComment = async (req,res) => {
    try {
        const {blog, name, content} = req.body;
        await Comment.create({blog,name,content});
         res.json({success: true, message: 'Comment added for review'})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getBlogComments = async (req,res) => {
    try {
        const {blogId} = req.body;
        // Optimization: Use .lean() for read-only queries to bypass document hydration
        const comments = await Comment.find({blog: blogId,isApproved:true}).sort({createdAt: -1}).lean();
        res.json({success: true, comments})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const generateContent = async (req,res)=> {
    try {
        const {prompt} = req.body;
        const content = await main(prompt + 'Generate a blog content for this topic in simple text format')
        res.json({success: true, content})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}