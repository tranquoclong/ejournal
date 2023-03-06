import "./ArticlesPopular.css";
import MainTitle from "../../common/MainTitle";

import ArticleItem from "../ArticleItem";
// import { posts } from "../../data";
import { useSelector } from "react-redux";

export default function ArticlesPopular() {
  const articles = useSelector((state) => state.Post.articles);
  return (
    <>
      <MainTitle>Các bài viết phổ biến</MainTitle>
      {articles && (
        <>
          <div className="col-md-8 col-sm-12 mar-bottom-30">
            <ArticleItem isStyleRow post={articles[0]} isShowCategories />
          </div>
          <div className="col-md-4 col-sm-12 mar-bottom-30">
            <ArticleItem isStyleCard post={articles[1]} isShowCategoriesImg />
          </div>
          <div className="col-md-4 col-sm-12 mar-bottom-30">
            <ArticleItem isStyleCard post={articles[2]} isShowCategoriesImg />
          </div>
          <div className="col-md-8 col-sm-12 mar-bottom-30">
            <ArticleItem isStyleRow post={articles[1]} isShowCategories />
          </div>
        </>
      )}
    </>
  );
}
