/**
 * Created by nghinv on Fri Jun 18 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { Text as NativeText, TextProps, TextStyle } from 'react-native';
import equals from 'react-fast-compare';
import { useTheme, TextType } from '@nghinv/react-native-theme';

export interface TextPropsType extends TextProps {
  children?: string | React.ReactNode;
  style?: TextStyle;
  type?: TextType;
}

Text.defaultProps = {

};

function Text(props: TextPropsType) {
  const {
    children,
    style,
    type,
    ...rest
  } = props;
  const { theme } = useTheme();

  return (
    <NativeText
      {...rest}
      style={[
        theme.textStyles[type ?? 'p0'],
        style,
      ]}
    >
      {children}
    </NativeText>
  );
}

export default React.memo(Text, equals);
