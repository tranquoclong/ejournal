import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { OPEN_MODAL } from "../../store/modal/actions";
import {  actFetchPaymentAuAsync, actFetchUpdatePostsAsync } from "../../store/post/actions";
import AssignReviewModal from "../Modal/AssignReviewModal";
import ManuscriptModal from "../Modal/manuscriptModal";
import ReviewModal from "../Modal/reviewModal";
import UpdateModal from "../Modal/UpdateModal";

import PayAuModal from "../Modal/PayAuModal";
export default function ArticleItemStatslist({
  user,
  isEditor,
  isEditorUse,
  isAuthor,
  isAuthorUse,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [review, setReview] = useState(null);
  const baseURL = "http://localhost:5000/";
  const paymentAu = useSelector((state) => state.Post.paymentAu);
  
  useEffect(() => {
    const getAccountInfo = async () => {
      const response = await axios
        .create({
          baseURL,
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .post("review/view/all/", { articleid: user.id });
      setReview(response.data.list[0]?.content);
    };
    dispatch(actFetchPaymentAuAsync());
    getAccountInfo();
    // eslint-disable-next-line
  }, []);
  const onModal = () => {
    dispatch({
      type: OPEN_MODAL,
      payload: <ManuscriptModal id={user.id} />,
    });
  };
  const onModals = () => {
    dispatch({
      type: OPEN_MODAL,
      payload: <AssignReviewModal id={user.id} />,
    });
  };
  const onModalss = () => {
    dispatch({
      type: OPEN_MODAL,
      payload: <ReviewModal review={review} />,
    });
  };
  const onUpdate = () => {
    dispatch(actFetchUpdatePostsAsync(user.id, history));
  };

  const onDelete = () => {
    dispatch({
      type: OPEN_MODAL,
      payload: <UpdateModal id={user.id} />,
    });
  };
    const onDPayAu = () => {
      dispatch({
        type: OPEN_MODAL,
        payload: <PayAuModal id={user.id} />,
      });
    };

  return (
    <>
      <li>
        <div className="user-list-item">
          <div className="user-list-content">
            <Link to={`/post/${user.id}`}>{user.title}</Link>
            {isEditor ? (
              <span>{user.status ? user.status : "ACCEPT"}</span>
            ) : (
              <span>Ngành học : {user.majorname}</span>
            )}
          </div>
          <div className="user-btns">
            {isEditor && (
              <>
                {isEditorUse && (
                  <>
                    <button className="button" onClick={() => onModal()}>
                      Cấp Quyền
                    </button>
                    <button className="button" onClick={() => onModals()}>
                      phân công đánh giá
                    </button>
                  </>
                )}
                {review ? (
                  <button className="button" onClick={() => onModalss()}>
                    Xem Đánh Giá
                  </button>
                ) : (
                  <button className="button">Chưa Đánh Giá</button>
                )}
              </>
            )}
            {isAuthor && (
              <>
                {review && (
                  <button className="button" onClick={() => onModalss()}>
                    Xem Đánh Giá
                  </button>
                )}
                {isAuthorUse && (
                  <>
                    <button className="button" onClick={() => onUpdate()}>
                      Chỉnh sửa
                    </button>
                    <button className="button" onClick={() => onDelete()}>
                      Xóa bài
                    </button>
                    {user.openaccess && (
                      <>
                        {paymentAu && (
                          <>
                            {!paymentAu.filter((p) => p.articleid === user.id)
                              .length > 0 && (
                              <button
                                className="button"
                                onClick={() => onDPayAu()}
                              >
                                Thanh toán
                              </button>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </li>
    </>
  );
}
