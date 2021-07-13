/**
 * Created by nghinv on Wed May 05 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp, TextStyle, ViewProps, TextProps } from 'react-native';
import equals from 'react-fast-compare';

export interface EnvironmentBannerProps {
  visible?: boolean;
  backgroundColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  containerProps?: ViewProps;
  title: string;
  titleColor?: string;
  titleStyle?: TextStyle;
  titleProps?: TextProps;
  upperCase?: boolean;
}

EnvironmentBanner.defaultProps = {
  backgroundColor: 'rgba(120, 120, 120, 0.3)',
  visible: true,
  titleColor: '#31D158',
  upperCase: true,
};

function EnvironmentBanner(props: EnvironmentBannerProps) {
  const {
    title,
    backgroundColor,
    visible,
    containerStyle,
    titleStyle,
    containerProps,
    titleProps,
    titleColor,
    upperCase,
  } = props;

  if (!visible) return null;

  return (
    <View
      pointerEvents='none'
      {...containerProps}
      style={[
        styles.container,
        { backgroundColor },
        containerStyle,
      ]}
    >
      <Text
        {...titleProps}
        style={[styles.txtTitle, { color: titleColor }, titleStyle]}
      >
        {upperCase ? String(title).toUpperCase() : title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 16,
    right: -50,
    width: 160,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [
      { rotate: '45deg' },
    ],
  },
  txtTitle: {
    fontWeight: 'bold',
  },
});

export default React.memo(EnvironmentBanner, equals);
