import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { CLOSE_MODAL } from "../../store/modal/actions";
import { NotificationManager } from "react-notifications";
import { actUpdateAccountAsync } from "../../store/user/actions";
import { actUpdateStatusPostAsync } from "../../store/post/actions";

export const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  border-top: 1px solid #343a40;
`;

export const Button1 = styled.div`
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
export const Button2 = styled.div`
  margin: 10px;
  color: #fff;
  height: 40px;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
  width: 200px;
  cursor: pointer;
  background-color: #41ca63;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: #27793b;
  }
`;
export const Button3 = styled.div`
  margin: 10px;
  color: #000;
  height: 40px;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
  width: 200px;
  cursor: pointer;
  background-color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: #ddd;
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

const ManuscriptModal = ({id}) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = (path) => {
    setIsLoading(true);
    dispatch(actUpdateStatusPostAsync(path, id)).then((res) => {
      if (res.ok) {
        NotificationManager.success("Cập nhật thành công");
      } else {
        NotificationManager.error("Cập nhật thất bại");
      }
      closeModal();
      setIsLoading(false);
    });
  };

  const closeModal = () => {
    dispatch({
      type: CLOSE_MODAL,
    });
  };

  return (
    <div>
      <Message>Cập nhật quyền truy cập</Message>
      <ModalFooter>
        <Button1 onClick={() => onSubmit("accept")} disabled={isLoading}>
          {isLoading ? "Deleting..." : "Accept"}
        </Button1>
        <Button2 onClick={() => onSubmit("reject")} disabled={isLoading}>
          {isLoading ? "Deleting..." : "Reject"}
        </Button2>
        <Button3 onClick={() => onSubmit("revise")} disabled={isLoading}>
          {isLoading ? "Deleting..." : "Revise"}
        </Button3>
        <CloseButton onClick={closeModal}> Cancel </CloseButton>
      </ModalFooter>
    </div>
  );
};

export default ManuscriptModal;
