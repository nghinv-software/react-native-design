/**
 * Created by nghinv on Tue Mar 23 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { View, ViewStyle, StyleProp, ViewProps } from 'react-native';
import equals from 'react-fast-compare';

export interface SizeBoxProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  width?: number | string;
  height?: number | string;
  backgroundColor?: string;
}

function SizeBox(props: SizeBoxProps) {
  const { style, width, height, backgroundColor, ...rest } = props;

  return (
    <View
      {...rest}
      style={[
        {
          width,
          height,
          backgroundColor,
        },
        style,
      ]}
    />
  );
}

export default React.memo(SizeBox, equals);
