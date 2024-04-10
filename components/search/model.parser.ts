"use client";

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
