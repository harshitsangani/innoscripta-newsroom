import networkService from "@/domain/network-service";
import { getDateRange } from "@/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { PiSpinner } from "react-icons/pi";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import articlesSlice, { Article } from "../store/reducers/articlesSlice";
import { ArticleCard } from "./ArticleCard";

export function ArticlesView() {
  const articles = useAppSelector((state) => state.articles);
  const newsFilters = useAppSelector((state) => state.newsFilters);
  const dispatch = useAppDispatch();

  const [areArticlesLoading, setAreArticlesLoading] = useState(true);

  const [hasMore, setHasMore] = useState(true);
  const index = useRef(1);

  const fetchMoreData = useCallback(
    async (page: number) => {
      try {
        if (!newsFilters.sources.length) return;

        setAreArticlesLoading(true);

        const { from, to } = newsFilters.dateRange
          ? getDateRange(newsFilters.dateRange)
          : { from: undefined, to: undefined };

        await networkService
          .get<{
            totalResults: number;
            articles: Article[];
          }>("/everything", {
            sources: newsFilters.sources.map((source) => source.id).join(","),
            q: newsFilters.search,
            from: from?.format("YYYY-MM-DD"),
            to: to?.format("YYYY-MM-DD"),
            sortBy: newsFilters.sortBy,
            language: newsFilters.language,
            category: newsFilters.category,
            page,
            pageSize: 12,
          })
          .then((response) => {
            dispatch(articlesSlice.actions.addArticles(response.articles));

            setHasMore(articles.length < response.totalResults);
          });
      } catch (error) {
        console.error(error);
      } finally {
        setAreArticlesLoading(false);
      }
    },
    [dispatch, newsFilters]
  );

  useEffect(() => {
    fetchMoreData(1);
  }, [fetchMoreData]);

  if (areArticlesLoading && !articles.length) {
    return (
      <div className="flex items-center justify-center flex-1">
        <PiSpinner className="animate-spin text-xl" />
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={articles.length}
      next={() => fetchMoreData(++index.current)}
      hasMore={hasMore}
      loader={
        <div className="flex items-center justify-center flex-1">
          <PiSpinner className="animate-spin text-xl" />
        </div>
      }
      className="!overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
        {articles.map((article, i) => {
          return <ArticleCard article={article} key={i} />;
        })}
      </div>
    </InfiniteScroll>
  );
}
