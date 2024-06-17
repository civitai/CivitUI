import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import embeddings from "./embeddings.json";
import extensions from "./extensions.json";
import history from "./history.json";
import image from "./image";
import objectInfo from "./object_info.json";
import queue from "./queue.json";
import settings from "./settings.json";

const mockData = {
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

const handlers = Object.entries(mockData).map(([route, data]) => {
  const [method, path] = route.split(' ');
  const m = method.toLowerCase() as keyof typeof http;
  return http[m](path, ({ request, params, cookies }) => {
    return HttpResponse.json(data);
  });
});

export const mockServer = setupServer(...handlers);
