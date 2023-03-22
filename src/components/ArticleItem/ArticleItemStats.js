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

export default function ArticleItemStats({ viewCount, id, isEditor, isAuthor }) {
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
        .post("review/view/all/", { articleid: id });
      setReview(response.data.list[0]?.content);
    };
    getAccountInfo();
    // eslint-disable-next-line
  }, []);
  const onModal = () => {
    dispatch({
      type: OPEN_MODAL,
      payload: <ManuscriptModal id={id} />,
    });
  };
  const onModals = () => {
    dispatch({
      type: OPEN_MODAL,
      payload: <AssignReviewModal id={id} />,
    });
  };
  const onModalss = () => {
    dispatch({
      type: OPEN_MODAL,
      payload: <ReviewModal review={review} />,
    });
  };
  const onUpdate = () => {
    dispatch(actFetchUpdatePostsAsync(id, history));
  };
  const onDelete = () => {
    dispatch({
      type: OPEN_MODAL,
      payload: <UpdateModal id={id} />,
    });
  };
  return (
    <ul className="article-item__stats post-category">
      {viewCount && (
        <li>
          <i className="icons ion-ios-eye"></i>
          <span className="text">{viewCount}</span>
        </li>
      )}
      {isEditor && (
        <>
          <li className="cat-pink">
            <span className="text" onClick={() => onModal()}>
              Cấp Quyền
            </span>
          </li>
          {/* {viewCount !== "PENDING" && viewCount !== "REVIEWED" && (
            <li className="cat-pink">
              <span className="text" onClick={() => onModals()}>
                phân công đánh giá
              </span>
            </li>
          )} */}
          <li className="cat-pink">
            <span className="text" onClick={() => onModals()}>
              phân công đánh giá
            </span>
          </li>
          {review && (
            <li className="cat-pink">
              <span className="text" onClick={() => onModalss()}>
                Xem Đánh Giá
              </span>
            </li>
          )}
        </>
      )}
      {isAuthor && (
        <>
          {review && (
            <li className="cat-pink">
              <span className="text" onClick={() => onModalss()}>
                Xem Đánh Giá
              </span>
            </li>
          )}
          <li className="cat-pink">
            <span className="text" onClick={() => onUpdate()}>
              Chỉnh sửa
            </span>
          </li>
          <li className="cat-pink">
            <span className="text" onClick={() => onDelete()}>
              Xóa bài
            </span>
          </li>
        </>
      )}
    </ul>
  );
}
