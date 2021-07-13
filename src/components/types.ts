/**
 * Created by nghinv on Sat Jun 19 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import type React from 'react';
import type { TouchableOpacity, View } from 'react-native';

export type ButtonComponentProps = React.ElementType & (typeof TouchableOpacity | typeof View);
