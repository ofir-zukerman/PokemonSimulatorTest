import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import PokemonsListScreen from '../screens/pokemonsListScreen';
import PokemonsBattleScreen from '../screens/pokemonsBattleScreen';

type RootStackParamList = {
    PokemonsList: undefined,
    PokemonsBattle: undefined,
};

export type TStackProps = NativeStackScreenProps<RootStackParamList, 'PokemonsBattle', 'PokemonsList'>;

const Stack = createStackNavigator<RootStackParamList>();

const Routes = () => {
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