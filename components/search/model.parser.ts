import { z } from "zod";
import { parse } from "querystring";
import { removeEmpty } from "~/utils/object-helpers";
import { UiState } from "instantsearch.js";

const MODELS_SEARCH_INDEX = "models_v8";

export const ModelSearchIndexSortBy = [
  MODELS_SEARCH_INDEX,
  `${MODELS_SEARCH_INDEX}:metrics.thumbsUpCount:desc`,
  `${MODELS_SEARCH_INDEX}:metrics.downloadCount:desc`,
  // ... other sort options
] as const;

const ModelDefaultSortBy = ModelSearchIndexSortBy[0];

// Define a simplified searchParamsSchema directly here
const searchParamsSchema = z
  .object({
    query: z.string().optional(),
    page: z.number().optional(),
    sortBy: z.enum(ModelSearchIndexSortBy).optional(),
    // ... other search params
  })
  .partial();

export type ModelSearchParams = z.output<typeof searchParamsSchema>;

type InstantSearchRoutingParser = {
  parseURL: (params: { location: Location }) => UiState;
  routeToState: (routeState: UiState) => UiState;
  stateToRoute: (uiState: UiState) => UiState;
};

export const modelInstantSearchRoutingParser: InstantSearchRoutingParser = {
  parseURL: ({ location }) => {
    const modelSearchIndexResult = searchParamsSchema.safeParse(
      parse(location.search)
    );
    const modelSearchIndexData: ModelSearchParams | Record<string, string[]> =
      modelSearchIndexResult.success ? modelSearchIndexResult.data : {};

    return { [MODELS_SEARCH_INDEX]: removeEmpty(modelSearchIndexData) };
  },
  routeToState: (routeState: UiState) => {
    // ... convert route state to search state
  },
  stateToRoute: (uiState: UiState) => {
    // ... convert search state to route state
  },
};
