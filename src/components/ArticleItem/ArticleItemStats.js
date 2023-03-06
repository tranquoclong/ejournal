import { useDispatch } from "react-redux";
import { OPEN_MODAL } from "../../store/modal/actions";
import ManuscriptModal from "../Modal/manuscriptModal";

export default function ArticleItemStats({ viewCount, id, isEditor }) {
  const dispatch = useDispatch();
  const onModal = () => {
    dispatch({
      type: OPEN_MODAL,
      payload: <ManuscriptModal id={id} />,
    });
  };
  return (
    <ul className="article-item__stats post-category">
      <li>
        <i className="icons ion-ios-eye"></i>
        <span className="text">{viewCount}</span>
      </li>
      {isEditor && (
        <li className="cat-pink">
          <span className="text" onClick={() => onModal()}>
            Cấp Quyền
          </span>
        </li>
      )}
    </ul>
  );
}
