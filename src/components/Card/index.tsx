/**
 * Created by nghinv on Fri Jun 18 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import {
  View,
  ViewProps,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
} from 'react-native';
import equals from 'react-fast-compare';
import { useTheme } from '@nghinv/react-native-theme';

type ButtonComponentProps = React.ElementType &
  (typeof TouchableOpacity | typeof View);

export interface CardProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  shadow?: boolean;
  borderRadius?: number;
  children?: React.ReactNode;
  padding?: number;
  margin?: number;
  onPress?: () => void;
  disabled?: boolean;
}

Card.defaultProps = {
  borderRadius: 5,
  shadow: true,
  disabled: false,
};

function Card(props: CardProps) {
  const {
    style,
    backgroundColor,
    shadow,
    borderRadius,
    padding,
    margin,
    children,
    onPress,
    disabled,
    ...rest
  } = props;

  const { theme } = useTheme();

  const ButtonComponent: ButtonComponentProps = disabled || !onPress ? View : TouchableOpacity;

  const shadowStyle = shadow
    ? {
      shadowColor: theme.shadowColor,
      shadowOpacity: 0.18,
      shadowRadius: 3,
      shadowOffset: { height: 1, width: 0 },
      elevation: 2,
    } : {};

  const containerStyle = {
    ...shadowStyle,
    backgroundColor: backgroundColor ?? theme.card,
    borderRadius,
    padding,
    margin,
    opacity: disabled ? 0.6 : 1,
  };

  return (
    <ButtonComponent {...rest} style={[containerStyle, style]}>
      {children}
    </ButtonComponent>
  );
}

export default React.memo(Card, equals);
