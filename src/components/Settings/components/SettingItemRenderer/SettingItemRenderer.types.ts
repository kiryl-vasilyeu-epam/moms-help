import type { SettingItem, SetDataReceiver } from '../../Settings.types';

export interface SettingItemRendererProps {
  setting: SettingItem;
  setDataReceiver: SetDataReceiver;
}
