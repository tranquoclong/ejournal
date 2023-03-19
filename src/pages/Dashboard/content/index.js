import React, { useState } from "react";
import {
  GlobalOutlined,
  LineChartOutlined,
  TeamOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  actActiveAccountAsync,
  actGetAllAsync,
  actGetAllRoleAsync,
  actDeActiveAccountAsync,
  actGetAccountAsync,
} from "../../../store/user/actions";
import PaginationRe from "../../../common/Paging";
import { NotificationManager } from 'react-notifications';
import { OPEN_MODAL } from "../../../store/modal/actions";
import UpdateRoleModal from "../../../components/Modal/updateRoleModal";
function ContentDashboard() {
  const dispatch = useDispatch();
  const { allUser, role, detailUser } = useSelector((state) => state.User);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    () => {
      dispatch(actGetAllAsync());
      dispatch(actGetAllRoleAsync());
      dispatch(actGetAccountAsync("1"));
    },
    // eslint-disable-next-line
    []
  );
   const detailUsers = (id) => {
     dispatch(actGetAccountAsync(id));
   };
    const onActive = (id) => {
      setIsLoading(true);
      dispatch(actActiveAccountAsync(id, allUser)).then((res) => {
        if (res.ok) {
          NotificationManager.success("Active thành công");
        } else {
          NotificationManager.error("Active thất bại");
        }
        setIsLoading(false);
      });
    };
    const onDeActive = (id) => {
      setIsLoading(true);
      dispatch(actDeActiveAccountAsync(id, allUser)).then((res) => {
        if (res.ok) {
          NotificationManager.success("Deactive thành công");
        } else {
          NotificationManager.error("Deactive thất bại");
        }
        setIsLoading(false);
      });
    };
      const onGrantUser = (id, role) => {
        dispatch({
          type: OPEN_MODAL,
          payload: <UpdateRoleModal id={id} role={role} />,
        });
      };
  return (
    <div className="dashboard-content">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-xs-12 traffic">
          <div className="dashboard-list-box">
            <h4 className="gray">Danh sách quyền truy cập</h4>
            <div className="table-box">
              <table className="basic-table">
                <thead>
                  <tr>
                    {role &&
                      role.map((role, index) => (
                        <th style={{ border: "2px solid #333" }} key={index}>
                          {role.name}
                        </th>
                      ))}
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-7 col-md-12 col-xs-12 traffic">
          <div className="dashboard-list-box margin-top-20 user-list">
            <h4 className="gray">Danh sách người dùng</h4>
            <ul>
              {allUser && (
                <>
                  {allUser.slice(page, page + 5).map((user, index) => (
                    <li key={index}>
                      <div className="user-list-item">
                        <div className="user-list-image">
                          <img
                            src={
                              user.avatar === null
                                ? `https://source.unsplash.com/random/?book,post,${user.id}`
                                : user.avatar
                            }
                            alt=""
                          />
                        </div>
                        <div className="user-list-content">
                          <h4>{user.fullname}</h4>
                          <span>{user.status}</span>
                        </div>
                        <div className="user-btns">
                          {user.status === "INACTIVE" ? (
                            <button
                              className="button"
                              onClick={() => onActive(user.id)}
                              disabled={isLoading}
                            >
                              Active
                            </button>
                          ) : (
                            <button
                              className="button"
                              onClick={() => onDeActive(user.id)}
                              disabled={isLoading}
                            >
                              DeActive
                            </button>
                          )}
                          <button
                            className="button"
                            onClick={() => detailUsers(user.id)}
                          >
                            View
                          </button>
                          <button
                            className="button"
                            onClick={() => onGrantUser(user.id, user.rolename)}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                  <PaginationRe
                    page={page}
                    setPage={setPage}
                    count={5}
                    totalPages={allUser.length}
                  />
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="col-lg-5 col-md-12 col-xs-12 traffic">
          <div className="dashboard-list-box with-icons margin-top-20">
            <h4 className="gray">Chi tiết người dùng</h4>
            {detailUser && (
              <ul>
                <div className="edit-profile-photo">
                  <img
                    src={
                      detailUser[0].avatar
                        ? detailUser[0].avatar
                        : `https://source.unsplash.com/random/?book,post${detailUser[0].id}`
                    }
                    alt=""
                    style={{ height: "125px" }}
                  />
                </div>
                <div
                  className="my-profile"
                  style={{ display: "flex", marginLeft: "15px" }}
                >
                  <h5>Tên tài khoản :</h5>
                  <h5>{detailUser[0].username}</h5>
                </div>
                <div
                  className="my-profile"
                  style={{ display: "flex", marginLeft: "15px" }}
                >
                  <h5>Tên đầy đủ :</h5>
                  <h5>{detailUser[0].fullname}</h5>
                </div>
                <div
                  className="my-profile"
                  style={{ display: "flex", marginLeft: "15px" }}
                >
                  <h5>Giới tính :</h5>
                  <h5>{detailUser[0].gender ? "male" : "female"}</h5>
                </div>
                <div
                  className="my-profile"
                  style={{ display: "flex", marginLeft: "15px" }}
                >
                  <h5>Số điện thoại :</h5>
                  <h5>{detailUser[0].phone}</h5>
                </div>
                <div
                  className="my-profile"
                  style={{ display: "flex", marginLeft: "15px" }}
                >
                  <h5>Email :</h5>
                  <h5>{detailUser[0].email}</h5>
                </div>
                <div
                  className="my-profile"
                  style={{ display: "flex", marginLeft: "15px" }}
                >
                  <h5>Trạng thái :</h5>
                  <h5>{detailUser[0].status}</h5>
                </div>
                <div
                  className="my-profile"
                  style={{ display: "flex", marginLeft: "15px" }}
                >
                  <h5>Quyền truy cập :</h5>
                  <h5>{detailUser[0].role}</h5>
                </div>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentDashboard;
