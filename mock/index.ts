async function initMocks() {
    if (typeof window === "undefined") {
      const server = await import("./server");
      return server.default.listen();
    } else {
      const worker = await import("./browser");
      return worker.default.start();
    }
}
  
export default initMocks;