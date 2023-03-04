import { CLOSE_MODAL, OPEN_MODAL } from "./actions";

const initAuthState = {
  isOpen: false,
  content: null,
};

export default function reducer(state = initAuthState, action) {
  const { type, payload } = action;
  switch (type) {
    case OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
        content: payload,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
}
