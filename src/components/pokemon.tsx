import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import TextCmp, { TextType } from './text.cmp';
import ButtonCmp from './button.cmp';

interface IProps {
    name: string;
    imageUri: string;
    hp: number;
    secondPokemonHP: number;
    onAttack: (value: number, winOrLose: boolean) => void;
    index: number;
    disabledAttack: boolean;
    dmgAttack: number;
}

const Pokemon: React.FC<IProps> = ({ name, imageUri, hp, onAttack, index, disabledAttack, secondPokemonHP, dmgAttack }) => {
    const isWinOrLose = !hp || !secondPokemonHP;

    return (
        <View>
            <View>
                <TextCmp style={{ textAlign: 'center' }} type={TextType.big} >{name}</TextCmp>
                <Image source={{ uri: imageUri }} style={{ width: 250, height: 200 }} />
            </View>
            <View>
                <TextCmp style={{ textAlign: 'center' }} type={TextType.normal} >HP: {hp}</TextCmp>
                <ButtonCmp title='Attack !' onPress={() => onAttack(index, isWinOrLose)} containerStyle={[styles.buttonContainer, (!disabledAttack || isWinOrLose) && { opacity: 0.3 }]} isDisabled={isWinOrLose || !disabledAttack} />
                <TextCmp style={{ textAlign: 'center' }} type={TextType.normal}>{index === 0 ? `Your hit for ${dmgAttack}` : `Your opponent hit for ${dmgAttack}`}</TextCmp>
            </View>
        </View>
    )
}

export default Pokemon

const styles = StyleSheet.create({
    buttonContainer: { marginTop: 20 }
})