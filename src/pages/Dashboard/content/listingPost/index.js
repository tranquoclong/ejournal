import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleItem from "../../../../components/ArticleItem";
import { actFetchManusAsync } from "../../../../store/post/actions";
function ListingPost() {
  const dispatch = useDispatch();
  const manuscript = useSelector((state) => state.Post.manuscript);
  useEffect(
    () => {
      dispatch(actFetchManusAsync());
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
                {manuscript ? (
                  <>
                    {manuscript.map((post) => {
                      return (
                        <div
                          className="col-md-6 col-sm-12 mar-bottom-30"
                          key={post.id}
                        >
                          <ArticleItem
                            post={post}
                            isStyleRow
                            isShowCategories
                            isEditor={true}
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

export default ListingPost;
