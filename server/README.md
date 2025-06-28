🚀 QuickBlog Backend
A simple blog backend API built with Express, MongoDB, Mongoose, JWT Auth, and Multer for file uploads.
Supports blog management, comments, and AI content generation using Google Gemini.

✨ Features
✅ User authentication with JWT
✅ Add, delete, publish/unpublish blogs
✅ Upload images with ImageKit (with URL optimization)
✅ Add & filter comments
✅ Generate blog content via Gemini API
✅ RESTful API ready for frontend consumption

⚙️ Setup & Installation
bash
Copy
Edit
git clone https://github.com/akshat111/QuickBlog.git
cd QuickBlog
npm install
Create a .env file in the root with:

ini
Copy
Edit
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url
GEMINI_API_KEY=your_google_gemini_key
🚀 Run Locally
bash
Copy
Edit
npm start
Server will run at:

arduino
Copy
Edit
http://localhost:3000
🔐 Authentication
Pass your JWT token directly in the headers:

makefile
Copy
Edit
Authorization: your_jwt_token
✅ No Bearer prefix required.
Your protected routes: /api/blog/add, /api/blog/delete, /api/blog/toggle-publish, /api/blog/generate.

📚 API Endpoints
📖 Blogs
Endpoint	Method	Auth	Description
/api/blog/all	GET	❌	Get all published blogs
/api/blog/:blogId	GET	❌	Get blog by ID
/api/blog/add	POST	✅	Add a new blog (multipart)
/api/blog/delete	POST	✅	Delete blog by ID
/api/blog/toggle-publish	POST	✅	Toggle publish status
/api/blog/generate	POST	✅	Generate blog content (AI)

💬 Comments
Endpoint	Method	Auth	Description
/api/blog/add-comment	POST	❌	Add a comment to a blog
/api/blog/comments	POST	❌	Get approved comments for blog

📝 Example: Add Blog
POST /api/blog/add

Requires Authorization header.

Content-Type: multipart/form-data

json
Copy
Edit
blog: {
  "title": "My new blog",
  "subTitle": "A short description",
  "description": "<p>HTML content here</p>",
  "category": "Startup",
  "isPublished": true
}
image: <file>
🤖 Example: Generate Content
POST /api/blog/generate

json
Copy
Edit
{
  "prompt": "10 reasons to start a startup"
}
📂 Deployment on Vercel
Add your environment variables in Vercel → Project → Settings → Environment Variables.

Make sure your vercel.json points correctly:

json
Copy
Edit
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "server.js" }
  ]
}
🙌 Author
Akshat Kumar
GitHub
