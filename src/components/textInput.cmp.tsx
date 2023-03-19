import { StyleSheet, Text, TextInput, TextStyle, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/constants'

interface IProps {
    state: string;
    setState: (value: string) => void;
    placeholder?: string;
    containerStyle?: TextStyle;
    isDisabled?: boolean;
}

const TextInputCmp: React.FC<IProps> = ({ setState, state, placeholder, containerStyle, isDisabled }) => {
    return (
        <View style={[styles.textInputContainer, containerStyle]}>
            <TextInput placeholderTextColor={colors.mainColorBlack} onChangeText={setState} placeholder={placeholder} value={state} editable={isDisabled} />
        </View>
    )
}

export default TextInputCmp

const styles = StyleSheet.create({
    textInputContainer: {
        padding: 10,
        borderRadius: 20,
        borderWidth: 2,
        marginVertical: 20,
        borderColor: colors.mainColorBlack,
        backgroundColor: colors.white,
    },
})