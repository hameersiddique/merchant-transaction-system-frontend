
import { transactionService } from '@/app/dashboard/services/transaction.service';
import { PaginationMeta, PaginationParams, Transaction } from '@/app/dashboard/types/transaction.types';
import { useCallback, useEffect, useState } from 'react';

interface UseTransactionsResult {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  pagination: PaginationMeta | null;
  refetch: () => void;
}

export function useTransactions(params: PaginationParams): UseTransactionsResult {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await transactionService.getTransactions(params);
      console.log('response', response);
      setTransactions(response.data);
      setPagination(response.meta);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch transactions');
      console.error('Error fetching transactions:', err);
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  }, [params.page, params.limit]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return {
    transactions,
    isLoading,
    error,
    pagination,
    refetch: fetchTransactions,
  };
}