import { api } from '.';

export const UserService = {
  getMeInfo({ id }) {
    return api.callWithAuth().post("/account/info/", { id });
  },
  getAllUser() {
    return api.callWithAuth().get("/account/");
  },
  getAllUniversity() {
    return api.callWithAuth().get("/university/");
  },
  getAllMajor() {
    return api.callWithAuth().get("/major/");
  },
  changePassword({ password, new_password, confirm_new_password }) {
    return api.callWithAuth().put("/wp/v2/users/password", {
      password,
      new_password,
      confirm_new_password,
    });
  },
};