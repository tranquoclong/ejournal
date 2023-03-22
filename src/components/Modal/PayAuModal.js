import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { CLOSE_MODAL } from "../../store/modal/actions";
import { NotificationManager } from "react-notifications";
import {  actFetchPayAuAsync } from "../../store/post/actions";
import { PayPalButton } from "react-paypal-button-v2/lib";
export const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  border-top: 1px solid #343a40;
`;

export const ConfirmButton = styled.div`
  margin: 10px;
  color: #fff;
  height: 40px;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
  width: 200px;
  cursor: pointer;
  background-color: #3bc9db;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: #1098ad;
  }
`;
export const CloseButton = styled.div`
  margin: 10px;
  color: #fff;
  height: 40px;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
  width: 200px;
  cursor: pointer;
  background-color: #e03131;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.2s;

  &:hover {
    background-color: #c92a2a;
  }
`;

const Message = styled.div`
  padding: 20px;
  text-align: center;
  font-size: 2rem;
  color: #000;
`;

const PayAuModal = ({ id }) => {

  const dispatch = useDispatch();
      const clientId =
        "AaD6Jk0vH-3xv3Znlq4ztjADzIHzaHABruRk8dCmnwbHB34rvJx7W-GUesEdMeX9kqSzXaaqnrEc3VGs";
      const onSuccess = (details, data) => {
        console.log(details);
        if (details.status === "COMPLETED") {
          dispatch(actFetchPayAuAsync(id)).then((res) => {
            if (res.ok) {
              closeModal();
              NotificationManager.success("thành công");
            } else {
              NotificationManager.error("thất bại");
            }
          });
        } else {
          alert("fail");
        }
      };

  const closeModal = () => {
    dispatch({
      type: CLOSE_MODAL,
    });
  };

  return (
    <div>
      <Message>Cập nhật quyền truy cập</Message>
      <div style={{padding:"20px"}}>
        <PayPalButton
          shippingPreference="NO_SHIPPING"
          amount="1500"
          options={{
            clientId,
          }}
          onSuccess={(details, data) => {
            onSuccess(details, data);
          }}
        />
      </div>
      <ModalFooter>
        <CloseButton onClick={closeModal}> Cancel </CloseButton>
      </ModalFooter>
    </div>
  );
};

export default PayAuModal;
