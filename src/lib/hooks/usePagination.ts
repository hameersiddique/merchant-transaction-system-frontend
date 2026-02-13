
import { PAGINATION } from '@/lib/constants';
import { useCallback, useState } from 'react';

interface UsePaginationResult {
  page: number;
  limit: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  resetPagination: () => void;
}

export function usePagination(
  initialPage: number = PAGINATION.DEFAULT_PAGE,
  initialLimit: number = PAGINATION.DEFAULT_LIMIT
): UsePaginationResult {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const nextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const previousPage = useCallback(() => {
    setPage((prev) => Math.max(1, prev - 1));
  }, []);

  const resetPagination = useCallback(() => {
    setPage(initialPage);
    setLimit(initialLimit);
  }, [initialPage, initialLimit]);

  return {
    page,
    limit,
    setPage,
    setLimit,
    nextPage,
    previousPage,
    resetPagination,
  };
}
