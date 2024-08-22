import networkService from "@/domain/network-service";
import { useEffect, useState } from "react";
import { PiSpinner } from "react-icons/pi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import articlesSlice, { Article } from "../store/reducers/articlesSlice";
import { ArticleCard } from "./ArticleCard";
import { getDateRange } from "@/utils";

export function ArticlesView() {
  const articles = useAppSelector((state) => state.articles);
  const newsFilters = useAppSelector((state) => state.newsFilters);
  const dispatch = useAppDispatch();

  const [areArticlesLoading, setAreArticlesLoading] = useState(true);

  useEffect(() => {
    try {
      if (!newsFilters.sources.length) return;

      setAreArticlesLoading(true);

      const { from, to } = newsFilters.dateRange
        ? getDateRange(newsFilters.dateRange)
        : { from: undefined, to: undefined };

      networkService
        .get<{
          articles: Article[];
        }>("/everything", {
          sources: newsFilters.sources.map((source) => source.id).join(","),
          q: newsFilters.search,
          from: from?.format("YYYY-MM-DD"),
          to: to?.format("YYYY-MM-DD"),
          sortBy: newsFilters.sortBy,
          language: newsFilters.language,
          category: newsFilters.category,
        })
        .then((response) => {
          dispatch(articlesSlice.actions.replaceArticles(response.articles));
        });
    } catch (error) {
      console.error(error);
    } finally {
      setAreArticlesLoading(false);
    }
  }, [dispatch, newsFilters]);

  if (areArticlesLoading) {
    return (
      <div className="flex items-center justify-center flex-1">
        <PiSpinner className="animate-spin text-xl" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
      {articles.map((article, i) => {
        return <ArticleCard article={article} key={i} />;
      })}
    </div>
  );
}
