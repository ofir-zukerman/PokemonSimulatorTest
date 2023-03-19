import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import PokemonsListScreen from '../screens/pokemonsListScreen';
import PokemonsBattleScreen from '../screens/pokemonsBattleScreen';
import { useAppDispatch, useAppSelector } from '../redux_store/actions/actions';
import { fetchPokemonData } from '../redux_store/reducers/game';
import { Loader } from '../components';

type RootStackParamList = {
    PokemonsList: undefined,
    PokemonsBattle: undefined,
};

export type TStackProps = NativeStackScreenProps<RootStackParamList, 'PokemonsBattle', 'PokemonsList'>;

const Stack = createStackNavigator<RootStackParamList>();

const Routes = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.game.isLoading);

    useEffect(() => {
        dispatch(fetchPokemonData());
    }, []);

    if (isLoading) {
        return <Loader />;
    };

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="PokemonsList"
                component={PokemonsListScreen}
                options={{ headerTitle: 'Pokemons List' }}
            />
            <Stack.Screen
                name="PokemonsBattle"
                component={PokemonsBattleScreen}
                options={{ headerTitle: 'BATTLE !' }}
            />
        </Stack.Navigator>
    )

}

export default Routes

const styles = StyleSheet.create({})