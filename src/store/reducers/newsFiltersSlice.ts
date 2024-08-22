import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Language, Source, SourceCategory } from "./sourcesSlice";

export enum SortBy {
  relevancy = "relevancy",
  popularity = "popularity",
  publishedAt = "publishedAt",
}

export enum DateRange {
  today = "today",
  yesterday = "yesterday",
  lastWeek = "lastWeek",
  lastMonth = "lastMonth",
  lastYear = "lastYear",
}

export interface NewsFilters {
  search?: string;
  sources: Source[];
  dateRange?: DateRange;
  category?: SourceCategory;
  language?: Language;
  sortBy: SortBy;
}

const newsFiltersSlice = createSlice({
  name: "news-filters",
  initialState: {
    sources: [],
    sortBy: SortBy.popularity,
  } as NewsFilters,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setSources(state, action: PayloadAction<Source[]>) {
      state.sources = action.payload;
    },
    setSortBy(state, action: PayloadAction<SortBy>) {
      state.sortBy = action.payload;
    },
    setDateRange(state, action: PayloadAction<DateRange>) {
      if (state.dateRange === action.payload) {
        state.dateRange = undefined;
      } else {
        state.dateRange = action.payload;
      }
    },
    setCategory(state, action: PayloadAction<SourceCategory>) {
      state.category = action.payload;
    },
    setLanguage(state, action: PayloadAction<Language>) {
      if (state.language === action.payload) {
        state.language = undefined;
      } else {
        state.language = action.payload;
      }
    },
  },
});

export default newsFiltersSlice;
