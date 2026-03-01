export type SettingType = 'input' | 'toggle' | 'order';

export interface BaseSettingItem {
  id: string;
  label: string;
}

export interface InputSettingItem extends BaseSettingItem {
  type: 'input';
  value: string;
}

export interface ToggleSettingItem extends BaseSettingItem {
  type: 'toggle';
  value: boolean;
}

export interface OrderItem {
  id: string;
  label: string;
  withInput?: boolean;
  inputValue?: string;
}

export interface OrderSettingItem extends BaseSettingItem {
  type: 'order';
  items: OrderItem[];
}

export type SettingItem =
  | InputSettingItem
  | ToggleSettingItem
  | OrderSettingItem;

export interface SettingsSectionData {
  id: string;
  title: string;
  settings: SettingItem[];
}

export interface SettingsProps {
  sections: SettingsSectionData[];
  onSave: (data: SaveDataItem[]) => void;
}

export interface SaveDataInput {
  id: string;
  type: 'input';
  value: string;
}

export interface SaveDataToggle {
  id: string;
  type: 'toggle';
  value: boolean;
}

export interface SaveDataOrder {
  id: string;
  type: 'order';
  items: {
    id: string;
    inputValue?: string;
  }[];
}

export type SaveDataItem = SaveDataInput | SaveDataToggle | SaveDataOrder;
export type SetDataReceiver = ({
  id,
  receiveData,
}: {
  id: string;
  receiveData: () => SaveDataItem;
}) => void;
