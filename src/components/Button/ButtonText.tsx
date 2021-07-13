/**
 * Created by nghinv on Sat Jun 19 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle, StyleProp, TextStyle, TouchableOpacityProps, TextProps } from 'react-native';
import type { TextType } from '@nghinv/react-native-theme';
import equals from 'react-fast-compare';
import Text from '../Text';
import type { ButtonComponentProps } from '../types';

export interface ButtonTextProps {
  title?: string;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  titleStyle?: TextStyle;
  titleType?: TextType;
  buttonProps?: TouchableOpacityProps;
  titleProps?: TextProps;
}

ButtonText.defaultProps = {
  titleType: 'h1',
};

function ButtonText(props: ButtonTextProps) {
  const {
    title,
    disabled,
    onPress,
    style,
    titleStyle,
    titleType,
    buttonProps,
    titleProps,
  } = props;
  const ButtonComponent: ButtonComponentProps = (disabled || !onPress) ? View : TouchableOpacity;

  return (
    <ButtonComponent
      hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
      {...buttonProps}
      onPress={onPress}
      style={[styles.container, { opacity: disabled ? 0.6 : 1 }, style]}
    >
      <Text {...titleProps} type={titleType} style={titleStyle}>{title}</Text>
    </ButtonComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
});

export default React.memo(ButtonText, equals);
