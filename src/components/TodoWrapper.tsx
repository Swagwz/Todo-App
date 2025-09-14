import { Box } from "@mui/material";

/**
 * @typedef {"primary" | "secondary"} Variant
 *
 * @typedef {import("@mui/material/Box").BoxProps & {
 *   variant?: Variant
 * }} TodoWrapperProps
 */

/**
 * @param {TodoWrapperProps} props
 */
export default function TodoWrapper(props) {
  const { sx, children, variant = "primary", ...rest } = props;
  let customStyle;

  if (variant === "primary") {
    customStyle = { bgcolor: "background.primary" };
  } else if (variant === "secondary") {
    customStyle = { bgcolor: "background.secondary", ml: 4 };
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
