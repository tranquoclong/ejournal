import React, { useEffect, useState } from 'react'
import { NotificationManager } from "react-notifications";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {  actGetAllReviewAsync, actSubmitReviewAsync } from '../../../../store/user/actions';
function Review() {
      const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const [articleid, setArticleid] = useState("");
      const [isLoading, setIsLoading] = useState(false);
        const { allReview } = useSelector((state) => state.User);
        useEffect(
          () => {
            dispatch(actGetAllReviewAsync());
          },
          // eslint-disable-next-line
          []
        );
      function handleChange(key) {
        return (evt) => {
          setFormData({
            ...formData,
            [key]: evt.target.value,
          });
        };
      }
        function onFinish(evt) {
          evt.preventDefault();
          if (isLoading) {
            return;
          }
          setIsLoading(true);
          dispatch(actSubmitReviewAsync(formData, articleid)).then((res) => {
            if (res.ok) {
              NotificationManager.success("đổi thông tin thành công");
            } else {
              NotificationManager.error("đổi thông tin thất bại");
            }
            setIsLoading(false);
          });
        }
  return (
    <div className="dashboard-content">
      <div className="dashboard-form">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-xs-12 padding-right-30">
            <div className="dashboard-list-box">
              <h4 className="gray">Đánh giá</h4>
              <form onSubmit={onFinish} className="dashboard-list-box-static">
                <label>articleid :</label> {articleid}
                <div className="my-profile">
                  <label>content *</label>
                  <input
                    type="text"
                    placeholder="content"
                    value={formData.content}
                    onChange={handleChange("content")}
                  />
                  <label>suggest *</label>
                  <select
                    className="chosen-select-no-single"
                    style={{
                      background: "rgb(53, 54, 58)",
                      color: "#ddd",
                    }}
                    value={formData.suggest}
                    onChange={handleChange("suggest")}
                    required
                  >
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                  </select>
                </div>
                <button className="button">Lưu thay đổi</button>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-xs-12 padding-right-30">
              <div className="dashboard-list-box margin-top-20 user-list">
                <h4 className="gray">Bài chờ đánh giá</h4>
                <ul>
                  {allReview && (
                    <>
                      {allReview.map((user, index) => (
                        <li key={index}>
                          <div className="user-list-item">
                            <div className="user-list-content">
                              <h4>{user.title}</h4>
                              <span>{user.majorname}</span>
                            </div>
                            <div className="user-btns" style={{alignItems: "center",display: "flex"}}>
                              <Link to={`/post/${user.id}`} className="button">
                                View
                              </Link>
                              <button
                                className="button"
                                onClick={() => setArticleid(user.id)}
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review