/**
 * Created by nghinv on Sun Jun 13 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle, StyleProp, TouchableOpacityProps } from 'react-native';
import { Icon, IconPropsType } from '@nghinv/react-native-icons';
import equals from 'react-fast-compare';
import type { ButtonComponentProps } from '../types';

export type ButtonIconProps = {
  onPress?: () => void;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  sizeExtend?: number;
  buttonProps?: TouchableOpacityProps;
} & IconPropsType;

ButtonIcon.defaultProps = {
  sizeExtend: 4,
};

function ButtonIcon(props: ButtonIconProps) {
  const {
    onPress,
    disabled,
    containerStyle,
    buttonProps,
    sizeExtend,
    size,
    ...otherProps
  } = props;
  const ButtonComponent: ButtonComponentProps = (disabled || !onPress) ? View : TouchableOpacity;
  const iconSize = size || 32;
  const buttonSize = iconSize + (sizeExtend as number);

  return (
    <ButtonComponent
      hitSlop={{ top: 4, bottom: 2, left: 4, right: 4 }}
      {...buttonProps}
      style={[
        styles.container,
        {
          width: buttonSize,
          height: buttonSize,
          borderRadius: buttonSize / 2,
          opacity: disabled ? 0.6 : 1,
        },
        containerStyle,
      ]}
      onPress={onPress}
    >
      <Icon
        {...otherProps}
        size={iconSize}
      />
    </ButtonComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(ButtonIcon, equals);
