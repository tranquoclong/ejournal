import {
  ACT_ALL_USER,
  ACT_ALL_UNIVERSITY,
  ACT_ALL_LIST_REVIEWERS,
  ACT_ALL_MAJOR,
  ACT_GET_ROLE,
  ACT_DETAIL_USER,
  ACT_GET_REVIEW,
} from "./actions";
const initUserState = {
  allUser: null,
  detailUser: null,
  role: null,
  allUniversity: null,
  allMajor: null,
  listreviewers: null,
  allReview:null,
};

export default function reducer(state = initUserState, action) {
  switch (action.type) {
    case ACT_ALL_USER:
      return {
        ...state,
        allUser: action.payload.allUser,
      };
    case ACT_ALL_LIST_REVIEWERS:
      return {
        ...state,
        listreviewers: action.payload.listreviewers,
      };
    case ACT_GET_REVIEW:
      return {
        ...state,
        allReview: action.payload.allReview,
      };
    case ACT_DETAIL_USER:
      return {
        ...state,
        detailUser: action.payload.detailUser,
      };
    case ACT_GET_ROLE:
      return {
        ...state,
        role: action.payload.role,
      };
    case ACT_ALL_UNIVERSITY:
      return {
        ...state,
        allUniversity: action.payload.allUniversity,
      };
    case ACT_ALL_MAJOR:
      return {
        ...state,
        allMajor: action.payload.allMajor,
      };
    default:
      return state;
  }
}
