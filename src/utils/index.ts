import {
  Distinct,
  ExtraArrayFunctions,
  GroupBy,
  IExtraArrayFunctions,
  MultipleGroupBy,
  OrderBy,
  PropType,
  Select,
  Skip,
  SortBy,
  Take,
} from "./extra_array";

export {
  Distinct,
  ExtraArrayFunctions,
  GroupBy,
  IExtraArrayFunctions,
  MultipleGroupBy,
  OrderBy,
  PropType,
  Select,
  Skip,
  SortBy,
  Take,
};

export function getDateString(date: Date) {
  const str = date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  let format: string;
  switch (date.getDate()) {
    case 1:
    case 21:
    case 31:
      format = "st";
      break;
    case 2:
    case 22:
      format = "nd";
      break;
    case 3:
    case 33:
      format = "rd";
      break;
    default:
      format = "th";
      break;
  }

  return `${str.replace(",", format + ",")} ${date.getFullYear()}`;
}

export function getListLastDateOfMonth(year: number, month: number) {
  const monthDifference = month === 0 ? new Date().getMonth() : month - 1;
  const listDates: Date[] = [];
  for (let singleMonth = 1; singleMonth <= monthDifference + 1; singleMonth++) {
    listDates.push(new Date(year, singleMonth, 0));
  }
  return listDates;
}
export function getListOfDatesOfCurrentMonth() {
  const day = new Date().getDate();
  const listDates: Date[] = [];
  for (let i = 1; i <= day; i++) {
    listDates.push(
      new Date(new Date().getFullYear(), new Date().getMonth(), i),
    );
  }
  return listDates;
}

export function getListOfDatesOfPreviousYearThisMonth() {
  const day = new Date().getDate();
  const listDates: Date[] = [];
  for (let i = 1; i <= day; i++) {
    listDates.push(
      new Date(new Date().getFullYear() - 1, new Date().getMonth(), i),
    );
  }
  return listDates;
}

export function getLastDateOfMonth(year: number, month: number) {
  return new Date(year, month, 0);
}

export function getListOfDatesOfMonthYear(year: number, month: number): Date[] {
  const lastDateOfMonth = getLastDateOfMonth(year, month);
  const day = lastDateOfMonth.getDate();
  const listDates: Date[] = [];
  for (let i = 1; i <= day; i++) {
    listDates.push(new Date(year, month - 1, i));
  }
  return listDates;
}

export function randomNumberInRange(min: number, max: number) {
  const floatRandom = Math.random();

  const difference = max - min;

  // random between 0 and the difference
  const random = Math.round(difference * floatRandom);

  const randomWithinRange = random + min;

  return randomWithinRange;
}

export function stringFormat(str: string, ...args: PropType[]) {
  return str.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] != "undefined" ? args[number].toString() : match;
  });
}

export function excludeProp<T extends object, K extends keyof T>(
  obj: T,
  prop: K,
): Omit<T, K> {
  const { [prop]: _, ...result } = obj;
  _;
  return result;
}

export function excludeProps<T extends object, K extends keyof T>(
  obj: T,
  ...props: K[]
): Omit<T, K> {
  if (props.length === 0) return obj;
  const [f, ...rest] = props;
  const data = excludeProp(obj, f);
  return excludeProps(data, ...(rest as Exclude<K, K>[])) as Omit<T, K>;
}

export function instanceContainsProps<T extends object>(
  obj: T | null | undefined,
  ...props: (keyof T)[]
) {
  if (!obj) return false;
  let flag = true;
  props.forEach(
    (prop) => (flag &&= Object.prototype.hasOwnProperty.call(obj, prop)),
  );
  return flag;
}

export function deg2rad(deg: number) {
  return (deg * Math.PI) / 180.0;
}

export function rad2deg(rad: number) {
  return (rad / Math.PI) * 180.0;
}

export function distance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  unit: "K" | "N" = "K",
) {
  const theta = lon1 - lon2;
  let dist =
    Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.cos(deg2rad(theta));
  dist = dist > 1 ? 1 : dist;
  dist = Math.acos(dist);
  dist = rad2deg(dist);
  dist = dist * 60 * 1.1515;

  if (unit === "K") {
    dist = dist * 1.609344;
  } else if (unit === "N") {
    dist = dist * 0.8684;
  }

  return dist;
}

export function getDates(
  start_date: Date,
  end_date: Date,
  days: number,
): Date[];
export function getDates(
  start_date: Date,
  end_date: Date,
  days: number[],
): Date[];
export function getDates(
  start_date: Date,
  end_date: Date,
  days: number | number[],
) {
  const scheduleDates: Date[] = [];
  if (typeof days === "number") {
    for (
      let date = start_date;
      date <= end_date;
      date.setDate(date.getDate() + days)
    ) {
      scheduleDates.push(date);
    }
  } else {
    for (
      let date = start_date;
      date <= end_date;
      date.setDate(date.getDate() + 1)
    ) {
      //if (date.DayOfWeek == DayOfWeek.Sunday || date.DayOfWeek == DayOfWeek.Saturday)
      //    days_list.Add(date.ToShortDateString());
      if (days.includes(date.getDay())) {
        scheduleDates.push(date);
      }
    }
  }
  return scheduleDates;
}

export function convertDateTime(input: string): Date | null {
  const date = new Date(input);
  return isNaN(date.getTime()) ? null : date;
}

export function maxDate(dates: (Date | null | undefined)[]) {
  const sortedDates = dates.sort().reverse();
  for (const date of sortedDates) {
    if (date) {
      return date;
    }
  }
  return undefined;
}
export function getKeyByValue(obj: { [key: string]: unknown }, value: unknown) {
  return Object.keys(obj).find((key) => obj[key] === value);
}
