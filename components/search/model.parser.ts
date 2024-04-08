"use client";

import { z } from "zod";
import { parse } from "querystring";
import { isArray, isNil, omitBy } from "lodash-es";
import { UiState } from "instantsearch.js";

export const MODELS_SEARCH_INDEX = "models_v8";

export const ModelSearchIndexSortBy = [
  MODELS_SEARCH_INDEX,
  `${MODELS_SEARCH_INDEX}:metrics.thumbsUpCount:desc`,
  `${MODELS_SEARCH_INDEX}:metrics.downloadCount:desc`,
  `${MODELS_SEARCH_INDEX}:metrics.favoriteCount:desc`,
  `${MODELS_SEARCH_INDEX}:metrics.commentCount:desc`,
  `${MODELS_SEARCH_INDEX}:metrics.collectedCount:desc`,
  `${MODELS_SEARCH_INDEX}:metrics.tippedAmountCount:desc`,
  `${MODELS_SEARCH_INDEX}:createdAt:desc`,
] as const;

const ModelDefaultSortBy = ModelSearchIndexSortBy[0];

const searchParamsSchema = z
  .object({
    query: z.string().optional(),
    page: z.number().optional(),
    sortBy: z.enum(ModelSearchIndexSortBy).optional(),
    lastVersionAt: z.string().optional(),
    baseModel: z.array(z.string()).optional(),
    modelType: z.array(z.string()).optional(),
    checkpointType: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    users: z.array(z.string()).optional(),
    category: z.array(z.string()).optional(),
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
    const models: ModelSearchParams = routeState[
      MODELS_SEARCH_INDEX
    ] as ModelSearchParams;
    const refinementList: Record<string, string[]> = removeEmpty({
      "version.baseModel": models.baseModel,
      "category.name": models.category,
      type: models.modelType,
      checkpointType: models.checkpointType,
      "tags.name": models.tags,
      "user.username": models.users,
    });

    const range = removeEmpty({
      lastVersionAtUnix: models.lastVersionAt,
    });

    const { query, sortBy } = models;

    return {
      [MODELS_SEARCH_INDEX]: {
        sortBy: sortBy ?? ModelDefaultSortBy,
        refinementList,
        query,
        range,
      },
    };
  },
  stateToRoute: (uiState: UiState) => {
    if (!uiState[MODELS_SEARCH_INDEX]) {
      return {
        [MODELS_SEARCH_INDEX]: {},
      };
    }

    const lastVersionAt =
      uiState[MODELS_SEARCH_INDEX].range?.["lastVersionAtUnix"];
    const baseModel =
      uiState[MODELS_SEARCH_INDEX].refinementList?.["version.baseModel"];
    const modelType = uiState[MODELS_SEARCH_INDEX].refinementList?.["type"];
    const category =
      uiState[MODELS_SEARCH_INDEX].refinementList?.["category.name"];
    const checkpointType =
      uiState[MODELS_SEARCH_INDEX].refinementList?.["checkpointType"];
    const tags = uiState[MODELS_SEARCH_INDEX].refinementList?.["tags.name"];
    const users =
      uiState[MODELS_SEARCH_INDEX].refinementList?.["user.username"];
    const sortBy =
      (uiState[MODELS_SEARCH_INDEX].sortBy as ModelSearchParams["sortBy"]) ||
      ModelDefaultSortBy;
    const { query } = uiState[MODELS_SEARCH_INDEX];

    const state: ModelSearchParams = {
      category,
      baseModel,
      modelType,
      checkpointType,
      users,
      tags,
      sortBy,
      query,
      lastVersionAt,
    };

    return {
      [MODELS_SEARCH_INDEX]: state,
    };
  },
};

export function removeEmpty(obj: Record<string, any>): Record<string, any> {
  return omitBy(
    obj,
    (value) => isNil(value) || (isArray(value) && !value.length)
  );
}
