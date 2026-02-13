import { API_ENDPOINTS, apiClient } from '@/lib/api';
import {
  ApiResponse,
  CreateTransactionData,
  PaginationParams,
  Transaction,
  TransactionFilters,
  TransactionListData,
  TransactionListResponse
} from '@/types';

export const transactionService = {
  getTransactions: async (
    params: PaginationParams & TransactionFilters
  ): Promise<TransactionListData> => {
    const response = await apiClient.get<TransactionListResponse>(
      API_ENDPOINTS.TRANSACTIONS.LIST,
      { params }
    );

    return response.data;
  },

  createTransaction: async (data: CreateTransactionData): Promise<Transaction> => {
    const response = await apiClient.post<ApiResponse<Transaction>>(
      API_ENDPOINTS.TRANSACTIONS.CREATE,
      data
    );
    return response.data.data;
  }
};