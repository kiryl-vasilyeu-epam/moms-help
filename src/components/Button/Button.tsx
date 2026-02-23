import { styles } from "./Button.styles";
import type { ButtonProps } from "./Button.types";

export const Button = ({
  children,
  variant = 'primary',
  disabled = false,
  onClick,
  title,
  style,
}: ButtonProps) => {
  const getVariantStyles = () => {
    switch (variant) {
    case 'success':
      return styles.buttonSuccess;
    case 'info':
      return styles.buttonInfo;
    case 'danger':
      return styles.buttonDanger;
    default:
      return styles.buttonPrimary;
    }
  };

  return (
    <button
      css={[styles.button, getVariantStyles(), style]}
      disabled={disabled}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  );
};
