import { styles } from "./Settings.styles";
import { useInputSetting, useToggleSetting, useOrderSetting } from "./Settings.hooks";
import type {
  SettingsProps,
  SettingsSection,
  SettingItem,
  InputSettingItem,
  ToggleSettingItem,
  OrderSettingItem,
} from "./Settings.types";

const InputSetting = ({ setting }: { setting: InputSettingItem }) => {
  const { handleChange } = useInputSetting({ onChange: setting.onChange });

  return (
    <div css={styles.settingRow}>
      <span css={styles.settingLabel}>{setting.label}</span>
      <input
        css={styles.input}
        type="text"
        value={setting.value}
        onChange={handleChange}
        placeholder={setting.placeholder}
      />
    </div>
  );
};

const ToggleSetting = ({ setting }: { setting: ToggleSettingItem }) => {
  const { handleToggle } = useToggleSetting({
    value: setting.value,
    onChange: setting.onChange,
  });

  return (
    <div css={styles.settingRow}>
      <span css={styles.settingLabel}>{setting.label}</span>
      <div
        css={[styles.toggle, setting.value && styles.toggleActive]}
        onClick={handleToggle}
        role="switch"
        aria-checked={setting.value}
      >
        <div css={[styles.toggleKnob, setting.value && styles.toggleKnobActive]} />
      </div>
    </div>
  );
};

const OrderSetting = ({ setting }: { setting: OrderSettingItem }) => {
  const { canMoveUp, canMoveDown, createMoveUpHandler, createMoveDownHandler } =
    useOrderSetting({
      items: setting.items,
      onOrderChange: setting.onOrderChange,
    });

  return (
    <div css={styles.orderSettingWrapper}>
      <span css={styles.settingLabel}>{setting.label}</span>
      <div css={styles.orderContainer}>
        {setting.items.map((item, index) => (
          <div
            key={item.id}
            css={styles.orderItem}
          >
            <span css={styles.orderItemLabel}>{item.label}</span>
            <div css={styles.orderControls}>
              <button
                css={styles.orderButton}
                onClick={createMoveUpHandler(index)}
                disabled={!canMoveUp(index)}
                aria-label="Move up"
              >
                ↑
              </button>
              <button
                css={styles.orderButton}
                onClick={createMoveDownHandler(index)}
                disabled={!canMoveDown(index)}
                aria-label="Move down"
              >
                ↓
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SettingItemRenderer = ({ setting }: { setting: SettingItem }) => {
  switch (setting.type) {
  case "input":
    return <InputSetting setting={setting} />;
  case "toggle":
    return <ToggleSetting setting={setting} />;
  case "order":
    return <OrderSetting setting={setting} />;
  default:
    return null;
  }
};

const SettingsSectionComponent = ({ section }: { section: SettingsSection }) => {
  return (
    <div css={styles.section}>
      <h3 css={styles.sectionTitle}>{section.title}</h3>
      {section.settings.map((setting) => (
        <SettingItemRenderer
          key={setting.id}
          setting={setting}
        />
      ))}
    </div>
  );
};

export const Settings = ({ sections }: SettingsProps) => {
  return (
    <div css={styles.container}>
      {sections.map((section) => (
        <SettingsSectionComponent
          key={section.id}
          section={section}
        />
      ))}
    </div>
  );
};
