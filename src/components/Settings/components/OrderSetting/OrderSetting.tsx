import { IconButton, TextField } from '@mui/material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { styles } from './OrderSetting.styles';
import { useOrderSetting } from './OrderSetting.hooks';
import type { OrderSettingProps } from './OrderSetting.types';
import { Typography } from '../../../Typography';

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
    animatingIndices,
    setItemRef,
    getAnimationStyle,
  } = useOrderSetting({
    item: setting,
    setDataReceiver,
  });

  return (
    <div css={styles.orderSettingWrapper}>
      <Typography variant="label" style={styles.settingLabel}>
        {setting.label}
      </Typography>
      <div css={styles.orderContainer}>
        {items.map((item, index) => (
          <div
            key={item.id}
            ref={setItemRef(item.id)}
            css={styles.orderItem}
            style={getAnimationStyle(index)}
          >
            <div css={styles.orderItemInfo}>
              <TextField
                type="text"
                value={inputValues[index]}
                onChange={handleInputChange(index)}
                multiline
              />
              <Typography variant="caption" style={styles.orderItemLabel}>
                {item.label}
              </Typography>
            </div>
            <div css={styles.orderControls}>
              <IconButton
                onClick={createMoveUpHandler(index)}
                disabled={!canMoveUp(index) || animatingIndices !== null}
                color="info"
              >
                <ArrowCircleUpIcon sx={styles.orderButtonIcon} />
              </IconButton>
              <IconButton
                onClick={createMoveDownHandler(index)}
                disabled={!canMoveDown(index) || animatingIndices !== null}
                color="error"
              >
                <ArrowCircleDownIcon sx={styles.orderButtonIcon} />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
