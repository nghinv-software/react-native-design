/**
 * Created by nghinv on Fri Jun 18 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React, { useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import FastImage, {
  ImageStyle,
  FastImageProps,
  Source,
} from 'react-native-fast-image';
import Badge, {
  BadgeProps,
  BadgeSizes,
  BADGE_SIZES,
} from '@nghinv/react-native-badge';
import equals from 'react-fast-compare';
import type { ButtonComponentProps } from '../types';

export enum StatusModes {
  online = 'online',
  offline = 'offline',
  away = 'away',
  none = 'none',
}

export enum BadgePosition {
  topLeft = 'topLeft',
  topRight = 'topRight',
  bottomLeft = 'bottomLeft',
  bottomRight = 'bottomRight',
}

export type BadgePositionType = keyof typeof BadgePosition;
export type StatusModesType = keyof typeof StatusModes;

export interface AvatarProps {
  size?: number;
  source?: Source | number;
  backgroundColor?: string;
  imageStyle?: StyleProp<ImageStyle>;
  imageProps?: Omit<FastImageProps, 'source'>;
  borderRadius?: number;
  containerStyle?: StyleProp<ViewStyle>;
  containerProps?: TouchableOpacityProps;
  onPress?: () => void;
  label?: string;
  labelColor?: string;
  labelStyle?: TextStyle;
  showBadge?: boolean;
  badgeSize?: BadgeSizes | number;
  badgePosition?: BadgePositionType;
  badgeProps?: BadgeProps;
  status?: StatusModesType;
  disabled?: boolean;
  statusModesColor?: {
    online: string;
    offline: string;
    away: string;
    none?: string;
  };
}

Avatar.defaultProps = {
  size: 50,
  backgroundColor: '#3c3c3c',
  labelColor: 'white',
  showBadge: false,
  badgeSize: BADGE_SIZES.pimpleBig,
  status: StatusModes.none,
  badgePosition: BadgePosition.topRight,
  statusModesColor: {
    online: '#00CD8B',
    offline: '#C2C7CB',
    away: '#FFB600',
  },
};

function getStatusBadgeColor(status: StatusModesType): string | null {
  switch (status) {
    case StatusModes.away:
      return '#FFB600';
    case StatusModes.online:
      return '#00CD8B';
    case StatusModes.offline:
      return '#C2C7CB';
    case StatusModes.none:
    default:
      return null;
  }
}

function Avatar(props: AvatarProps) {
  const {
    size,
    source,
    imageStyle,
    imageProps,
    borderRadius,
    containerStyle,
    containerProps,
    onPress,
    disabled,
    showBadge,
    badgeSize,
    badgePosition,
    badgeProps,
    status,
    statusModesColor,
    backgroundColor,
    label,
    labelColor,
    labelStyle,
  } = props;

  const ButtonComponent: ButtonComponentProps = disabled || !onPress ? View : TouchableOpacity;
  const hasImage = source !== null && source !== undefined;
  const hasLabel = label !== undefined && label !== null;

  const getBadgeStyle: any = useCallback(() => {
    const radius = size! / 2;
    let alpha = Math.PI / 4 + Math.PI / 2;

    if (badgePosition === BadgePosition.bottomRight) {
      alpha = Math.PI / 4;
    } else if (badgePosition === BadgePosition.bottomLeft) {
      alpha = Math.PI / 4 - Math.PI / 2;
    } else if (badgePosition === BadgePosition.topLeft) {
      alpha = Math.PI / 4 + Math.PI;
    } else {
      alpha = Math.PI / 4 + Math.PI / 2;
    }

    return {
      backgroundColor: statusModesColor
        ? statusModesColor[status!]
        : getStatusBadgeColor(status!),
      transform: [
        { translateX: radius * Math.sin(alpha) },
        { translateY: radius * Math.cos(alpha) },
      ],
    };
  }, [size, badgePosition, status, statusModesColor]);

  return (
    <ButtonComponent
      activeOpacity={0.9}
      {...containerProps}
      onPress={onPress}
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: borderRadius ?? size! / 2,
          backgroundColor,
        },
        containerStyle,
      ]}
    >
      {hasLabel && (
        <Text style={[styles.label, { color: labelColor }, labelStyle]}>
          {label}
        </Text>
      )}
      {hasImage && (
        <FastImage
          resizeMode="cover"
          {...imageProps}
          source={source!}
          style={[
            styles.image,
            {
              width: size,
              height: size,
              borderRadius: borderRadius ?? size! / 2,
            },
            imageStyle!,
          ]}
        />
      )}
      {showBadge && (
        <Badge
          size={badgeSize}
          {...badgeProps}
          containerStyle={[styles.badge, getBadgeStyle()]}
        />
      )}
    </ButtonComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
  },
  image: {
    position: 'absolute',
  },
  badge: {
    position: 'absolute',
  },
});

export default React.memo(Avatar, equals);
