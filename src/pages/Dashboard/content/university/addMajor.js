import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actPutMajorAsync } from "../../../../store/user/actions";
import { NotificationManager } from "react-notifications";

function AddMajor({ allMajor }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
  });
  function onFinish(evt) {
    evt.preventDefault();
    if (!formData.name) {
      return;
    }
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    dispatch(actPutMajorAsync(formData, allMajor)).then((res) => {
      if (res.ok) {
        NotificationManager.success("thêm ngành học thành công");
        setFormData({ name: "", email: "", mailtype: "" });
      } else {
        NotificationManager.error("thêm ngành học thất bại");
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
    <div className="col-lg-6 col-md-6 col-xs-12 padding-left-30">
      <div className="dashboard-list-box">
        <h4 className="gray">Thêm ngành học</h4>
        <form onSubmit={onFinish} className="dashboard-list-box-static">
          <div className="my-profile">
            <label>Tên ngành học *</label>
            <input
              type="text"
              placeholder="Điền ngành học"
              value={formData.name}
              onChange={handleChange("name")}
            />
          </div>
          <button className="button">Lưu thay đổi</button>
        </form>
      </div>
    </div>
  );
}

export default AddMajor;
