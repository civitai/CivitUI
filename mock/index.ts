import options from "./options";

async function initMocks() {
    if (typeof window === "undefined") {
      const server = await import("./server");
      return server.default.listen(options);
    } else {
      const worker = await import("./browser");
      return worker.default.start(options);
    }
}
  
export default initMocks;