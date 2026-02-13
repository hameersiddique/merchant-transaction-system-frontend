import { CircularProgress, Button as MuiButton } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "color"
> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  sx?: SxProps<Theme>;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      fullWidth = false,
      startIcon,
      endIcon,
      sx,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const getMuiVariant = () => {
      if (variant === "outline") return "outlined";
      return "contained";
    };

    const getMuiColor = () => {
      switch (variant) {
        case "primary":
          return "primary";
        case "secondary":
          return "secondary";
        case "danger":
          return "error";
        case "outline":
          return "primary";
        default:
          return "primary";
      }
    };

    const getSizeStyles = () => {
      switch (size) {
        case "sm":
          return { py: 1, px: 3, fontSize: 14 };
        case "md":
          return { py: 1.5, px: 4, fontSize: 15 };
        case "lg":
          return { py: 1.75, px: 5, fontSize: 16 };
        default:
          return { py: 1.5, px: 4, fontSize: 15 };
      }
    };

    return (
      <MuiButton
        ref={ref}
        type={type}
        variant={getMuiVariant()}
        color={getMuiColor()}
        disabled={disabled || isLoading}
        fullWidth={fullWidth}
        startIcon={
          isLoading ? <CircularProgress size={16} color="inherit" /> : startIcon
        }
        endIcon={!isLoading ? endIcon : undefined}
        sx={{
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 2,
          ...getSizeStyles(),
          ...(variant === "outline" && {
            borderWidth: 2,
            "&:hover": {
              borderWidth: 2,
            },
          }),
          ...sx,
        }}
        {...props}
      >
        {isLoading ? "Loading..." : children}
      </MuiButton>
    );
  },
);

Button.displayName = "Button";

export default Button;
