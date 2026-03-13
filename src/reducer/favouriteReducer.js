export const favouriteReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_FAV":
      const exists = state.find((item) => item.id === action.payload.id);

      if (exists) {
        return state.filter((item) => item.id !== action.payload.id);
      }

      return [...state, action.payload];

    default:
      return state;
  }
};