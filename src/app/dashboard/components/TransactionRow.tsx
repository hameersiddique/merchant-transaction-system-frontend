import { formatCurrency, formatDate, truncateText } from "@/lib/utils";
import {
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Tag as TagIcon,
} from "@mui/icons-material";
import { Box, Chip, TableCell, TableRow, Typography } from "@mui/material";
import { JSX } from "react";
import { Transaction, TransactionStatus } from "../types/transaction.types";

interface TransactionRowProps {
  transaction: Transaction;
}

const TransactionRow = ({ transaction }: TransactionRowProps): JSX.Element => {
  const getStatusConfig = (status: TransactionStatus) => {
    switch (status) {
      case TransactionStatus.SUCCESS:
        return {
          color: "success" as const,
          icon: <CheckCircleIcon sx={{ fontSize: 16 }} />,
        };
      case TransactionStatus.FAILED:
        return {
          color: "error" as const,
          icon: <CancelIcon sx={{ fontSize: 16 }} />,
        };
      case TransactionStatus.PENDING:
        return {
          color: "warning" as const,
          icon: <ScheduleIcon sx={{ fontSize: 16 }} />,
        };
      default:
        return {
          color: "default" as const,
          icon: <ScheduleIcon sx={{ fontSize: 16 }} />,
        };
    }
  };

  const statusConfig = getStatusConfig(transaction.status);

  return (
    <TableRow
      hover
      sx={{
        "&:last-child td": { border: 0 },
        cursor: "pointer",
        transition: "all 0.2s",
      }}
    >
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: 1.5,
              bgcolor: "primary.lighter",
            }}
          >
            <TagIcon sx={{ fontSize: 18, color: "primary.main" }} />
          </Box>
          <Box>
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{ fontFamily: "monospace" }}
            >
              {truncateText(transaction.id, 16)}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontFamily: "monospace" }}
            >
              ID
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Typography variant="body2" fontWeight={700}>
          {formatCurrency(transaction.amount, transaction.currency)}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ textTransform: "uppercase", fontWeight: 600 }}
        >
          {transaction.currency}
        </Typography>
      </TableCell>
      <TableCell>
        <Chip
          icon={statusConfig.icon}
          label={transaction.status}
          color={statusConfig.color}
          size="small"
          sx={{ fontWeight: 600, minWidth: 100 }}
        />
      </TableCell>
      <TableCell>
        <Typography variant="body2" fontWeight={600}>
          {formatDate(transaction.createdAt, false)}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date(transaction.createdAt).toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default TransactionRow;
