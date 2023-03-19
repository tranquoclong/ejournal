import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import ArticleItem from "../../../../components/ArticleItem";
import ArticleItemAuthor from "../../../../components/ArticleItem/ArticleItemAuthor";
import { actFetchAuthorManusAsync } from "../../../../store/post/actions";
function AuthorListingPost() {
  const dispatch = useDispatch();
  const authorManuscript = useSelector((state) => state.Post.authorManuscript);
  useEffect(
    () => {
      dispatch(actFetchAuthorManusAsync());
    },
    // eslint-disable-next-line
    []
  );
  return (
    <div className="dashboard-content">
      <section id="mt_blog">
        <div className="row">
          <div className="col-md-12">
            <div className="blog_post_sec blog_post_inner">
              <div className="row">
                {authorManuscript ? (
                  <>
                    {authorManuscript.map((post) => {
                      return (
                        <div
                          className="col-md-6 col-sm-12 mar-bottom-30"
                          key={post.id}
                        >
                          <ArticleItemAuthor
                            post={post}
                            isStyleRow
                          />
                        </div>
                      );
                    })}
                  </>
                ) : (
                  "không tìm thấy"
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AuthorListingPost;
