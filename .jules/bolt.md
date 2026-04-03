## 2026-04-03 - Blocking Event Loop with Synchronous I/O in Express Controllers
**Learning:** Found `fs.readFileSync` used within an Express request handler for file uploads. This blocks the entire Node.js event loop during disk operations, causing major performance degradation and request starvation under load.
**Action:** Always replace synchronous file system operations (`fs.*Sync`) with their asynchronous counterparts (e.g., `fs.promises.*`) in server controllers to maintain responsiveness.
