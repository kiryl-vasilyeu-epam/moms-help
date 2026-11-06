import { stylesheet } from './Button.styles';
import type { ButtonProps } from './Button.types';
import { useStyles } from '@hooks';

export const Button = ({
  children,
  variant = 'primary',
  disabled = false,
  onClick,
  title,
  style,
  isSmall = false,
}: ButtonProps) => {
  const styles = useStyles(stylesheet);
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return styles.buttonSuccess;
      case 'info':
        return styles.buttonInfo;
      case 'danger':
        return styles.buttonDanger;
      case 'soft':
        return styles.buttonSoft;
      case 'outline':
        return styles.buttonOutline;
      case 'dangerOutline':
        return styles.buttonDangerOutline;
      case 'close':
        return isSmall ? styles.buttonCloseSmall : styles.buttonClose;
      default:
        return styles.buttonPrimary;
    }
  };

  return (
    <button
      css={[
        styles.button,
        isSmall && styles.buttonSmall,
        getVariantStyles(),
        style,
      ]}
      disabled={disabled}
      onClick={onClick}
      title={title}
    >
      {variant === 'close' ? '✕' : children}
    </button>
  );
};
