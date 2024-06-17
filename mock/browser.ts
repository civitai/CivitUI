import { setupWorker } from "msw/browser";

import handlers from "./handlers";

export default setupWorker(...handlers);