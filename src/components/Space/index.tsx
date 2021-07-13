/**
 * Created by nghinv on Tue Mar 23 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp, ViewProps } from 'react-native';
import equals from 'react-fast-compare';

export interface SpaceProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  flex?: number;
  children?: React.ReactNode;
}

function Space(props: SpaceProps) {
  const { style, flex, children, ...rest } = props;

  const flexStyle = typeof flex === 'number' ? {
    flex,
  } : {};

  return (
    <View {...rest} style={[styles.container, { minWidth: 100, ...flexStyle }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(Space, equals);
