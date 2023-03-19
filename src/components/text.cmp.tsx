import React, { PropsWithChildren } from 'react';
import { Text, StyleProp, TextStyle, StyleSheet, View } from 'react-native';
import { colors } from '../constants/constants';

export enum TextType {
  small = 'small',
  normal = 'normal',
  medium = 'medium',
  big = 'big',
}

interface ITextProps {
  type: TextType;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
  numberOfLines?: number
}

type TTextProps = PropsWithChildren<ITextProps>;

const TextCmp: React.FC<TTextProps> = ({ type, style, children, numberOfLines }): JSX.Element => {
  if (type === TextType.small) {
    return <Text style={[styles.small, style]} numberOfLines={numberOfLines}>{children}</Text>;
  }
  if (type === TextType.normal) {
    return <Text style={[styles.normal, style]} numberOfLines={numberOfLines}>{children}</Text>;
  }
  if (type === TextType.medium) {
    return <Text style={[styles.medium, style]} numberOfLines={numberOfLines}>{children}</Text>;
  }
  if (type === TextType.big) {
    return <Text style={[styles.big, style]} numberOfLines={numberOfLines}>{children}</Text>;
  }
  return <Text style={style} numberOfLines={numberOfLines}>{children}</Text>;
};

export default TextCmp;

const styles = StyleSheet.create({
  small: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.mainColorBlack
  },
  normal: {
    fontSize: 18,
    lineHeight: 24,
    color: colors.mainColorBlack
  },
  medium: {
    fontSize: 24,
    lineHeight: 35,
    color: colors.mainColorBlack,
    height: 40,
  },
  big: {
    fontSize: 36,
    lineHeight: 40,
    color: colors.mainColorBlack
  },
});
