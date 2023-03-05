import {
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actChangeProfileAsync } from "../../../../store/user/actions";
import { NotificationManager } from "react-notifications";
import { storeImageToFireBase } from "../../../../utils/storeImageToFirebase.";
import { UserService } from "../../../../services/user";

function UpdateProfile() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
      const getAccountInfo = async () => {
        const response = await UserService.profile();
        setFormData(response.data[0]);
      };
      getAccountInfo();
      // eslint-disable-next-line
    }, []);

  const [formData, setFormData] = useState({});
    const [selectedFile, setSelectedFile] = useState();
    useEffect(
      () => {
        const uploadImage = async () => {
          setIsLoading(true);
          if (!selectedFile) {
            setIsLoading(false);
            return;
          }
          const { isSuccess, imageUrl, message } = await storeImageToFireBase(
            selectedFile
          );
          if (isSuccess) {
                  setFormData({
                    ...formData,
                    avatar: imageUrl,
                  });
            setIsLoading(false);
            return imageUrl;
          } else {
            console.log(message);
          }
          setIsLoading(false);
        };
        uploadImage();
      },
      // eslint-disable-next-line
      [selectedFile]
    );
    const onSelectFile = (e) => {
      if (!e.target.files || e.target.files.length === 0) {
        setSelectedFile(undefined);
        return;
      }
      setSelectedFile(e.target.files[0]);
    };
  function onFinish(evt) {
    evt.preventDefault();
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    dispatch(actChangeProfileAsync(formData, formData.id)).then((res) => {
      if (res.ok) {
        NotificationManager.success("đổi thông tin thành công");
      } else {
        NotificationManager.error("đổi thông tin thất bại");
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
        <h4 className="gray">Chi tiết hồ sơ</h4>
        <form onSubmit={onFinish} className="dashboard-list-box-static">
          <div className="edit-profile-photo">
            <img
              src={
                formData.avatar === null
                  ? `https://source.unsplash.com/random/?book,post,${formData.id}`
                  : formData.avatar
              }
              alt=""
            />
            <div className="change-photo-btn">
              <div className="photoUpload">
                <span>
                  <PlusCircleOutlined /> Tải ảnh lên
                </span>
                <input
                  className="upload"
                  type="file"
                  name="profileImageUrl"
                  accept="image/*"
                  onChange={onSelectFile}
                />
              </div>
            </div>
          </div>
          {/* Details */}
          <div className="my-profile">
            <label>Tên của bạn *</label>
            <input
              type="text"
              placeholder="Điền tên đầy đủ"
              value={formData.fullname}
              onChange={handleChange("fullname")}
            />
            <label>Số điện thoại *</label>
            <input
              type="text"
              placeholder="Điền số  điện thoại"
              value={formData.phone}
              onChange={handleChange("phone")}
            />
            <label>Địa chỉ Email *</label>
            <input
              type="email"
              placeholder="Điền địa chỉ email"
              value={formData.email}
              onChange={handleChange("email")}
            />
            <label>Giới tính *</label>
            <select
              className="chosen-select-no-single"
              style={{
                background: "rgb(53, 54, 58)",
                color: "#ddd",
              }}
              value={formData.gender}
              onChange={handleChange("gender")}
              required
            >
              <option value={true}>Nam</option>
              <option value={false}>Nữ</option>
            </select>
          </div>
          <button className="button">Lưu thay đổi</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
