import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { RootStackParamList } from '../routes/routes';
import { TextCmp } from '../components';
import { TextType } from '../components/text.cmp';
import { useAppDispatch, useAppSelector } from '../redux_store/actions/actions';
import { colors, WIDTH_SCREEN } from '../constants/constants';
import SelectedPokemons from '../components/SelectedPokemons';
import TextInputCmp from '../components/textInput.cmp';
import { setPokemons } from '../redux_store/reducers/game';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type TStackPropsList = NativeStackScreenProps<RootStackParamList, 'PokemonsList'>;

const PokemonsListScreen = ({ navigation: { navigate } }: TStackPropsList) => {
    const initialPokemons = useAppSelector((state) => state.game.initialPokemons);

    const dispatch = useAppDispatch();

    const [search, setSearch] = useState<string>('')
    const [selectedPokemon, setSelectedPokemon] = useState<any[]>([]);

    const pokemonList = useMemo(() => initialPokemons.filter((obj) => {
        const { name } = obj;
        if (name.includes(search)) {
            return true;
        }
        return false;
    }), [search]);

    const onSelectPokemon = (item: any) => {
        setSelectedPokemon((prev) => [...prev, item])
        setSearch('');
    };

    const onPressFight = () => {
        setSelectedPokemon([]);
        dispatch(setPokemons(selectedPokemon));
        navigate('PokemonsBattle');
    };

    const onPressRandomFight = () => {
        const firstPokemonIndex = Math.floor(Math.random() * (pokemonList?.length));
        const secondPokemonIndex = Math.floor(Math.random() * (pokemonList?.length));
        const randomPokemons = [pokemonList[firstPokemonIndex], pokemonList[secondPokemonIndex]]
        dispatch(setPokemons(randomPokemons));
        navigate('PokemonsBattle');
    };

    return (
        <View style={styles.mainContainer}>
            <SelectedPokemons {...{ selectedPokemon, setSelectedPokemon, onPressFight, onPressRandomFight }} />
            <View>
                <TextCmp type={TextType.big}>POKEMONS LIST</TextCmp>
                <TextInputCmp
                    state={search}
                    setState={(value) => setSearch(value.toLowerCase())}
                    placeholder='Search for pokemon'
                    isDisabled={!(selectedPokemon?.length > 1)}
                    containerStyle={selectedPokemon?.length > 1 ? { opacity: 0.2 } : undefined} />
            </View>
            <FlatList
                initialNumToRender={10}
                data={pokemonList}
                contentContainerStyle={styles.flatListContainer}
                maxToRenderPerBatch={10}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => onSelectPokemon(item)}
                            disabled={selectedPokemon?.length > 1}
                            style={[styles.pokemonContainer, selectedPokemon?.length > 1 && { opacity: 0.2 }]}>
                            <TextCmp style={styles.pokemonName} type={TextType.medium} numberOfLines={1}>
                                {item.name}
                            </TextCmp>
                            <Image
                                source={{ uri: item.sprites.front_default }}
                                style={{ width: 125, height: 125 }}
                            />
                        </TouchableOpacity>
                    )
                }}
                key={'_'}
                keyExtractor={item => "_" + item.id}
                numColumns={3}
                bounces={false}
                alwaysBounceVertical={false}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default PokemonsListScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center'
    },
    flatListContainer: {
        width: WIDTH_SCREEN,
    },
    pokemonContainer: {
        alignItems: 'center',
        margin: 7,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.mainColorBlack,
        backgroundColor: colors.gray
    },
    pokemonName: { color: colors.white, width: WIDTH_SCREEN / 4, textAlign: 'center' }
})