import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actGetAllMajor, actGetAllUniversity } from "../../../../store/user/actions";
function University() {
    const dispatch = useDispatch();
    const allUniversity = useSelector((state) => state.User.allUniversity);
    const allMajor = useSelector((state) => state.User.allMajor);

    useEffect(
    () => {
        dispatch(actGetAllUniversity());
        dispatch(actGetAllMajor());
    },
    // eslint-disable-next-line
    []
    );
  return (
    <div className="dashboard-content">
      <div className="row">
        <div className="col-lg-7 col-md-12 col-xs-12 traffic">
          <div className="dashboard-list-box with-icons margin-top-20">
            <h4 className="gray">Các hoạt động gần đây</h4>
            <ul>
              {allUniversity &&
                allUniversity.slice(0, 5).map((university, index) => (
                  <li key={index}>
                    <div className="user-list-item">
                      <div className="user-list-content">
                        <h4>{university.name}</h4>
                        <span>{university.status}</span>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="col-lg-5 col-md-12 col-xs-12 traffic">
          <div className="dashboard-list-box margin-top-20 user-list">
            <h4 className="gray">Danh sách người dùng</h4>
            <ul>
              {allMajor &&
                allMajor.slice(0, 5).map((major, index) => (
                  <li key={index}>
                    <div className="user-list-item">
                      {/* <div className="user-list-image">
                        <img
                          src={
                            user.avatar === null
                              ? `https://source.unsplash.com/random/?book,post,${user.id}`
                              : user.avatar
                          }
                          alt=""
                        />
                      </div> */}
                      <div className="user-list-content">
                        <h4>{major.name}</h4>
                        <span>{major.status}</span>
                      </div>
                      <div className="user-btns">
                        <Link to="#" className="button">
                          View
                        </Link>
                        <Link to="#" className="button">
                          Edit
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default University