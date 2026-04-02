## 2026-04-02 - Prevent Event Loop Starvation and Query Bloat
**Learning:** Synchronous file I/O (`fs.readFileSync`) blocks the Node.js event loop during uploads, and Mongoose document hydration is unnecessary overhead for read-only APIs.
**Action:** Always use `fs.promises.readFile` for file handling in controllers and append `.lean()` to Mongoose `find()`/`findById()` queries that only return data.
