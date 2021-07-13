/**
 * Created by nghinv on Fri Jun 11 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { ServicesProvider } from '@nghinv/react-native-services';
import equals from 'react-fast-compare';
import { useTheme } from '@nghinv/react-native-theme';
import type { ActionSheetViewProps } from '@nghinv/react-native-action-sheet';
import type { BottomSheetViewProps } from '@nghinv/react-native-bottom-sheet';
import type { AlertViewProps } from '@nghinv/react-native-alert';

export interface ServiceProviderWithThemeType {
  children: React.ReactChild;
  actionSheetProps?: ActionSheetViewProps;
  bottomSheetProps?: BottomSheetViewProps;
  alertProps?: AlertViewProps;
}

const overlayOpacity = 0.45;

function ServiceProviderWithTheme(props: ServiceProviderWithThemeType) {
  const {
    children,
    actionSheetProps,
    bottomSheetProps,
    alertProps,
  } = props;
  const { theme } = useTheme();

  return (
    <ServicesProvider
      alertProps={{
        overlayProps: { overlayOpacity },
        titleProps: { color: theme.alert.textActive },
        messageProps: { color: theme.alert.textNormal },
        buttonProps: { titleColor: theme.alert.textActive },
        separatorColor: theme.alert.separator,
        backgroundColor: theme.alert.backgroundColor,
        ...alertProps,
      }}
      actionSheetProps={{
        overlayProps: { overlayOpacity },
        headerProps: {
          titleColor: theme.actionSheet.titleColor,
          messageColor: theme.actionSheet.messageColor,
        },
        buttonProps: {
          titleColor: theme.actionSheet.buttonTitleColor,
          iconCheckColor: theme.actionSheet.checkColor,
          iconCheckStyle: {
            position: 'absolute',
            right: 8,
          },
        },
        bottomButtonProps: {
          titleColor: theme.actionSheet.bottomTitleColor,
        },
        separatorColor: theme.actionSheet.separator,
        backgroundColor: theme.actionSheet.backgroundColor,
        ...actionSheetProps,
      }}
      bottomSheetProps={{
        overlayProps: { overlayOpacity },
        backgroundColor: theme.bottomSheet.backgroundColor,
        separatorColor: theme.bottomSheet.separator,
        headerProps: {
          titleColor: theme.bottomSheet.titleColor,
          rightTitleColor: theme.bottomSheet.titleColorActive,
          closeIconProps: {
            color: theme.bottomSheet.iconColor,
          },
        },
        optionProps: {
          titleColor: theme.bottomSheet.buttonTitleColor,
          iconCheckColor: theme.bottomSheet.checkColor,
        },
        ...bottomSheetProps,
      }}
    >
      {children}
    </ServicesProvider>
  );
}

export default React.memo(ServiceProviderWithTheme, equals);
