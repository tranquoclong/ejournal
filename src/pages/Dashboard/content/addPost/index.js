import React, { useEffect, useRef } from "react";
import useForm from "../../../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { validateAddPost } from "../../../../components/Validate/validateInput";
import { NotificationManager } from 'react-notifications';
import { actPostArticleAsync } from "../../../../store/post/actions";
import { useIsLogin } from "../../../../hooks/useIsLogin";
import { actGetAllMajor } from "../../../../store/user/actions";
import { useDetectOutsideClick } from "../../../../hooks/useOutsideClick";
function AddPost() {
  const dispatch = useDispatch();
    const { currentUser } = useIsLogin();
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);
  const { values, errors, handleChange, handleSubmit } = useForm(
    login,
    validateAddPost
  );
  const allMajor = useSelector((state) => state.User.allMajor);
    useEffect(
      () => {
        dispatch(actGetAllMajor());
      },
      // eslint-disable-next-line
      []
    );
  function login() {
    values.authorlist = [
      {
        fullname: currentUser.fullname,
        email: currentUser.email,
        iscorresponding: true,
      },
    ];
    values.openaccess = values.openaccess === true;
    dispatch(actPostArticleAsync(values)).then((res) => {
      if (res.ok) {
        NotificationManager.success("Cập nhật thành công");
      } else {
        NotificationManager.error("Cập nhật thất bại");
      }
    });
  }
  return (
    <div className="dashboard-content">
      <div className="row">
        <div className="col-lg-12 col-sm-12">
          <form id="add-listing" onSubmit={handleSubmit} noValidate>
            <div className="add-listing-section">
              <div className="add-listing-headline">
                <h3>
                  <i className="sl sl-icon-map" /> Bài viết
                </h3>
              </div>
              <div className="submit-section">
                <div className="row with-forms">
                  <div className="col-md-6" style={{ color: "lightcoral" }}>
                    <label>Tên bài viết</label>
                    {errors.title ? ` * ${errors.title}` : ""}
                    <input
                      type="text"
                      name="title"
                      placeholder="tên bài viết ..."
                      onChange={handleChange}
                      value={values.title || ""}
                      required
                    />
                  </div>
                  <div className="col-md-6" style={{ color: "lightcoral" }}>
                    <label>Truy cập</label>
                    {errors.openaccess ? ` * ${errors.openaccess}` : ""}
                    <select
                      className="chosen-select-no-single"
                      style={{
                        background: "rgb(53, 54, 58)",
                        color: "#ddd",
                      }}
                      name="openaccess"
                      onChange={handleChange}
                      value={values.openaccess || ""}
                      required
                    >
                      <option>Ai có thể truy cập</option>
                      <option value={true}>Mọi người</option>
                      <option value={false}>Chỉ mình tôi</option>
                    </select>
                  </div>
                  <div className="col-md-6" style={{ color: "lightcoral" }}>
                    <label>Tóm tắc</label>
                    {errors.summary ? ` * ${errors.summary}` : ""}
                    <input
                      type="text"
                      name="summary"
                      placeholder="tóm tắc ..."
                      onChange={handleChange}
                      value={values.summary || ""}
                      required
                    />
                  </div>
                  <div className="col-md-6" style={{ color: "lightcoral" }}>
                    <label>Ngành học</label>
                    {errors.majorid ? ` * ${errors.majorid}` : ""}
                    <select
                      className="chosen-select-no-single"
                      style={{
                        background: "rgb(53, 54, 58)",
                        color: "#ddd",
                      }}
                      name="majorid"
                      onChange={handleChange}
                      value={values.majorid || ""}
                      required
                    >
                      {allMajor &&
                        allMajor.map((major, index) => (
                          <option value={major.id} key={index}>
                            {major.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-md-6" style={{ color: "lightcoral" }}>
                    <label>Thêm tác giả</label>
                    <div
                      ref={dropdownRef}
                      className={`dropdown ${isActive && "open"}`}
                      style={{
                        borderRadius: "10px",
                        padding: "10px 25px",
                        border: "2px solid #666",
                        height: "42px",
                      }}
                      onClick={onClick}
                    >
                      <div
                        className="dropdown-menu"
                        style={{
                          width: "100%",
                          maxWidth: "inherit",
                          padding: "15px !important",
                        }}
                      >
                        <div className="row with-forms">
                          <div
                            className="col-md-6"
                            style={{ color: "lightcoral" }}
                          >
                            <label>Tóm tắc</label>
                            <input
                              type="text"
                              name="summary"
                              placeholder="tóm tắc ..."
                              onChange={handleChange}
                              value={values.summary || ""}
                              required
                            />
                          </div>
                          <div
                            className="col-md-6"
                            style={{ color: "lightcoral" }}
                          >
                            <label>Tóm tắc</label>
                            <input
                              type="text"
                              name="summary"
                              placeholder="tóm tắc ..."
                              onChange={handleChange}
                              value={values.summary || ""}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6" style={{ color: "lightcoral" }}>
                    <label>Tác giả hổ trợ</label>
                  </div>
                </div>
              </div>
              <div className="form" style={{ color: "lightcoral" }}>
                <label>Nội dung</label>
                {errors.content ? ` * ${errors.content}` : ""}
                <textarea
                  className="WYSIWYG"
                  name="content"
                  placeholder="nội dung ..."
                  onChange={handleChange}
                  value={values.content || ""}
                  required
                  style={{ marginBottom: "0px", color: "#fff" }}
                />
              </div>
            </div>
            <button className="button preview">Đăng Bài Viết</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
