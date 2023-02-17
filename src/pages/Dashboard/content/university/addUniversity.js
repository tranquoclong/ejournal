import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actPutUniversityAsync } from "../../../../store/user/actions";
import { NotificationManager } from "react-notifications";
function AddUniversity({ allUniversity }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mailtype: "",
  });
  function onFinish(evt) {
    evt.preventDefault();
    if (!formData.name || !formData.email) {
      return;
    }
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    dispatch(actPutUniversityAsync(formData, allUniversity)).then((res) => {
      if (res.ok) {
        NotificationManager.success("thêm trường thành công");
        setFormData({ name: "", email: "", mailtype: "" });
      } else {
        NotificationManager.error("thêm trường thất bại");
      }
      setIsLoading(false);
    });
  }

  function handleChange(key) {
    return (evt) => {
      setFormData({
        ...formData,
        [key]: evt.target.value,
      });
    };
  }

  return (
    <div className="col-lg-6 col-md-6 col-xs-12 padding-right-30">
      <div className="dashboard-list-box">
        <h4 className="gray">Thêm trường học</h4>
        <form onSubmit={onFinish} className="dashboard-list-box-static">
          <div className="my-profile">
            <label>Tên trường học *</label>
            <input
              type="text"
              placeholder="Điền tên trường"
              value={formData.name}
              onChange={handleChange("name")}
            />
            <label>Email trường *</label>
            <input
              type="email"
              placeholder="Điền email trường"
              value={formData.email}
              onChange={handleChange("email")}
            />
            <label>Kiểu Email *</label>
            <input
              type="text"
              placeholder="Điền kiểu email"
              value={formData.mailtype}
              onChange={handleChange("mailtype")}
            />
          </div>
          <button className="button">Lưu thay đổi</button>
        </form>
      </div>
    </div>
  );
}

export default AddUniversity;
