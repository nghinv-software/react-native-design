/**
 * Created by nghinv on Wed Jul 07 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle, TextProps, TouchableOpacityProps } from 'react-native';
import equals from 'react-fast-compare';
import { useTheme } from '@nghinv/react-native-theme';
import type { ButtonComponentProps } from '../types';

export interface ButtonProps extends TouchableOpacityProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onPress?: () => void;
  title?: string;
  titleColor?: string;
  titleStyle?: TextStyle;
  titleProps?: TextProps;
  round?: boolean;
  upperCaseTitle?: boolean;
  type?: 'full' | 'auto';
}

Button.defaultProps = {
  height: 40,
  borderRadius: 3,
  round: false,
  upperCaseTitle: false,
  type: 'auto',
};

function Button(props: ButtonProps) {
  const {
    width,
    height,
    borderRadius,
    backgroundColor,
    round,
    style,
    disabled,
    onPress,
    title,
    titleColor,
    titleStyle,
    titleProps,
    upperCaseTitle,
    type,
    ...otherProps
  } = props;
  const ButtonComponent: ButtonComponentProps = (disabled || !onPress) ? View : TouchableOpacity;
  const { theme } = useTheme();

  return (
    <ButtonComponent
      {...otherProps}
      onPress={onPress}
      style={[
        styles.container,
        {
          width: type === 'full' ? '100%' : width,
          height,
          borderRadius: round ? (height ?? 0 / 2) : borderRadius,
          backgroundColor: backgroundColor ?? theme.primary,
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      <Text
        {...titleProps}
        style={[
          {
            ...theme.textStyles.p1,
            color: titleColor ?? 'white',
          },
          titleStyle,
        ]}
      >
        {upperCaseTitle ? title?.toUpperCase() : title}
      </Text>
    </ButtonComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
});

export default React.memo(Button, equals);
