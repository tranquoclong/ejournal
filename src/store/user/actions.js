import { UserService } from "../../services/user";
import { actFetchManus } from "../post/actions";
// import { actSetToken } from "../auth/actions";

export const ACT_GET_ME = "ACT_GET_ME";
export const ACT_GET_ROLE = "ACT_GET_ROLE";
export const ACT_ALL_USER = "ACT_ALL_USER";
export const ACT_ALL_UNIVERSITY = "ACT_ALL_UNIVERSITY";
export const ACT_ALL_LIST_REVIEWERS = "ACT_ALL_LIST_REVIEWERS";
export const ACT_ALL_MAJOR = "ACT_ALL_MAJOR";
export const ACT_CHANGE_PASSWORD = "ACT_CHANGE_PASSWORD";
export const ACT_GET_REVIEW = "ACT_GET_REVIEW";
export const ACT_DETAIL_USER = "ACT_DETAIL_USER";
export function actGetMe(currentUser) {
  return {
    type: ACT_GET_ME,
    payload: {
      currentUser,
    },
  };
}
export function actGetRole(role) {
  return {
    type: ACT_GET_ROLE,
    payload: { role },
  };
}
export function actGetAllReview(allReview) {
  return {
    type: ACT_GET_REVIEW,
    payload: { allReview },
  };
}
export function actAllUser(allUser) {
  return {
    type: ACT_ALL_USER,
    payload: {
      allUser,
    },
  };
}

export function actAllUniversity(allUniversity) {
  return {
    type: ACT_ALL_UNIVERSITY,
    payload: {
      allUniversity,
    },
  };
}
export function actListreviewers(listreviewers) {
  return {
    type: ACT_ALL_LIST_REVIEWERS,
    payload: {
      listreviewers,
    },
  };
}


export function actAllMajor(allMajor) {
  return {
    type: ACT_ALL_MAJOR,
    payload: {
      allMajor,
    },
  };
}

export function actDetailUser(detailUser) {
  return {
    type: ACT_DETAIL_USER,
    payload: {
      detailUser,
    },
  };
}

export function actChangePassword({
  password,
  new_password,
  confirm_new_password,
}) {
  return {
    type: ACT_CHANGE_PASSWORD,
    payload: {
      password,
      new_password,
      confirm_new_password,
    },
  };
}

export function actGetMeAsync({ id }) {
  return async (dispatch) => {
    try {
      const response = await UserService.getMeInfo({ id });
      localStorage.setItem("access_login", JSON.stringify(response.data[0]));
      dispatch(actGetMe(response.data[0]));
    } catch (e) {
      // dispatch(actSetToken(""));
      localStorage.removeItem("access_login", "");
    }
  };
}

