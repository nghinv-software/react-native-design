/**
 * Created by nghinv on Sun Jun 13 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import equals from 'react-fast-compare';
import { useTheme } from '@nghinv/react-native-theme';

export interface ContainerProps {
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  renderBackground?: () => React.ReactNode | React.ReactNode;
}

function Container(props: ContainerProps) {
  const { children, style, backgroundColor, renderBackground } = props;
  const { theme } = useTheme();

  const containerStyle = {
    backgroundColor: backgroundColor ?? theme.background,
  };

  return (
    <View style={[styles.container, containerStyle, style]}>
      {
        typeof renderBackground === 'function' ? renderBackground() : (renderBackground || null)
      }
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(Container, equals);
