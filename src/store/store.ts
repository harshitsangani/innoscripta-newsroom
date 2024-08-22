import { configureStore } from "@reduxjs/toolkit";
import articlesSlice from "./reducers/articlesSlice";
import sourcesSlice from "./reducers/sourcesSlice";
import newsFiltersSlice from "./reducers/newsFiltersSlice";

export const store = configureStore({
  reducer: {
    articles: articlesSlice.reducer,
    sources: sourcesSlice.reducer,
    newsFilters: newsFiltersSlice.reducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
