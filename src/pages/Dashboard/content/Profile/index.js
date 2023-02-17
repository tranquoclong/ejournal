import {
  PlusCircleOutlined,
  FacebookFilled,
  TwitterOutlined,
} from "@ant-design/icons";
import ChangePassWord from "./changePassWord";
function Profile() {
  return (
    <div className="dashboard-content">
      <div className="dashboard-form">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-xs-12 padding-right-30">
            <div className="dashboard-list-box">
              <h4 className="gray">Chi tiết hồ sơ</h4>
              <div className="dashboard-list-box-static">
                <div className="edit-profile-photo">
                  <img
                    src="https://avatars.githubusercontent.com/u/98083474?v=4"
                    alt=""
                  />
                  <div className="change-photo-btn">
                    <div className="photoUpload">
                      <span>
                        <PlusCircleOutlined /> Tải ảnh lên
                      </span>
                      <input type="file" className="upload" />
                    </div>
                  </div>
                </div>
                {/* Details */}
                <div className="my-profile">
                  <label>Tên của bạn *</label>
                  <input defaultValue="Tom Perrin" type="text" />
                  <label>Số điện thoại *</label>
                  <input defaultValue="(123) 123-456" type="text" />
                  <label>Địa chỉ Email *</label>
                  <input defaultValue="tom@example.com" type="text" />
                  <label>Tiểu sử *</label>
                  <textarea
                    name="notes"
                    id="notes"
                    cols={30}
                    rows={10}
                    defaultValue={
                      "Maecenas quis consequat libero, a feugiat eros. Nunc ut lacinia tortor morbi ultricies laoreet ullamcorper phasellus semper"
                    }
                  />
                  <label className="twitter-input">
                    <TwitterOutlined /> Twitter
                  </label>
                  <input placeholder="https://www.twitter.com/" type="text" />
                  <label className="fb-input">
                    <FacebookFilled /> Facebook
                  </label>
                  <input placeholder="https://www.facebook.com/" type="text" />
                </div>
                <button className="button">Lưu thay đổi</button>
              </div>
            </div>
          </div>
          <ChangePassWord/>
        </div>
      </div>
    </div>
  );
}

export default Profile;
