import { AuthService } from "../../services/auth";
import { actGetMeAsync, ACT_GET_ME } from "../user/actions";

export const ACT_LOGIN = "ACT_LOGIN";
export const ACT_SET_TOKEN = "ACT_SET_TOKEN";
export const ACT_LOGOUT = "ACT_LOGOUT";

export function actLogoutAsync() {
  return {
    type: ACT_LOGOUT,
  };
}
export function actLogin(value) {
  return {
    type: ACT_LOGIN,
    payload: {
      isLogin: value,
    },
  };
}

export function actSetToken(token) {
  return {
    type: ACT_SET_TOKEN,
    payload: {
      token,
    },
  };
}

export function actLogout() {
  return async (dispatch) => {
    try {
      const response = await AuthService.logout();
      console.log("🚀 ~ file: actions.js:35 ~ return ~ response", response)
      localStorage.removeItem("access_login");
      dispatch({
        type: ACT_GET_ME,
        payload: null,
      });
      // dispatch(actLogoutAsync());
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
      };
    }
  };
}


export function actLoginAsync({ username, password }) {
  return async (dispatch) => {
    try {
      const response = await AuthService.login({
        username,
        password,
      });
      const data = response.data;
      console.log("🚀 ~ file: actions.js:62 ~ return ~ data", data)
      const id = data.id;
      // const token = data.token;
      // localStorage.setItem("access_token", token);
      // dispatch(actSetToken(token));
      dispatch(actGetMeAsync({ id }));

      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
      };
    }
  };
}

export function actRegisterAsync({ email, phone, usernameRe, name, passwordRe }) {
 return async (dispatch) => {
    try {
      const response = await AuthService.register({
        email,
        phone,
        usernameRe,
        name,
        passwordRe,
      });
      const data = response.data;
      console.log("🚀 ~ file: actions.js:86 ~ return ~ data", data)
      // const token = data.token;

      // localStorage.setItem("access_token", token);

      // dispatch(actSetToken(token));
      // dispatch(actGetMeAsync());

      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
      };
    }
  };
}
