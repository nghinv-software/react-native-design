/**
 * Created by nghinv on Tue Jul 13 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import type { BadgeProps } from '@nghinv/react-native-badge';
import type { AvatarProps } from './components/Avatar';
import type { ButtonProps } from './components/Button/Button';
import type { ButtonIconProps } from './components/Button/ButtonIcon';
import type { ButtonTextProps } from './components/Button/ButtonText';
import type { CardProps } from './components/Card';
import type { ContainerProps } from './components/Container';
import type { DividerProps } from './components/Divider';
import type { EnvironmentBannerProps } from './components/EnvironmentBanner';
import type { RowProps } from './components/Row/Row';
import type { SizeBoxProps } from './components/SizeBox';
import type { SpaceProps } from './components/Space';
import type { TextPropsType } from './components/Text';
import type { ServiceProviderWithThemeType } from './ServiceProviderWithTheme';

module.exports = {
  get Avatar(): AvatarProps {
    return require('./components/Avatar');
  },
  get Badge(): BadgeProps {
    return require('@nghinv/react-native-badge').default;
  },
  get Button(): ButtonProps {
    return require('./components/Button/Button');
  },
  get ButtonIcon(): ButtonIconProps {
    return require('./components/Button/ButtonIcon');
  },
  get ButtonText(): ButtonTextProps {
    return require('./components/Button/ButtonText');
  },
  get Card(): CardProps {
    return require('./components/Card');
  },
  get Container(): ContainerProps {
    return require('./components/Container');
  },
  get Divider(): DividerProps {
    return require('./components/Divider');
  },
  get EnvironmentBanner(): EnvironmentBannerProps {
    return require('./components/EnvironmentBanner');
  },
  get Row(): RowProps {
    return require('./components/Row/Row');
  },
  get SizeBox(): SizeBoxProps {
    return require('./components/SizeBox');
  },
  get ServiceProviderWithTheme(): ServiceProviderWithThemeType {
    return require('./ServiceProviderWithTheme');
  },
  get SearchBar() {
    return require('@nghinv/react-native-search-bar').default;
  },
  get Space(): SpaceProps {
    return require('./components/Space');
  },
  get Switch() {
    return require('@nghinv/react-native-switch').default;
  },
  get Text(): TextPropsType {
    return require('./components/Text');
  },
};
