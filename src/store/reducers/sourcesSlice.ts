import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum SourceCategory {
  business = "business",
  entertainment = "entertainment",
  general = "general",
  health = "health",
  science = "science",
  sports = "sports",
  technology = "technology",
}

export enum Language {
  ar = "ar",
  de = "de",
  en = "en",
  es = "es",
  fr = "fr",
  he = "he",
  it = "it",
  nl = "nl",
  no = "no",
  pt = "pt",
  ru = "ru",
  sv = "sv",
  ud = "ud",
  zh = "zh",
}

export interface Source {
  category?: SourceCategory;
  country?: string;
  description?: string;
  id: string;
  language?: Language;
  name: string;
  url?: string;
}

const sourcesSlice = createSlice({
  name: "sources",
  initialState: [] as Source[],
  reducers: {
    addSource(state, action: PayloadAction<Source>) {
      state.push(action.payload);
    },
    removeSource(state, action: PayloadAction<Source>) {
      return state.filter((article) => article.url !== action.payload.url);
    },
    replaceSources(_state, action: PayloadAction<Source[]>) {
      return action.payload;
    },
    clearSources() {
      return [];
    },
  },
});

export default sourcesSlice;
