import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux_store/actions/actions';
import { setPokemons } from '../redux_store/reducers/game';
import { RootStackParamList } from '../routes/routes';
import ButtonCmp from './button.cmp';
import TextCmp, { TextType } from './text.cmp';

type TStackPropsModal = NativeStackScreenProps<RootStackParamList, 'ModalScreen'>;

const ModalCmp = ({ navigation: { navigate }, route }: TStackPropsModal) => {
    const { win, title, pokemon } = route.params;

    const dispatch = useAppDispatch();
    const initialPokemons = useAppSelector((state) => state.game.initialPokemons);

    return (
        <View style={styles.modal}>
            <TextCmp type={TextType.big}>{title}</TextCmp>
            {win && <ButtonCmp onPress={() => {
                const secondPokemonIndex = Math.floor(Math.random() * (initialPokemons?.length));
                const randomPokemons = [pokemon, initialPokemons[secondPokemonIndex]]
                dispatch(setPokemons(randomPokemons));
                navigate('PokemonsBattle');
            }
            } title='Continue with the same Pokémon' />}
            <ButtonCmp onPress={() => navigate('PokemonsList')} title={win ? 'Receive a new Pokémon' : 'Go Back'} />
        </View>
    );
}

export default ModalCmp;

const styles = StyleSheet.create({
    modal: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
});