import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleItem from "../../../../components/ArticleItem";
import { actFetchAuthorPostsAsync } from "../../../../store/post/actions";
function AuthorListPost() {
  const dispatch = useDispatch();
  const authorArticles = useSelector((state) => state.Post.authorArticles);
  useEffect(
    () => {
      dispatch(actFetchAuthorPostsAsync());
    },
    // eslint-disable-next-line
    []
  );
  return (
    <div className="dashboard-content">
      <section id="mt_blog" className>
        <div className="row">
          <div className="col-md-12">
            <div className="blog_post_sec blog_post_inner">
              <div className="row">
                {authorArticles ? (
                  <>
                    {authorArticles.map((post) => {
                      return (
                        <div
                          className="col-md-6 col-sm-12 mar-bottom-30"
                          key={post.id}
                        >
                          <ArticleItem
                            post={post}
                            isStyleRow
                          />
                        </div>
                      );
                    })}
                  </>
                ) : (
                  "Không tìm thấy thông tin"
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AuthorListPost;
