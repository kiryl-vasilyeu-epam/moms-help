import type {
  SettingsSectionData,
  SetDataReceiver,
} from '../../Settings.types';

export interface SettingsSectionProps {
  section: SettingsSectionData;
  setDataReceiver: SetDataReceiver;
}
