import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux_store/actions/actions';
import { fetchPokemonData } from '../redux_store/reducers/game';
import Loader from '../components/loader.cmp';
import { createStackNavigator } from '@react-navigation/stack';
import PokemonsListScreen from '../screens/pokemonsListScreen';
import PokemonsBattleScreen from '../screens/pokemonsBattleScreen';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ModalCmp from '../components/moda.cmp';

type RootStackParamList = {
    PokemonsList: undefined;
    PokemonsBattle: undefined;
    ModalScreen: {
        win: boolean;
        title: string;
        pokemon: any;
    };
};

export type TStackProps = NativeStackScreenProps<RootStackParamList, 'PokemonsList', 'PokemonsBattle'>;

const Stack = createStackNavigator<RootStackParamList>();


const routes = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.game.isLoading);

    useEffect(() => {
        dispatch(fetchPokemonData())
    }, []);

    if (isLoading) {
        return <Loader />;
    };

    return (
        <Stack.Navigator>
            <Stack.Screen name="PokemonsList" component={PokemonsListScreen} options={{ headerTitle: 'Pokemons List' }} />
            <Stack.Screen
                name="PokemonsBattle"
                component={PokemonsBattleScreen}
                options={{ headerTitle: 'BATTLE !' }}
            />
            <Stack.Screen
                name="ModalScreen"
                component={ModalCmp}
                options={{ headerShown: false, presentation: 'modal' }}
            />
        </Stack.Navigator>
    )

}

export default routes

const styles = StyleSheet.create({})