export function actPutUniversityAsync({ name, email, mailtype }, allUniversity) {
  return async (dispatch) => {
    try {
      const response = await UserService.putUniversity({
        name,
        email,
        mailtype,
      });
      dispatch(actAllUniversity([...response.data, ...allUniversity]));
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

export function actGetAllAsync() {
  return async (dispatch) => {
    try {
      const response = await UserService.getAllRole();
      dispatch(actGetRole(response.data.list));
    } catch (e) {
      console.log(e);
    }
  };
}

export function actGetAllReviewAsync() {
  return async (dispatch) => {
    try {
      const response = await UserService.getAllReview();
      dispatch(actGetAllReview(response.data.list));
    } catch (e) {
      console.log(e);
    }
  };
}

export function actGetAllRoleAsync() {
  return async (dispatch) => {
    try {
      const response = await UserService.getAllUser();
      dispatch(actAllUser(response.data.list));
    } catch (e) {
      console.log(e);
    }
  };
}
export function actGetAllUniversity() {
  return async (dispatch) => {
    try {
      const response = await UserService.getAllUniversity();
      dispatch(actAllUniversity(response.data.list));
    } catch (e) {
      console.log(e);
    }
  };
}
export function actGetListreviewers() {
  return async (dispatch) => {
    try {
      const response = await UserService.getListreviewers();
      dispatch(actListreviewers(response.data.list));
    } catch (e) {
      console.log(e);
    }
  };
}

export function actGetAllMajor() {
  return async (dispatch) => {
    try {
      const response = await UserService.getAllMajor();
      dispatch(actAllMajor(response.data.list));
    } catch (e) {
      console.log(e);
    }
  };
}

export function actPutMajorAsync({ name }, allMajor) {
  return async (dispatch) => {
    try {
      const response = await UserService.putMajor({
        name,
      });
      dispatch(actAllMajor([...response.data, ...allMajor]));
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

export function actActiveUniversityAsync(id, allUniversity) {
  return async (dispatch) => {
    try {
      await UserService.activeUniversity({
        id,
      });
       let indexUpdate = "";
       indexUpdate = allUniversity.findIndex(
         (u) => u.id === id
       );
      allUniversity[indexUpdate] = {
        ...allUniversity[indexUpdate],
        status: "ACTIVE",
      };
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

export function actActiveMajorAsync(id, allMajor) {
  return async (dispatch) => {
    try {
      await UserService.activeMajor({
        id,
      });
      let indexUpdate = "";
      indexUpdate = allMajor.findIndex((u) => u.id === id);
      allMajor[indexUpdate] = {
       ...allMajor[indexUpdate],
       status: "ACTIVE",
     };
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

export function actDeActiveUniversityAsync(id, allUniversity) {
  return async (dispatch) => {
    try {
      await UserService.deactiveUniversity({
        id,
      });
       let indexUpdate = "";
       indexUpdate = allUniversity.findIndex((u) => u.id === id);
       allUniversity[indexUpdate] = {
         ...allUniversity[indexUpdate],
         status: "DEACTIVE",
       };
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

export function actDeActiveMajorAsync(id, allMajor) {
  return async (dispatch) => {
    try {
      await UserService.deactiveMajor({
        id,
      });
      let indexUpdate = "";
      indexUpdate = allMajor.findIndex((u) => u.id === id);
      allMajor[indexUpdate] = {
        ...allMajor[indexUpdate],
        status: "DEACTIVE",
      };
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

export function actUpdateUniversityAsync(
  { id , name, email, mailtype },
  allUniversity
) {
  return async (dispatch) => {
    try {
      await UserService.updateUniversity({
        id,
        name,
        email,
        mailtype,
      });
     let indexUpdate = "";
     indexUpdate = allUniversity.findIndex((u) => u.id === id);
     allUniversity[indexUpdate] = {
       ...allUniversity[indexUpdate],
       name,
       email,
       mailtype,
     };
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

export function actUpdateMajorAsync({ id, name }, allMajor) {
  return async (dispatch) => {
    try {
      await UserService.updateMajor({
        name,
      });
      let indexUpdate = "";
      indexUpdate = allMajor.findIndex((u) => u.id === id);
      allMajor[indexUpdate] = {
        ...allMajor[indexUpdate],
        name,
      };
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

export function actChangePasswordAsync({ oldPassword, newPassword }) {
  return async (dispatch) => {
    try {
      const response = await UserService.changePassword({
        oldPassword,
        newPassword,
      });
      console.log("response", response);
      return {
        ok: true,
      };
    } catch (err) {
      const errRes = err.response;
      const mapError = {
        default: "Có lỗi xảy ra, vui lòng thử lại sau!",
        rest_user_invalid_password: "Mật khẩu cũ không đúng",
        rest_user_invalid_new_password:
          "Mật khẩu mới không được trùng với mật khẩu cũ",
      };

      if (errRes.data && errRes.data.code && mapError[errRes.data.code]) {
        return {
          ok: false,
          message: mapError[errRes.data.code],
        };
      }

      return {
        ok: false,
        message: mapError.default,
      };
    }
  };
}
export function actChangeProfileAsync(formData,id) {
  return async (dispatch) => {
    try {
      await UserService.changeProfile(formData);
      // dispatch(actGetMeAsync({ id }));
      return {
        ok: true,
      };
    } catch (err) {
      return {
        ok: false,
      };
    }
  };
}

export function actSubmitReviewAsync(formData, articleid) {
  return async (dispatch) => {
    try {
      await UserService.submitReview(formData, articleid);
      // dispatch(actGetMeAsync({ id }));
      return {
        ok: true,
      };
    } catch (err) {
      return {
        ok: false,
      };
    }
  };
}



export function actActiveAccountAsync(id, allUser) {
  return async (dispatch) => {
    try {
      await UserService.activeUser({
        id,
      });
      let indexUpdate = "";
      indexUpdate = allUser.findIndex((u) => u.id === id);
      allUser[indexUpdate] = {
        ...allUser[indexUpdate],
        status: "ACTIVE",
      };
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

export function actDeActiveAccountAsync(id, allUser) {
  return async (dispatch) => {
    try {
      await UserService.deactiveUser({
        id,
      });
      let indexUpdate = "";
      indexUpdate = allUser.findIndex((u) => u.id === id);
      allUser[indexUpdate] = {
        ...allUser[indexUpdate],
        status: "INACTIVE",
      };
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
export function actGetAccountAsync(id) {
  return async (dispatch) => {
    try {
      const response = await UserService.detailUser({id});
      dispatch(actDetailUser(response.data));
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

export function actUpdateAccountAsync(id, roleId) {
  return async (dispatch) => {
    try {
      await UserService.postUpdateAccount(id, roleId);
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

export function actAssignReviewAsync(id, roleId, manuscript) {
  return async (dispatch) => {
    try {
      await UserService.postAssignReview(id, roleId);
      const response = manuscript.filter((m) => m.id !== id);
      dispatch(actFetchManus(response));
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