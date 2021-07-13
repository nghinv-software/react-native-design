/**
 * Created by nghinv on Thu Mar 25 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp, ViewProps } from 'react-native';
import equals from 'react-fast-compare';
import { useTheme } from '@nghinv/react-native-theme';

export interface DividerProps extends ViewProps {
  type?: 'horizontal' | 'vertical';
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  height?: number;
  width?: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

Divider.defaultProps = {
  type: 'horizontal',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

function Divider(props: DividerProps) {
  const {
    type,
    style,
    backgroundColor,
    height,
    width,
    top,
    bottom,
    left,
    right,
    ...rest
  } = props;
  const { theme } = useTheme();
  const sizeStyle = type === 'vertical' ? {
    width: width ?? StyleSheet.hairlineWidth,
    minHeight: 8,
    height,
  } : {
    height: height ?? StyleSheet.hairlineWidth,
    width,
  };

  return (
    <View
      {...rest}
      style={[
        {
          ...sizeStyle,
          backgroundColor: backgroundColor || theme.separator,
          marginLeft: left,
          marginTop: top,
          marginRight: right,
          marginBottom: bottom,
        },
        style,
      ]}
    />
  );
}

export default React.memo(Divider, equals);
