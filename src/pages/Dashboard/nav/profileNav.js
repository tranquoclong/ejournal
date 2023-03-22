import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useIsLogin } from "../../../hooks/useIsLogin";
import { useDetectOutsideClick } from "../../../hooks/useOutsideClick";
import { actLogout } from "../../../store/auth/actions";

function ProfileNav() {
  const { currentUser } = useIsLogin();
    const dispatch = useDispatch();
    const history = useHistory();
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);
      function handleLogout(evt) {
        evt.preventDefault();
        dispatch(actLogout({ history }));
      }
  return (
    <div
      ref={dropdownRef}
      className={`dropdown ${isActive && "open"}`}
      onClick={onClick}
    >
      <div className="dropdown-toggle">
        <div className="profile-sec">
          <div className="dash-image">
            <img
              src={
                currentUser.avatar === null
                  ? `https://source.unsplash.com/random/?book,post,${currentUser.id}`
                  : currentUser.avatar
              }
              alt=""
            />
          </div>
          <div className="dash-content">
            <h4>{currentUser.fullname}</h4>
            <span>{currentUser.email}</span>
          </div>
        </div>
      </div>
      <ul className="dropdown-menu">
        <li>
          <Link to="/dashboard/profile">
            <i className="sl sl-icon-user" />
            Hồ sơ
          </Link>
        </li>
        <li>
          <Link to="#" onClick={handleLogout}>
            <i className="sl sl-icon-power" />
            Đăng xuất
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default ProfileNav;
