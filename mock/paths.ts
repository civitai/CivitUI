import embeddings from "./data/embeddings.json";
import extensions from "./data/extensions.json";
import history from "./data/history.json";
import image from "./data/image.png";
import objectInfo from "./data/object_info.json";
import queue from "./data/queue.json";
import settings from "./data/settings.json";

export default {
  "GET /object_info": objectInfo,
  "GET /queue": queue,
  "GET /embeddings": embeddings,
  "GET /history": history,
  "GET /extensions": extensions,
  "GET /prompt": { exec_info: { queue_remaining: 0 } },
  "POST /prompt": { result: "true" },
  "POST /upload/image": { name: "mock.png" },
  "GET /view": image,
  "GET /settings": settings,
  "POST /settings": {},
};