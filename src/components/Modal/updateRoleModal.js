import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { CLOSE_MODAL } from "../../store/modal/actions";
import { NotificationManager } from 'react-notifications';
import { actUpdateAccountAsync } from "../../store/user/actions";

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
  color:#000;
`;

const UpdateRoleModal = ({ id, role }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [roleId, setRoleId] = useState("0");
  const dispatch = useDispatch();

  const onSubmit = () => {
    setIsLoading(true);
    dispatch(actUpdateAccountAsync(id, roleId)).then((res) => {
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
      <div
        style={{
          margin: "0 50px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <label
          style={{
            color: "black",
          }}
        >
          Quyền hiện tại :
        </label>
        <label
          style={{
            color: "black",
          }}
        >
          {role}
        </label>
      </div>
      <div
        style={{
          margin: "20px 50px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <label
          style={{
            color: "black",
          }}
        >
          Quyền mới :
        </label>
        <select
          className="chosen-select-no-single"
          style={{
            background: "#fff",
            color: "black",
            width: "50%",
          }}
          onChange={(e) => setRoleId(e.target.value)}
        >
          <option value={0}>Lựa chọn quyền</option>
          <option value={6}>EDITOR_IN_CHIEF</option>
          <option value={5}>EDITOR</option>
          <option value={4}>REVIEWER</option>
          <option value={3}>AUTHOR</option>
          <option value={2}>MEMBER</option>
          <option value={1}>ADMIN</option>
        </select>
      </div>
      <ModalFooter>
        <ConfirmButton onClick={onSubmit} disabled={isLoading}>
          {isLoading ? "Deleting..." : "Submit"}
        </ConfirmButton>
        <CloseButton onClick={closeModal}> Cancel </CloseButton>
      </ModalFooter>
    </div>
  );
};

export default UpdateRoleModal;
