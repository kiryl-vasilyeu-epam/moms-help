export interface FilterButtonProps<T> {
  label: string;
  value: T;
  isActive?: boolean;
  handleClick?: (value: T) => void;
  disabled?: boolean;
}
