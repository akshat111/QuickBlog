
## 2024-05-20 - [Synchronous File Reads in Express Controllers]
**Learning:** Found `fs.readFileSync` used directly in an Express controller path (`/blogController.js -> addBlog`). This codebase pattern blocks the Node.js event loop during disk operations, causing a significant performance bottleneck and potential starvation for concurrent requests.
**Action:** Always scan for and replace synchronous I/O operations (like `fs.readFileSync`) with their asynchronous counterparts (like `fs.promises.readFile`) within Express route handlers to maintain server responsiveness under load.
