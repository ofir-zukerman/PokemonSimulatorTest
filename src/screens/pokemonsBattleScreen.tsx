import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootStackParamList } from '../routes/routes';
import { useAppSelector } from '../redux_store/actions/actions';
import Pokemon from '../components/pokemon';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type TStackPropsBattle = NativeStackScreenProps<RootStackParamList, 'PokemonsBattle'>;

const PokemonsBattleScreen = ({ navigation: { navigate } }: TStackPropsBattle) => {
    const pokemons = useAppSelector((state) => state.game.pokemons);

    const [pokemonHP, setPokemonHP] = useState({
        firstPokemon: 100,
        secondPokemon: 100
    })

    const [isPokemonAttack, setIsPokemonAttack] = useState({
        firstPokemon: true,
        secondPokemon: false
    });

    const [dmgAttack, setDmgAttack] = useState({
        firstPokemon: 0,
        secondPokemon: 0
    });


    const onAttack = (index: number, isWinOrLose: boolean) => {
        const dmgAttack = Math.floor(Math.random() * 6) + 1
        const isAnotherRound = dmgAttack === 6;

        if (index === 0) {
            setDmgAttack((prev) => ({
                ...prev,
                firstPokemon: dmgAttack
            }));
            setPokemonHP((prev) => ({
                ...prev,
                secondPokemon: prev.secondPokemon - dmgAttack > 0 ? prev.secondPokemon - dmgAttack : 0
            }));

        } else {
            setDmgAttack((prev) => ({
                ...prev,
                secondPokemon: dmgAttack
            }));
            setPokemonHP((prev) => ({
                ...prev,
                firstPokemon: prev.firstPokemon - dmgAttack > 0 ? prev.firstPokemon - dmgAttack : 0
            }));

        };
        !isAnotherRound && setIsPokemonAttack((prev) => ({
            firstPokemon: !prev.firstPokemon,
            secondPokemon: !prev.secondPokemon
        }));
    };

    useEffect(() => {
        if (pokemonHP.firstPokemon === 0) {
            setPokemonHP({
                firstPokemon: 10,
                secondPokemon: 10
            });
            setIsPokemonAttack({
                firstPokemon: true,
                secondPokemon: false
            })
            setDmgAttack({
                firstPokemon: 0,
                secondPokemon: 0
            })
            // opponent won
            return navigate('ModalScreen', { title: 'Game Over !', win: false, pokemon: null });
        };
        if (pokemonHP.secondPokemon === 0) {
            setPokemonHP({
                firstPokemon: 10,
                secondPokemon: 10
            });
            setIsPokemonAttack({
                firstPokemon: true,
                secondPokemon: false
            })
            setDmgAttack({
                firstPokemon: 0,
                secondPokemon: 0
            })
            // user won
            return navigate('ModalScreen', { title: 'You win !', win: true, pokemon: pokemons[0] });
        };
    }, [pokemonHP.firstPokemon, pokemonHP.secondPokemon]);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: 'flex-end', flex: 1, justifyContent: 'space-around' }}>
                <Pokemon
                    name={pokemons[0].name}
                    imageUri={pokemons[0].sprites.front_default}
                    hp={pokemonHP.firstPokemon}
                    secondPokemonHP={pokemonHP.secondPokemon}
                    onAttack={onAttack}
                    index={0}
                    disabledAttack={isPokemonAttack.firstPokemon}
                    dmgAttack={dmgAttack.firstPokemon}
                />
            </View>
            <View style={{ alignItems: 'flex-start', flex: 1 }}>
                <Pokemon
                    name={pokemons[1].name}
                    imageUri={pokemons[1].sprites.back_default}
                    hp={pokemonHP.secondPokemon}
                    secondPokemonHP={pokemonHP.firstPokemon}
                    onAttack={onAttack}
                    index={1}
                    disabledAttack={isPokemonAttack.secondPokemon}
                    dmgAttack={dmgAttack.secondPokemon}
                />
            </View>
        </View>
    )
}

export default PokemonsBattleScreen;

const styles = StyleSheet.create({})