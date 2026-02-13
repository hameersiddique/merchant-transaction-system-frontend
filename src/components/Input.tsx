import { TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

interface InputProps extends Omit<TextFieldProps, "variant" | "error"> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, ...props }, ref) => {
    return (
      <TextField
        inputRef={ref}
        label={label}
        error={!!error}
        helperText={error || helperText}
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          },
          ...props.sx,
        }}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
