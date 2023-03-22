import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { OPEN_MODAL } from "../../store/modal/actions";
import { actFetchUpdatePostsAsync } from "../../store/post/actions";
import AssignReviewModal from "../Modal/AssignReviewModal";
import ManuscriptModal from "../Modal/manuscriptModal";
import ReviewModal from "../Modal/reviewModal";
import UpdateModal from "../Modal/UpdateModal";

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
  return (
    <>
      <li>
        <div className="user-list-item">
          <div className="user-list-content">
            <h4>{user.title}</h4>
            {isEditor ? (
              <span>{user.status ? user.status:"ACCEPT"}</span>
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
                {review ? (
                  <button className="button" onClick={() => onModalss()}>
                    Xem Đánh Giá
                  </button>
                ) : (
                  <button className="button">Chưa Đánh Giá</button>
                )}
                {isAuthorUse && (
                  <>
                    <button className="button" onClick={() => onUpdate()}>
                      Chỉnh sửa
                    </button>
                    <button className="button" onClick={() => onDelete()}>
                      Xóa bài
                    </button>
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
