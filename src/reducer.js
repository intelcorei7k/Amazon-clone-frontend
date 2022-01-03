export const initialState = {
  basket: [],
  accessToken: null,
  user: null,
};

export const COMMANDS = {
  BASKETADD: 'ADD_TO_BASKET',
  BASKETREMOVE: 'REMOVE_FROM_BASKET',
  SETUSER: 'SET_USER',
  SETTOKEN: 'SET_TOKEN',
  SETBASKET: 'SET_BASKET',
};

const reducer = (state, action) => {
  switch (action.type) {
    case COMMANDS.BASKETADD:
      let j = state.basket.length;
      let i = 0;
      let found = false;
      for (i; i < j; i++) {
        if (state.basket[i].id === action.item.id) {
          found = true;
          break;
        }
      }

      if (found) {
        state.basket[i].quantity += action.quantity;
        return {
          ...state,
          basket: state.basket,
        };
      }

      return {
        ...state,
        basket: [...state.basket, { ...action.item, quantity: 1 }],
      };

    case COMMANDS.BASKETREMOVE:
      let k = state.basket.length;
      let h = 0;
      for (h; h < k; h++) if (state.basket[h].id === action.id) break;

      if (state.basket[h].quantity <= action.quantity)
        return {
          ...state,
          basket: state.basket.filter((item) => item.id !== action.id),
        };

      state.basket[h].quantity -= action.quantity;
      return {
        ...state,
        basket: state.basket,
      };

    case COMMANDS.SETUSER:
      return {
        ...state,
        user: action.item,
      };

    case COMMANDS.SETTOKEN:
      return {
        ...state,
        accessToken: action.item,
      };

    case COMMANDS.SETBASKET:
      return {
        ...state,
        basket: [...action.item],
      };

    default:
      return state;
  }
};

export default reducer;
