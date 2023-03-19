import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { GET_ALL_POKEMONS_URL } from '../../constants/constants';
import { IPokemons } from './types';

interface IInitialValues {
    isLoading: boolean;
    initialPokemons: any[];
}

const initialState: IInitialValues = {
    isLoading: false,
    initialPokemons: []
};

const gameReducer = createSlice({
    name: 'gameReducer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemonData.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchPokemonData.fulfilled, (state, action) => {
                state.initialPokemons = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchPokemonData.rejected, (state, action) => {
                state.isLoading = false;
            });
    }
});

export const { } = gameReducer.actions;
export default gameReducer.reducer;


// fetching pokemons data
export const fetchPokemonData = createAsyncThunk(
    "game/fetchPokemonData",
    async () => {
        const {
            data: { results: pokemons },
        } = await axios.get<{ results: IPokemons[] }>(GET_ALL_POKEMONS_URL);
        if (pokemons?.length) {
            const requests = pokemons.map(pokemon => axios.get(pokemon.url));
            const results = await Promise.all(requests);
            const pokemonsData = results.map((pokemon) => {
                const pokemonData = {
                    ...pokemon.data,
                }
                return pokemonData
            })
            return pokemonsData;
        }
        return [];
    }
);