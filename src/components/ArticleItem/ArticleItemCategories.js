import { Link } from "react-router-dom";

export default function ArticleItemCategories({ categoriesId }) {
  return (
    <div className="post-category">
      <ul>
        {categoriesId.map((cateId) => {
          return (
            <li className="cat-pink" key={cateId}>
              <Link to={`/category/${cateId}`} className="white">
                {cateId}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
