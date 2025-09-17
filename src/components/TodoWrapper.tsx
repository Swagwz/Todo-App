import { Box, type BoxProps, type SxProps, type Theme } from "@mui/material";

type TodoWrapperProps = BoxProps & {
  variant?: "primary" | "secondary";
};

export default function TodoWrapper(props: TodoWrapperProps) {
  const { sx, children, variant = "primary", ...rest } = props;
  let customStyle: SxProps<Theme>;

  if (variant === "secondary") {
    customStyle = { bgcolor: "background.secondary", ml: 4 };
  } else {
    customStyle = { bgcolor: "background.primary" };
  }

  return (
    <Box
      sx={{
        borderRadius: 1,
        py: 1,
        px: 2,
        ...customStyle,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}
