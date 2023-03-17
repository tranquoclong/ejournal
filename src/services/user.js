import { api } from ".";

export const UserService = {
  getMeInfo({ id }) {
    return api.callWithAuth().post("/account/info/", { id });
  },
  getAllUser() {
    return api.callWithAuth().get("/account/");
  },
  getAllRole() {
    return api.callWithAuth().get("/admin/role/");
  },
  getAllReview() {
    return api.callWithAuth().get("/review/pending/");
  },
  getAllUniversity() {
    return api.callWithAuth().get("/university/");
  },
  getListreviewers() {
    return api.callWithAuth().get("/review/listreviewers/");
  },
  putUniversity({ name, email, mailtype }) {
    return api
      .callWithAuth()
      .put("/university/add/", { name, email, mailtype });
  },
  postUpdateAccount(id, roleId) {
    return api.callWithAuth().put("/account/update/", { id, roleid: roleId });
  },

  activeUniversity({ id }) {
    return api.callWithAuth().put("/university/active/", { id });
  },
  activeMajor({ id }) {
    return api.callWithAuth().put("/major/active/", { id });
  },
  deactiveUniversity({ id }) {
    return api.callWithAuth().put("/university/deactive/", { id });
  },
  deactiveMajor({ id }) {
    return api.callWithAuth().put("/major/deactive/", { id });
  },
  putMajor({ name }) {
    return api.callWithAuth().put("/major/add/", { name });
  },
  getAllMajor() {
    return api.callWithAuth().get("/major/");
  },
  updateUniversity({ name, email, mailtype }) {
    return api
      .callWithAuth()
      .put("/university/update/", { name, email, mailtype });
  },
  updateMajor({ name }) {
    return api.callWithAuth().put("/major/update/", { name });
  },
  changePassword({ oldPassword, newPassword }) {
    return api.callWithAuth().put("/profile/changepassword/", {
      oldPassword,
      newPassword,
    });
  },
  changeProfile(formData) {
    return api.callWithAuth().put("/profile/update/", formData);
  },
  submitReview(formData, articleid) {
    return api.callWithAuth().put("/review/submit/", {
      articleid,
      content: formData.content,
      suggest: formData.suggest,
    });
  },
  profile() {
    return api.callWithAuth().get("/profile/");
  },
  activeUser({ id }) {
    return api.callWithAuth().put("/account/active/", { id });
  },
  deactiveUser({ id }) {
    return api.callWithAuth().put("/account/deactive/", { id });
  },
  detailUser({ id }) {
    return api.callWithAuth().post("/account/info/", { id });
  },
};
