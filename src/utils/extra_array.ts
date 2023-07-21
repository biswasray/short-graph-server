export type PropType = string | number | symbol;
export type Comparator<T> = (a: T, b: T) => number;
export type KeySelector<T> = (item: T) => PropType;

export function groupBy<T, K extends PropType>(
  array: T[],
  keySelector: (element: T) => K,
): (T[] & { key: K })[] {
  const groups: { [key in K]?: T[] } = {};

  array.forEach((element) => {
    const key = keySelector(element);

    if (!groups[key]) {
      groups[key] = Object.assign([], { key });
    }

    groups[key]?.push(element);
  });

  return Object.values(groups);
}

export function multipleGroupBy<T, K extends string | number | symbol>(
  array: T[],
  keySelector: (element: T) => K[],
): (T[] & { key: string })[] {
  const groups: Record<string, T[] & { key: string }> = {};

  array.forEach((element) => {
    const key = keySelector(element).join(",");

    if (!groups[key]) {
      groups[key] = Object.assign([], { key });
    }

    groups[key]?.push(element);
  });

  return Object.values(groups);
}

export function MultipleGroupBy<T, K extends string | number | symbol>(
  this: T[],
  keySelector: (element: T) => K[],
) {
  const groups: Record<string, T[] & { key: string }> = {};

  this.forEach((element) => {
    const key = keySelector(element).join(",");

    if (!groups[key]) {
      groups[key] = Object.assign([], { key });
    }

    groups[key]?.push(element);
  });

  const obj = Object.values(groups) as (T[] & { key: string })[];
  return Object.assign(obj, ExtraArrayFunctions);
}

export function GroupBy<T, K extends PropType>(
  this: T[],
  keySelector: (element: T) => K,
) {
  const groups: { [key in K]?: T[] } = {};

  this.forEach((element) => {
    const key = keySelector(element);

    if (!groups[key]) {
      groups[key] = Object.assign([], { key });
    }

    groups[key]?.push(element);
  });

  const obj = Object.values(groups) as (T[] & { key: K })[];
  return Object.assign(obj, ExtraArrayFunctions);
}

export function sortBy<T, K extends PropType>(
  array: T[],
  keySelector: (element: T) => K,
  order: "ASC" | "DESC" = "ASC",
) {
  return array.sort((a, b) => {
    const A = keySelector(a);
    const B = keySelector(b);
    let flag = 1;
    if (order === "DESC") {
      flag = -1;
    }
    if (typeof A === "number" && typeof B === "number") {
      return flag * (A - B);
    }
    if (typeof A === "string" && typeof B === "string") {
      return flag * A.localeCompare(B);
    }
    if (typeof A === "symbol" && typeof B === "symbol") {
      return flag * A.toString().localeCompare(B.toString());
    }
    return (flag * ((A as number) - (B as number))) as number;
  });
}

export function SortBy<T, K extends PropType>(
  this: T[],
  keySelector: (element: T) => K,
  order: "ASC" | "DESC" = "ASC",
) {
  return this.sort((a, b) => {
    const A = keySelector(a);
    const B = keySelector(b);
    let flag = 1;
    if (order === "DESC") {
      flag = -1;
    }
    if (typeof A === "number" && typeof B === "number") {
      return flag * (A - B);
    }
    if (typeof A === "string" && typeof B === "string") {
      return flag * A.localeCompare(B);
    }
    if (typeof A === "symbol" && typeof B === "symbol") {
      return flag * A.toString().localeCompare(B.toString());
    }
    return (flag * ((A as number) - (B as number))) as number;
  });
}

export function compare(a: PropType, b: PropType) {
  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }
  if (typeof a === "string" && typeof b === "string") {
    return a.localeCompare(b);
  }
  if (typeof a === "symbol" && typeof b === "symbol") {
    return a.toString().localeCompare(b.toString());
  }
  return 0;
}

export function comparator<T, K extends KeySelector<T>>(
  keySelector: K,
  order: "ASC" | "DESC" = "ASC",
): Comparator<T> {
  let flag = 1;
  if (order === "DESC") {
    flag = -1;
  }
  return (a: T, b: T): number => {
    return flag * compare(keySelector(a), keySelector(b));
  };
}

// export function orderBy<T>(
//   array: T[],
//   order: "ASC" | "DESC" = "ASC",
//   ...keySelectors: ((element: T) => PropType)[]
// ) {
//   let flag = 1;
//   if (order === "DESC") {
//     flag = -1;
//   }
//   return array.sort((a, b) => {
//     for (const keySelector of keySelectors) {
//       const A = keySelector(a);
//       const B = keySelector(b);
//       const result = flag * compare(A, B);
//       if (result !== 0) {
//         return result;
//       }
//     }
//     return 0;
//   });
// }

export function orderBy<T>(array: T[], ...comparators: Comparator<T>[]): T[] {
  return array.sort((a, b) => {
    for (const comparator of comparators) {
      const result = comparator(a, b);
      if (result !== 0) {
        return result;
      }
    }
    return 0;
  });
}

export function OrderBy<T>(this: T[], ...comparators: Comparator<T>[]): T[] {
  return this.sort((a, b) => {
    for (const comparator of comparators) {
      const result = comparator(a, b);
      if (result !== 0) {
        return result;
      }
    }
    return 0;
  });
}

export function distinct<T>(array: T[]) {
  const set = new Set(array);
  return Array.from(set);
}

export function Distinct<T>(this: T[]) {
  const set = new Set(this);
  return Array.from(set);
}

export function Select<T, R>(this: T[], keySelector: (element: T) => R) {
  const obj = this.map(keySelector);
  return Object.assign(obj, ExtraArrayFunctions);
}

export function skip<T>(array: T[], offset: number) {
  return array.slice(offset);
}

export function Skip<T>(this: T[], offset: number) {
  const obj = this.slice(offset);
  return Object.assign(obj, ExtraArrayFunctions);
}

export function take<T>(array: T[], count: number) {
  return array.slice(0, count);
}

export function Take<T>(this: T[], count: number) {
  const obj = this.slice(0, count);
  return Object.assign(obj, ExtraArrayFunctions);
}

export const ExtraArrayFunctions = {
  Select,
  Distinct,
  SortBy,
  OrderBy,
  GroupBy,
  MultipleGroupBy,
  Skip,
  Take,
};

export type IExtraArrayFunctions = typeof ExtraArrayFunctions;
