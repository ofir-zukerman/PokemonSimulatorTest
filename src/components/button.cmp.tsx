import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors, SHADOW } from '../constants/constants';
import TextCmp, { TextType } from './text.cmp';

interface IButton {
    title: string;
    onPress: () => void;
    containerStyle?: StyleProp<TextStyle>;
    isDisabled?: boolean;
}

const ButtonCmp: React.FC<IButton> = ({ title, onPress, containerStyle, isDisabled }): JSX.Element => {
    return (
        <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress} disabled={isDisabled}>
            <TextCmp type={TextType.normal} style={styles.text}>
                {title}
            </TextCmp>
        </TouchableOpacity>
    );
};

export default ButtonCmp;

const styles = StyleSheet.create({
    container: {
        ...SHADOW,
        alignItems: 'center',
        backgroundColor: colors.mainColorBlack,
        borderColor: colors.white,
        borderWidth: 1,
        padding: 15,
        borderRadius: 20,
    },
    text: {
        color: colors.white,
    },
});
