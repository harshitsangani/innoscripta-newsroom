import React, { useEffect } from "react";

import { dateRangeLabel, languageName, sortByLabel } from "@/utils";
import classNames from "classnames";
import _ from "lodash";
import {
  PiCalendar,
  PiCheck,
  PiMagnifyingGlass,
  PiSortAscending,
  PiTextAa,
} from "react-icons/pi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import newsFiltersSlice, {
  DateRange,
  SortBy,
} from "../store/reducers/newsFiltersSlice";
import sourcesSlice, { Language, Source } from "../store/reducers/sourcesSlice";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import networkService from "@/domain/network-service";

export function ArticleFilters() {
  return (
    <div className="flex max-md:flex-col border-b border-black md:items-center">
      <SourcesList />
      <div className="flex items-center">
        <NewsSearch />
        <LanguageFilter />
        <DateRangeFilter />
        <ArticlesSortBy />
      </div>
    </div>
  );
}

const SourcesList: React.FC = () => {
  const sources = useAppSelector((state) => state.sources);
  const newsFilters = useAppSelector((state) => state.newsFilters);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (sources.length) return;

    networkService
      .get<{ sources: Source[]; ok: boolean }>("/top-headlines/sources")
      .then((response) => {
        dispatch(sourcesSlice.actions.replaceSources(response.sources));
      });
  }, [dispatch, sources.length]);

  useEffect(() => {
    dispatch(newsFiltersSlice.actions.setSources(_.sampleSize(sources, 10)));
  }, [dispatch, sources]);

  const handleSourceClick = (source: Source) => () => {
    dispatch(
      newsFiltersSlice.actions.setSources(
        newsFilters.sources.includes(source)
          ? newsFilters.sources.filter((s) => s !== source)
          : [...newsFilters.sources, source]
      )
    );
  };

  return (
    <div className="flex items-center max-md:border-b border-black overflow-hidden">
      <div className="font-medium p-2 text-sm items-center whitespace-nowrap border-r border-black bg-gray-100">
        Sources({newsFilters.sources.length})
      </div>
      <div className="flex overflow-auto flex-nowrap items-center">
        {sources.map((source) => {
          return (
            <div
              className={classNames(
                "whitespace-nowrap text-sm p-2 cursor-pointer hover:bg-gray-200 active:bg-gray-300 transition-all duration-200",
                {
                  "bg-gray-200": newsFilters.sources.includes(source),
                }
              )}
              onClick={handleSourceClick(source)}
              key={source.id}
            >
              {source.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const NewsSearch: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSearchChange = _.debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(newsFiltersSlice.actions.setSearch(e.target.value));
    },
    500
  );

  return (
    <div className="font-medium text-sm flex items-center whitespace-nowrap bg-gray-100 max-md:flex-1">
      <div className="relative md:border-x border-black max-md:flex-1">
        <input
          className="p-2 outline-none bg-gray-100 font-light"
          placeholder="Search..."
          onChange={handleSearchChange}
        />
        <PiMagnifyingGlass className="absolute right-3 top-3" />
      </div>
    </div>
  );
};

const LanguageFilter: React.FC = () => {
  const newsFilters = useAppSelector((state) => state.newsFilters);
  const dispatch = useAppDispatch();

  const handleLanguageSelect = (language: Language) => () => {
    dispatch(newsFiltersSlice.actions.setLanguage(language));
  };

  return (
    <Popover>
      <PopoverTrigger>
        <div className="p-2 flex items-center gap-2 border-r border-black text-sm whitespace-nowrap">
          <PiTextAa />
          <div
            className={classNames({ "max-md:hidden": !newsFilters.language })}
          >
            {newsFilters.language
              ? languageName(newsFilters.language)
              : "Language"}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-1">
        {Object.values(Language).map((language) => (
          <div
            className="p-3 py-2 cursor-pointer hover:bg-gray-200 active:bg-gray-300 transition-all duration-200 rounded flex gap-2 items-center justify-between"
            key={language}
            onClick={handleLanguageSelect(language)}
          >
            {languageName(language)}
            {newsFilters.language === language ? <PiCheck /> : null}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

const DateRangeFilter: React.FC = () => {
  const newsFilters = useAppSelector((state) => state.newsFilters);
  const dispatch = useAppDispatch();

  const handleDateRangeSelect = (dateRange: DateRange) => () => {
    dispatch(newsFiltersSlice.actions.setDateRange(dateRange));
  };

  return (
    <Popover>
      <PopoverTrigger>
        <div className="p-2 flex items-center gap-2 border-r border-black text-sm whitespace-nowrap">
          <PiCalendar />
          <div
            className={classNames({ "max-md:hidden": !newsFilters.dateRange })}
          >
            {newsFilters.dateRange
              ? dateRangeLabel(newsFilters.dateRange)
              : "Date"}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-1">
        {Object.values(DateRange).map((dateRange) => (
          <div
            className="p-3 py-2 cursor-pointer hover:bg-gray-200 active:bg-gray-300 transition-all duration-200 rounded flex gap-2 items-center justify-between"
            key={dateRange}
            onClick={handleDateRangeSelect(dateRange)}
          >
            {dateRangeLabel(dateRange)}
            {newsFilters.dateRange === dateRange ? <PiCheck /> : null}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

const ArticlesSortBy: React.FC = () => {
  const newsFilters = useAppSelector((state) => state.newsFilters);
  const dispatch = useAppDispatch();

  const handleSortByChange = (sortBy: SortBy) => () => {
    dispatch(newsFiltersSlice.actions.setSortBy(sortBy));
  };

  return (
    <Popover>
      <PopoverTrigger>
        <div className="p-2 flex items-center gap-2 text-sm whitespace-nowrap">
          <PiSortAscending />
          <div
            className={classNames({
              "max-md:hidden": newsFilters.sortBy == SortBy.popularity,
            })}
          >
            {sortByLabel(newsFilters.sortBy)}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-1">
        {Object.values(SortBy).map((sortBy) => (
          <div
            className="p-3 py-2 cursor-pointer hover:bg-gray-200 active:bg-gray-300 transition-all duration-200 rounded flex gap-2 items-center justify-between"
            key={sortBy}
            onClick={handleSortByChange(sortBy)}
          >
            {sortByLabel(sortBy)}
            {newsFilters.sortBy === sortBy ? <PiCheck /> : null}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};
