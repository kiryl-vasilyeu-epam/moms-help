import { IconButton, TextField } from '@mui/material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { styles } from './OrderSetting.styles';
import { useOrderSetting } from './OrderSetting.hooks';
import type { OrderSettingProps } from './OrderSetting.types';

export const OrderSetting = ({
  setting,
  setDataReceiver,
}: OrderSettingProps) => {
  const {
    items,
    canMoveUp,
    canMoveDown,
    createMoveUpHandler,
    createMoveDownHandler,
    inputValues,
    handleInputChange,
  } = useOrderSetting({
    item: setting,
    setDataReceiver,
  });

  return (
    <div css={styles.orderSettingWrapper}>
      <span css={styles.settingLabel}>{setting.label}</span>
      <div css={styles.orderContainer}>
        {items.map((item, index) => (
          <div key={item.id} css={styles.orderItem}>
            <div style={styles.orderItemInfo}>
              <TextField
                type="text"
                value={inputValues[index]}
                onChange={handleInputChange(index)}
                multiline
              />
              <span css={styles.orderItemLabel}>{item.label}</span>
            </div>
            <div css={styles.orderControls}>
              <IconButton
                onClick={createMoveUpHandler(index)}
                disabled={!canMoveUp(index)}
                color="info"
              >
                <ArrowCircleUpIcon style={styles.orderButtonIcon} />
              </IconButton>
              <IconButton
                onClick={createMoveDownHandler(index)}
                disabled={!canMoveDown(index)}
                color="error"
              >
                <ArrowCircleDownIcon style={styles.orderButtonIcon} />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
