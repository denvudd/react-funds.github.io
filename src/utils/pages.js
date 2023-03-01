import { usePagination } from "../hooks/usePagination";

export const getPageCount = (totalCount, limit) => {
  return Math.ceil(totalCount / limit);
} 
