import { api } from ".";

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
  putUniversity({ name, email, mailtype }) {
    return api
      .callWithAuth()
      .put("/university/add/", { name, email, mailtype });
  },
  putMajor({ name }) {
    return api.callWithAuth().put("/major/add/", { name });
  },
  getAllMajor() {
    return api.callWithAuth().get("/major/");
  },
  changePassword({ oldPassword, newPassword }) {
    return api.callWithAuth().put("profile/changepassword/", {
      oldPassword,
      newPassword,
    });
  },
};
