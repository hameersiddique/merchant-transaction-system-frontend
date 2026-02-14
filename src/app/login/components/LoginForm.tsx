"use client";

import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/lib/constants";
import { isValidEmail } from "@/lib/utils";
import {
  Error as ErrorIcon,
  LockOutlined as LockIcon,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const LoginForm = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
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
      await login({ email, password });
      router.push(ROUTES.DASHBOARD);
    } catch (err: any) {
      setErrors({
        general:
          err.response?.data?.message ||
          "Invalid credentials. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 480 }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          border: 1,
          borderColor: "divider",
          p: { xs: 4, sm: 6 },
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 3,
              bgcolor: "primary.main",
              mb: 2,
              boxShadow: 2,
            }}
          >
            <LockIcon sx={{ fontSize: 32, color: "white" }} />
          </Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to your merchant account
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          {errors.general && (
            <Alert
              severity="error"
              icon={<ErrorIcon />}
              sx={{ borderRadius: 2 }}
            >
              {errors.general}
            </Alert>
          )}

          <TextField
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            label="Email address"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            required
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <TextField
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            required
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isLoading}
            startIcon={
              isLoading ? <CircularProgress size={16} color="inherit" /> : null
            }
            fullWidth
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>

          <Divider sx={{ my: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?
            </Typography>
          </Divider>

          <Button
            component={Link}
            href={ROUTES.REGISTER}
            variant="outlined"
            size="large"
            fullWidth
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              fontSize: 16,
              borderWidth: 2,
              "&:hover": {
                borderWidth: 2,
              },
            }}
          >
            Create an account
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginForm;
