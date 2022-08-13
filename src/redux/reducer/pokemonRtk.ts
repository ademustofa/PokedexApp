import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define a type for the slice state
interface PokemonStateProps {
  dataPokemon: any[];
  dataTrashPokemon: any[];
}

// Define the initial state using that type
const initialState: PokemonStateProps = {
  dataPokemon: [],
  dataTrashPokemon: [],
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPokemonData: (state: PokemonStateProps, action: any) => {
      console.log('action', action);
      const {payload} = action;
      state.dataPokemon = [...state.dataPokemon, payload.data];
    },
    setDatatrashPokemon: (state: PokemonStateProps, action: any) => {
      const {payload} = action;
      state.dataTrashPokemon = [...state.dataTrashPokemon, payload.data];
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const {setPokemonData, setDatatrashPokemon} = pokemonSlice.actions;

export default pokemonSlice.reducer;
