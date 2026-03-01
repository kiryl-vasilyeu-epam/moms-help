import { InputSetting } from '../InputSetting';
import { ToggleSetting } from '../ToggleSetting';
import { OrderSetting } from '../OrderSetting';
import type { SettingItemRendererProps } from './SettingItemRenderer.types';

export const SettingItemRenderer = ({
  setting,
  setDataReceiver,
}: SettingItemRendererProps) => {
  switch (setting.type) {
    case 'input':
      return (
        <InputSetting setting={setting} setDataReceiver={setDataReceiver} />
      );
    case 'toggle':
      return (
        <ToggleSetting setting={setting} setDataReceiver={setDataReceiver} />
      );
    case 'order':
      return (
        <OrderSetting setting={setting} setDataReceiver={setDataReceiver} />
      );
    default:
      return null;
  }
};
