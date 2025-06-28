# 🚀 QuickBlog Frontend

A modern **React** frontend for QuickBlog — a blogging platform that lets you read, write, and manage blogs with authentication and comments.

Built with:
- **React** (Vite or Create React App)
- **Tailwind CSS** for styling
- **Axios** for API requests
- **React Router** for navigation
- **react-hot-toast** for notifications

---

## ✨ Features

✅ User login (JWT-based)  
✅ Dashboard for managing blogs  
✅ Add, edit, delete, publish/unpublish blogs  
✅ AI-powered blog content generation (via Gemini)  
✅ Read blogs with categories  
✅ Add comments (pending approval)  
✅ Responsive and clean UI

---

## ⚙️ Setup & Installation

```bash
git clone https://github.com/akshat111/QuickBlog-Frontend.git
cd QuickBlog-Frontend
npm install

VITE_BASE_URL=http://localhost:3000


🚀 Run Locally
npm run dev

The app will run at:
http://localhost:5173

🔐 Authentication
On successful login, your JWT is saved in local storage and automatically attached to protected requests.

Protected actions (like add blog, generate content) require login.

🌐 Pages
| Page              | Description                  |
| ----------------- | ---------------------------- |
| `/`               | Home - lists published blogs |
| `/blog/:id`       | View single blog             |
| `/login`          | Admin login                  |
| `/admin`          | Admin dashboard (protected)  |
| `/admin/add-blog` | Add a new blog (protected)   |
| `/admin/comments` | Manage comments (protected)  |

💻 Important ENV setup
.env
VITE_BASE_URL=http://localhost:3000
✅ This is automatically used by Axios via the AppContext.

🔥 Notifications
Uses react-hot-toast for clean success & error messages.

🚀 Deployment
You can deploy to Vercel, Netlify, or any static host.

🙌 Author
Akshat Kumar
GitHub
