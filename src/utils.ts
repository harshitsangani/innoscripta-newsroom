import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SourceCategory } from "./store/reducers/sourcesSlice";
import { DateRange } from "./store/reducers/newsFiltersSlice";
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function categoryName(category: SourceCategory) {
  switch (category) {
    case SourceCategory.business:
      return "Business";
    case SourceCategory.entertainment:
      return "Entertainment";
    case SourceCategory.general:
      return "General";
    case SourceCategory.health:
      return "Health";
    case SourceCategory.science:
      return "Science";
    case SourceCategory.sports:
      return "Sports";
    case SourceCategory.technology:
      return "Technology";
  }
}

export function languageName(language: string) {
  switch (language) {
    case "ar":
      return "Arabic";
    case "de":
      return "German";
    case "en":
      return "English";
    case "es":
      return "Spanish";
    case "fr":
      return "French";
    case "he":
      return "Hebrew";
    case "it":
      return "Italian";
    case "nl":
      return "Dutch";
    case "no":
      return "Norwegian";
    case "pt":
      return "Portuguese";
    case "ru":
      return "Russian";
    case "sv":
      return "Swedish";
    case "ud":
      return "Turkish-German";
    case "zh":
      return "Chinese";
  }
}

export function sortByLabel(sortBy: string) {
  switch (sortBy) {
    case "relevancy":
      return "Relevancy";
    case "popularity":
      return "Popularity";
    case "publishedAt":
      return "Published At";
  }
}

export function getDateRange(dateRange: DateRange) {
  let range: { from: moment.Moment; to: moment.Moment };

  switch (dateRange) {
    case DateRange.today:
      range = {
        from: moment().startOf("day"),
        to: moment().endOf("day"),
      };
      break;
    case DateRange.yesterday:
      range = {
        from: moment().subtract(1, "day").startOf("day"),
        to: moment().subtract(1, "day").endOf("day"),
      };
      break;
    case DateRange.lastWeek:
      range = {
        from: moment().subtract(1, "week").startOf("day"),
        to: moment().endOf("day"),
      };
      break;
    case DateRange.lastMonth:
      range = {
        from: moment().subtract(1, "month").startOf("day"),
        to: moment().endOf("day"),
      };
      break;
    case DateRange.lastYear:
      range = {
        from: moment().subtract(1, "year").startOf("day"),
        to: moment().endOf("day"),
      };
      break;
  }

  return range;
}

export function dateRangeLabel(dateRange: DateRange) {
  switch (dateRange) {
    case DateRange.today:
      return "Today";
    case DateRange.yesterday:
      return "Yesterday";
    case DateRange.lastWeek:
      return "Last Week";
    case DateRange.lastMonth:
      return "Last Month";
    case DateRange.lastYear:
      return "Last Year";
  }
}
