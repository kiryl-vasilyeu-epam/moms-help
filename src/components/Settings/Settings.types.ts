export type SettingType = 'input' | 'toggle' | 'order';

export interface BaseSettingItem {
  id: string;
  label: string;
}

export interface InputSettingItem extends BaseSettingItem {
  type: 'input';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export interface ToggleSettingItem extends BaseSettingItem {
  type: 'toggle';
  value: boolean;
  onChange: (value: boolean) => void;
}

export interface OrderItem {
  id: string;
  label: string;
}

export interface OrderSettingItem extends BaseSettingItem {
  type: 'order';
  items: OrderItem[];
  onOrderChange: (items: OrderItem[]) => void;
}

export type SettingItem =
  | InputSettingItem
  | ToggleSettingItem
  | OrderSettingItem;

export interface SettingsSection {
  id: string;
  title: string;
  settings: SettingItem[];
}

export interface SettingsProps {
  sections: SettingsSection[];
}
