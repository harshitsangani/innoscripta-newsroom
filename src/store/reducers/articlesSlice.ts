import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Source } from "./sourcesSlice";

export interface Article {
  author: string | null;
  content: string;
  description: string;
  publishedAt: string;
  source: Source;
  title: string;
  url: string;
  urlToImage: string;
}

const articlesSlice = createSlice({
  name: "articles",
  initialState: [] as Article[],
  reducers: {
    addArticle(state, action: PayloadAction<Article>) {
      state.push(action.payload);
    },
    removeArticle(state, action: PayloadAction<Article>) {
      return state.filter((article) => article.url !== action.payload.url);
    },
    replaceArticles(_state, action: PayloadAction<Article[]>) {
      return action.payload;
    },
    clearArticles() {
      return [];
    },
  },
});

export default articlesSlice;
