"use client";

import TransactionTable from "@/app/dashboard/components/TransactionTable";
import { Pagination } from "@/components/Pagination";
import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/lib/constants";
import { usePagination, useTransactions } from "@/lib/hooks";
import {
  Add as AddIcon,
  Analytics as AnalyticsIcon,
  Description as DescriptionIcon,
  Logout as LogoutIcon,
  Receipt as ReceiptIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TransactionModal from "./components/TransactionModal";

export default function DashboardPage() {
  const router = useRouter();
  const {
    merchant,
    logout,
    isAuthenticated,
    isLoading: authLoading,
  } = useAuth();
  const { page, limit, setPage } = usePagination();
  const { transactions, isLoading, pagination, refetch } = useTransactions({
    page,
    limit,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push(ROUTES.LOGIN);
    }
  }, [isAuthenticated, authLoading, router]);

  const handleLogout = () => {
    logout();
    router.push(ROUTES.LOGIN);
  };

  const handleTransactionSuccess = () => {
    setIsModalOpen(false);
    refetch();
  };

  if (authLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={60} thickness={4} />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Loading dashboard...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "background.paper",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: 2,
              }}
            >
              <ReceiptIcon sx={{ color: "white", fontSize: 28 }} />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700} color="text.primary">
                Merchant Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Welcome back, <strong>{merchant?.name}</strong>
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ textTransform: "none" }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card elevation={0} sx={{ border: 1, borderColor: "divider" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      bgcolor: "primary.lighter",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ReceiptIcon sx={{ color: "primary.main", fontSize: 28 }} />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Total Transactions
                    </Typography>
                    <Typography variant="h4" fontWeight={700}>
                      {pagination?.total || 0}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card elevation={0} sx={{ border: 1, borderColor: "divider" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      bgcolor: "secondary.lighter",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <AnalyticsIcon
                      sx={{ color: "secondary.main", fontSize: 28 }}
                    />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Current Page
                    </Typography>
                    <Typography variant="h4" fontWeight={700}>
                      {pagination?.page || 1}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card elevation={0} sx={{ border: 1, borderColor: "divider" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      bgcolor: "success.lighter",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <DescriptionIcon
                      sx={{ color: "success.main", fontSize: 28 }}
                    />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Total Pages
                    </Typography>
                    <Typography variant="h4" fontWeight={700}>
                      {pagination?.totalPages || 1}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper
          elevation={0}
          sx={{ border: 1, borderColor: "divider", overflow: "hidden" }}
        >
          <Box
            sx={{
              px: 3,
              py: 2.5,
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "background.paper",
            }}
          >
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Transactions
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage and view all your transactions
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={refetch}
                disabled={isLoading}
                sx={{ textTransform: "none" }}
              >
                Refresh
              </Button>

              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setIsModalOpen(true)}
                sx={{ textTransform: "none" }}
              >
                Create Transaction
              </Button>
            </Box>
          </Box>

          <TransactionTable transactions={transactions} isLoading={isLoading} />

          {pagination && pagination.totalPages > 1 && (
            <Box
              sx={{
                px: 3,
                py: 2.5,
                borderTop: 1,
                borderColor: "divider",
                bgcolor: "grey.50",
              }}
            >
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={setPage}
              />
            </Box>
          )}
        </Paper>
      </Container>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleTransactionSuccess}
      />
    </Box>
  );
}
