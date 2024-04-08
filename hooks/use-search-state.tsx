import queryString from "query-string";
import type { UiState } from "instantsearch.js";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import singletonRouter from "next/router";
import { InstantSearchProps } from "react-instantsearch";
import { createInstantSearchRouterNext } from "react-instantsearch-router-nextjs";
import {
  modelInstantSearchRoutingParser,
  ModelSearchParams,
} from "@/components/search/model.parser";
import { MODELS_SEARCH_INDEX } from "@/components/search/model.parser";

type StoreState = {
  models: ModelSearchParams;
  setSearchParamsByUiState: (uiState: UiState) => void;
  setModelsSearchParams: (filters: Partial<ModelSearchParams>) => void;
};

export const useSearchStore = create<StoreState>()(
  devtools(
    immer((set) => {
      return {
        models: {},
        setSearchParamsByUiState: (uiState: UiState) => {
          const [index] = Object.keys(uiState);

          if (index === MODELS_SEARCH_INDEX) {
            set((state) => {
              state.models = modelInstantSearchRoutingParser.stateToRoute(
                uiState
              )[MODELS_SEARCH_INDEX] as ModelSearchParams;
            });
          }
        },
        setModelsSearchParams: (params) =>
          set((state) => {
            state.models = params;
          }),
      };
    })
  )
);

export const routing: InstantSearchProps["routing"] = {
  // todo: use this straight in search index.tsx
  router: createInstantSearchRouterNext({
    singletonRouter,
    routerOptions: {
      createURL({ routeState, location }) {
        const pattern = /\/search\/models/;
        const match = location.pathname.match(pattern);

        if (!match) {
          return location.href;
        }

        const query = queryString.stringify(routeState[MODELS_SEARCH_INDEX]);

        return `${location.origin}${location.pathname}?${query}`;
      },
      parseURL({ location }) {
        const pattern = /\/search\/models/;
        const match = location.pathname.match(pattern);

        if (match) {
          return modelInstantSearchRoutingParser.parseURL({ location });
        }

        return { "": {} };
      },
    },
  }),
  stateMapping: {
    routeToState(routeState) {
      if (routeState[MODELS_SEARCH_INDEX]) {
        return modelInstantSearchRoutingParser.routeToState(routeState);
      }
      return routeState;
    },
    stateToRoute(uiState) {
      return modelInstantSearchRoutingParser.stateToRoute(uiState);
    },
  },
};
