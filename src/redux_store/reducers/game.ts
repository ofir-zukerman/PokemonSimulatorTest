import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { GET_ALL_POKEMONS_URL } from '../../constants/constants';
import { IPokemons } from './types';

export interface IPokemon {
    sprites: {
        back_default: string;
        front_default: string;
    };
    id: number;
    name: string;
}

interface IInitialValues {
    pokemons: IPokemon[];
    initialPokemons: IPokemon[];
    isLoading: boolean;
    pokemon1: IPokemon | null;
    pokemon2: IPokemon | null;
};

const initialState: IInitialValues = {
    pokemons: [],
    initialPokemons: [],
    isLoading: true,
    pokemon1: null,
    pokemon2: null,
};

const gameReducer = createSlice({
    name: 'gameReducer',
    initialState,
    reducers: {
        setPokemons: (state, actions: PayloadAction<IPokemon[]>) => {
            const { payload } = actions;
            state.pokemons = payload;
        },
        setIsLoading: (state, actions: PayloadAction<boolean>) => {
            const { payload } = actions;
            state.isLoading = payload;
        },
    },
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

export const { setPokemons } = gameReducer.actions;
export default gameReducer.reducer;

export const fetchPokemonData = createAsyncThunk(
    "game/fetchPokemonData",
    async () => {
        const {
            data: { results: pokemons },
        } = await axios.get<{ results: IPokemons[] }>(GET_ALL_POKEMONS_URL);
        if (pokemons?.length) {
            const requests = pokemons.map(pokemon => axios.get(pokemon.url));
            const results = await Promise.all(requests);
            return results.map((pokemon, index) => {
                return pokemon.data
            })
        };
        return [];
    }
);