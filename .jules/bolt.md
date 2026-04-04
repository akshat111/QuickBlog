## 2026-04-04 - [Synchronous File I/O in Express Controllers]
**Learning:** Using synchronous file system operations like `fs.readFileSync` inside an Express controller block the Node.js event loop, preventing the server from handling other requests during disk operations.
**Action:** Always use asynchronous file system methods (e.g., `fs.promises.readFile`) in request handlers to maintain high throughput.
