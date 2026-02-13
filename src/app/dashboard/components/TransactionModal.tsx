"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { CURRENCIES } from "@/lib/constants";
import { isValidAmount } from "@/lib/utils";
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";
import { Alert, AlertTitle, Box, MenuItem } from "@mui/material";
import { FC, FormEvent, useState } from "react";
import { transactionService } from "../services/transaction.service";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const TransactionModal: FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [errors, setErrors] = useState<{ amount?: string; general?: string }>(
    {},
  );
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    const amountNum = parseFloat(amount);

    if (!amount) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(amountNum) || !isValidAmount(amountNum)) {
      newErrors.amount = "Amount must be at least 0.01";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      await transactionService.createTransaction({
        amount: parseFloat(amount),
        currency: currency.toUpperCase(),
      });
      setSuccess(true);
      setTimeout(() => {
        resetForm();
        onSuccess();
      }, 1500);
    } catch (err: any) {
      setErrors({
        general: err.response?.data?.message || "Failed to create transaction",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setAmount("");
    setCurrency("USD");
    setErrors({});
    setSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Transaction">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        {errors.general && (
          <Alert severity="error" icon={<ErrorIcon />} sx={{ borderRadius: 2 }}>
            <AlertTitle sx={{ fontWeight: 700 }}>Error</AlertTitle>
            {errors.general}
          </Alert>
        )}

        {success && (
          <Alert
            severity="success"
            icon={<CheckCircleIcon />}
            sx={{ borderRadius: 2 }}
          >
            <AlertTitle sx={{ fontWeight: 700 }}>Success!</AlertTitle>
            Transaction created successfully
          </Alert>
        )}

        <Input
          id="amount"
          name="amount"
          type="number"
          label="Amount"
          placeholder="Enter transaction amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          error={errors.amount}
          disabled={isLoading || success}
          required
          inputProps={{
            step: "0.01",
            min: "0.01",
          }}
        />

        <Input
          id="currency"
          name="currency"
          label="Currency"
          select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          disabled={isLoading || success}
          required
        >
          {CURRENCIES.map((curr) => (
            <MenuItem key={curr.value} value={curr.value}>
              {curr.label}
            </MenuItem>
          ))}
        </Input>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            pt: 2,
            borderTop: 1,
            borderColor: "divider",
          }}
        >
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
            sx={{ minWidth: 100 }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={success}
            isLoading={isLoading}
            sx={{ minWidth: 140 }}
          >
            Create Transaction
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TransactionModal;
