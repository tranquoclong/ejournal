import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  actGetAllUniversity, actPaymentUniversityAsync } from "../../../../store/user/actions";
import { NotificationManager } from "react-notifications";
import { PayPalButton } from "react-paypal-button-v2";
import { useIsLogin } from "../../../../hooks/useIsLogin";
import { actFetchPaymentUnisAsync } from "../../../../store/post/actions";
import moment from "moment";
function PaymentUni() {
  const dispatch = useDispatch();
  const { isLogin } = useIsLogin();
  const [universityid, setUniversityid] = useState("12");
  const allUniversity = useSelector((state) => state.User.allUniversity);
  const paymentUnis = useSelector((state) => state.Post.paymentUnis); 
  useEffect(
     () => {
       dispatch(actGetAllUniversity());
        dispatch(actFetchPaymentUnisAsync());
     },
     // eslint-disable-next-line
     []
   );

  const clientId ="AaD6Jk0vH-3xv3Znlq4ztjADzIHzaHABruRk8dCmnwbHB34rvJx7W-GUesEdMeX9kqSzXaaqnrEc3VGs";
   const onSuccess = (details, data) => {
    console.log(details);
     if (details.status === "COMPLETED") {
           dispatch(actPaymentUniversityAsync(universityid)).then((res) => {
             if (res.ok) {
               NotificationManager.success("thành công");
             } else {
               NotificationManager.error("thất bại");
             }
           });
     } else {
       alert("fail");
     }
   };
  return (
    <div
      className="dashboard-list-box margin-top-0"
      style={{ marginTop: "25px" }}
    >
      <h4 className="gray">Thanh Toán Trường Học</h4>
      <form className="dashboard-list-box-static">
        <div className="my-profile">
          <label className="margin-top-0">
            Ngày hết hạn :
            {paymentUnis &&
              moment(paymentUnis.expirationdate).format("DD-MM-YYYY")}
          </label>
          <br />
          <label className="margin-top-0">Email Trường : {isLogin.email}</label>
          {/* <select
            className="chosen-select-no-single"
            style={{
              background: "rgb(53, 54, 58)",
              color: "#ddd",
            }}
            name="majorid"
            onChange={(e) => setUniversityid(e.target.value)}
            required
          >
            {allUniversity &&
              allUniversity
                .filter((u) => u.email === isLogin.email)
                .map((university, index) => (
                  <option value={university.id} key={index}>
                    {university.name}
                  </option>
                ))}
          </select> */}
        </div>
        {paymentUnis && paymentUnis.isexpired && (
          <>
            <label className="margin-top-0">Gia Hạn</label>
            <PayPalButton
              disabled={true}
              shippingPreference="NO_SHIPPING"
              amount="65"
              options={{
                clientId,
              }}
              onSuccess={(details, data) => {
                onSuccess(details, data);
              }}
              disableCard="no"
              disableFunding="no"
            />
          </>
        )}
      </form>
    </div>
  );
}

export default PaymentUni;
