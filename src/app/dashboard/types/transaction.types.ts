export enum TransactionStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
}

export interface Transaction {
  id: string;
  merchantId: string;
  amount: string;
  currency: string;
  status: TransactionStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateTransactionData {
  amount: number;
  currency: string;
}

export interface TransactionFilters {
  status?: TransactionStatus;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TransactionListData {
  data: Transaction[];
  meta: PaginationMeta;
}

export interface TransactionListResponse {
  data: Transaction[];
  meta: PaginationMeta;
}