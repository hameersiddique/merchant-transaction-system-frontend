"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/lib/constants";
import { isValidEmail, validatePasswordStrength } from "@/lib/utils";
import {
  Error as ErrorIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import { Alert, Box, Divider, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const RegisterForm = () => {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else {
      const { isValid, errors: pwdErrors } = validatePasswordStrength(password);
      if (!isValid) {
        newErrors.password = pwdErrors.join(", ");
      }
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
      await register({ name: name.trim(), email, password });
      router.push(ROUTES.LOGIN);
    } catch (err: any) {
      setErrors({
        general:
          err.response?.data?.message ||
          "Registration failed. Please try again.",
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
              bgcolor: "secondary.main",
              mb: 2,
              boxShadow: 2,
            }}
          >
            <PersonAddIcon sx={{ fontSize: 32, color: "white" }} />
          </Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Register to start managing transactions
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

          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            required
          />

          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            label="Email address"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            required
          />

          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            label="Password"
            placeholder="Enter your password"
            helperText={errors.password || "Minimum 8 characters"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            fullWidth
          >
            Create account
          </Button>

          <Divider sx={{ my: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?
            </Typography>
          </Divider>

          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => router.push(ROUTES.LOGIN)}
          >
            Sign in instead
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterForm;
