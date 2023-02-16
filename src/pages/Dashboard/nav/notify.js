import React, { useRef } from "react";
import { MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDetectOutsideClick } from "../../../hooks/useOutsideClick";
function Notify() {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);
  return (
    <div
      ref={dropdownRef}
      className={`dropdown ${isActive && "open"}`}
      onClick={onClick}
    >
      <div className="dropdown-toggle">
        <div className="dropdown-item">
          <MailOutlined style={{ fontSize: "30px" }} />
          <span className="notify">3</span>
        </div>
      </div>
      <div className="dropdown-menu notification-menu">
        <h4>23 Tin nhắn</h4>
        <ul>
          <li>
            <Link href="#">
              <div className="notification-item">
                <div className="notification-image">
                  <img
                    src="https://avatars.githubusercontent.com/u/98083474?v=4"
                    alt=""
                  />
                </div>
                <div className="notification-content">
                  <p>You have a notification.</p>
                  <span className="notification-time">2 hours ago</span>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link href="#">
              <div className="notification-item">
                <div className="notification-image">
                  <img
                    src="https://avatars.githubusercontent.com/u/98083474?v=4"
                    alt=""
                  />
                </div>
                <div className="notification-content">
                  <p>You have a notification.</p>
                  <span className="notification-time">2 hours ago</span>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link href="#">
              <div className="notification-item">
                <div className="notification-image">
                  <img
                    src="https://avatars.githubusercontent.com/u/98083474?v=4"
                    alt=""
                  />
                </div>
                <div className="notification-content">
                  <p>You have a notification.</p>
                  <span className="notification-time">2 hours ago</span>
                </div>
              </div>
            </Link>
          </li>
        </ul>
        <p className="all-noti">
          <Link href="#">See all messages</Link>
        </p>
      </div>
    </div>
  );
}

export default Notify;
