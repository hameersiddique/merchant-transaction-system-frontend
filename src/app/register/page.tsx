import { Box } from "@mui/material";
import RegisterForm from "./components/RegisterForm";

export default function RegisterPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        py: { xs: 6, sm: 12 },
        px: { xs: 2, sm: 3, lg: 4 },
      }}
    >
      <RegisterForm />
    </Box>
  );
}
