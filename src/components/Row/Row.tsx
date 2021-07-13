/**
 * Created by nghinv on Sat Jun 12 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, StyleProp, TextStyle, TextProps, TouchableOpacityProps } from 'react-native';
import equals from 'react-fast-compare';
import { Icon, IconPropsType } from '@nghinv/react-native-icons';
import { useTheme, Spacing, px } from '@nghinv/react-native-theme';
import Divider, { DividerProps } from '../Divider';
import type { ButtonComponentProps } from '../types';

export interface RowProps {
  title?: string;
  subTitle?: string;
  disabled?: boolean;
  onPress?: () => void;
  separator?: boolean;
  separatorProps?: DividerProps;
  minHeight?: number;
  backgroundColor?: string;
  containerStyle?: ViewStyle;
  style?: StyleProp<ViewStyle>;
  titleStyle?: TextStyle;
  subTitleStyle?: TextStyle;
  titleColor?: string;
  subTitleColor?: string;
  contentProps?: TouchableOpacityProps;
  titleProps?: TextProps;
  subTitleProps?: TextProps;
  shadow?: boolean;
  renderRight?: () => React.ReactNode;
  rightIcon?: IconPropsType;
}

Row.defaultProps = {
  disabled: false,
  separator: false,
  minHeight: 56,
  shadow: true,
};

function Row(props: RowProps) {
  const {
    title,
    subTitle,
    disabled,
    onPress,
    separator,
    separatorProps,
    minHeight,
    backgroundColor,
    containerStyle,
    style,
    titleColor,
    titleStyle,
    subTitleColor,
    subTitleStyle,
    contentProps,
    titleProps,
    subTitleProps,
    shadow,
    renderRight,
    rightIcon,
  } = props;
  const { theme } = useTheme();
  const ButtonComponent: ButtonComponentProps = (disabled || !onPress) ? View : TouchableOpacity;

  const buttonStyle = useCallback(() => {
    const background = backgroundColor ?? theme.card;
    const borderRadius = containerStyle?.borderRadius || 0;

    const shadowStyle = shadow ? {
      shadowColor: theme.shadowColor,
      shadowOpacity: 0.18,
      shadowRadius: 3,
      shadowOffset: { height: 1, width: 0 },
      elevation: 2,
    } : {};

    return ({
      ...shadowStyle,
      borderRadius,
      minHeight,
      backgroundColor: background,
      opacity: disabled ? 0.6 : 1,
      paddingLeft: Spacing.s4,
      paddingRight: (renderRight || !!rightIcon) ? 0 : Spacing.s4,
    });
  }, [shadow, disabled, backgroundColor, theme, containerStyle, renderRight, rightIcon, minHeight])();

  const styleTitle = useCallback(() => ({
    color: titleColor ?? theme.text.normal,
    ...titleStyle,
  }), [titleStyle, titleColor, theme])();

  const styleSubTitle = useCallback(() => ({
    marginVertical: px(2),
    color: subTitleColor ?? theme.text.subTitle,
    ...subTitleStyle,
  }), [subTitleStyle, subTitleColor, theme])();

  const renderViewRight = React.useMemo(() => {
    return (
      <View style={styles.viewRight}>
        <Icon
          color={theme.icon.normal}
          size={24}
          {...rightIcon}
        />
      </View>
    );
  }, [rightIcon, theme]);

  return (
    <View style={containerStyle}>
      <ButtonComponent
        {...contentProps}
        onPress={onPress}
        style={[styles.container, buttonStyle, style]}
      >
        <View style={styles.viewTitle}>
          <Text {...titleProps} style={[theme.textStyles.h2, styleTitle]}>{title}</Text>
          {
            !!subTitle && <Text {...subTitleProps} style={[theme.textStyles.p2, styleSubTitle]}>{subTitle}</Text>
          }
        </View>
        {
          renderRight ? renderRight() : !!rightIcon ? renderViewRight : null
        }
      </ButtonComponent>
      {
        separator && <Divider left={Spacing.s4} {...separatorProps} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  viewTitle: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: Spacing.s2,
  },
  viewRight: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: Spacing.s2,
  },
});

export default React.memo(Row, equals);
