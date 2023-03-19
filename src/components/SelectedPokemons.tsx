import { StyleSheet, View } from 'react-native'
import React from 'react'
import { IPokemons } from '../redux_store/reducers/types'
import { colors, WIDTH_SCREEN } from '../constants/constants'
import TextCmp, { TextType } from './text.cmp'
import ButtonCmp from './button.cmp'

interface IProps {
    selectedPokemon: IPokemons[];
    setSelectedPokemon: (value: IPokemons[]) => void;
    onPressFight: () => void;
    onPressRandomFight: () => void;
};

const SelectedPokemons: React.FC<IProps> = ({ selectedPokemon, setSelectedPokemon, onPressFight, onPressRandomFight }) => {
    const onPressDelete = (index: number) => {
        const arrayAfterDelete = selectedPokemon.filter((_, i) => i !== index);
        setSelectedPokemon(arrayAfterDelete)
    }

    return (
        <View style={styles.mainContainer}>
            {!!selectedPokemon?.length ?
                <View>
                    <TextCmp type={TextType.medium}>Pokemon Selected</TextCmp>
                </View> : <ButtonCmp title='RANDOM BATTLE' onPress={onPressRandomFight} />
            }

            {selectedPokemon.map((pokemonObj, index) => {
                const key = Math.random() * 100 * index;
                return (
                    <View style={styles.selectedContainer} key={key}>
                        <View style={styles.cardContainer}>
                            <TextCmp type={TextType.normal} style={styles.textStyle}>{pokemonObj.name}</TextCmp>
                        </View>
                        <View style={styles.deleteContainer}>
                            <ButtonCmp title='delete' onPress={() => onPressDelete(index)} />
                        </View>
                    </View>
                )
            })}
            {!!(selectedPokemon?.length === 2) && <ButtonCmp title='Go to fight!' onPress={onPressFight} containerStyle={{ width: WIDTH_SCREEN * 0.8, marginTop: 20 }} />}
        </View>
    )
}

export default SelectedPokemons

const styles = StyleSheet.create({
    mainContainer: {
        marginVertical: 40,
        alignItems: 'center',
    },
    cardContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderRadius: 20,
        flex: 1,
        marginRight: 10,
        backgroundColor: colors.white
    },
    selectedContainer: { flexDirection: 'row', alignItems: 'center', width: WIDTH_SCREEN * 0.7 },
    textStyle: { textAlign: 'center' },
    deleteContainer: { flex: 0.5 }
})