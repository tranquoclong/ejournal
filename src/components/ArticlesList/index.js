import ArticleItem from "../ArticleItem";
import MainTitle from "../../common/MainTitle";
import { useSelector } from "react-redux";

export default function ArticlesList() {
  const articles = useSelector((state) => state.Post.articles);
  return (
    <>
      <MainTitle>Danh sách bài viết</MainTitle>
      {articles && articles.map((post) => {
        return (
          <div className="col-md-6 col-sm-12 mar-bottom-30" key={post.id}>
            <ArticleItem post={post} isStyleRow isShowCategories />
          </div>
        );
      })}
      {/* {hasMoreItems && (
        <>
          <div className="col-xs-12">
            <div className="blog-button text-center">
              <Button
                className="btn-blog"
                type="primary"
                isSizeLarge
                isLoading={loading}
                onClick={handleLoadMore}
              >
                Tải thêm
              </Button>
            </div>
          </div>
        </>
      )} */}
    </>
  );
}
