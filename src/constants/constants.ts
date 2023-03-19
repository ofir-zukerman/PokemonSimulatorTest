import { Dimensions } from 'react-native';

// colors
export const colors = {
    red: '#e32f45',
    white: '#fff',
    black: '#000',
    gray: '#748c94',
    mainColorBlack: '#2C5364',
} satisfies Record<string, string>;


// shadow
export const SHADOW = {
    shadowOffset: {
        width: 0,
        height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 7.0,
    shadowColor: colors.black,
    elevation: 24,
};

//url
export const GET_ALL_POKEMONS_URL = 'https://pokeapi.co/api/v2/pokemon';

// screen
export const WIDTH_SCREEN: number = Dimensions.get('window').width;
export const HEIGHT_SCREEN: number = Dimensions.get('window').height;