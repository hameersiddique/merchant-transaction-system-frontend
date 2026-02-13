"use client";

import { Transaction } from "@/types";
import { Receipt as ReceiptIcon } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { JSX } from "react";
import TransactionRow from "./TransactionRow";

interface TransactionTableProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

const TransactionTable = ({
  transactions,
  isLoading,
}: TransactionTableProps): JSX.Element => {
  if (isLoading) {
    return (
      <Box
        sx={{
          py: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <CircularProgress size={48} thickness={4} />
        <Typography variant="body2" color="text.secondary" fontWeight={500}>
          Loading transactions...
        </Typography>
      </Box>
    );
  }

  if (transactions.length === 0) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: 3,
            bgcolor: "grey.100",
            mb: 2,
          }}
        >
          <ReceiptIcon sx={{ fontSize: 40, color: "text.secondary" }} />
        </Box>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          No transactions yet
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Get started by creating your first transaction
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "grey.50" }}>
            <TableCell>
              <Typography
                variant="caption"
                fontWeight={700}
                color="text.secondary"
                sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
              >
                Transaction ID
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="caption"
                fontWeight={700}
                color="text.secondary"
                sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
              >
                Amount
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="caption"
                fontWeight={700}
                color="text.secondary"
                sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
              >
                Status
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="caption"
                fontWeight={700}
                color="text.secondary"
                sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
              >
                Date
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionTable;
