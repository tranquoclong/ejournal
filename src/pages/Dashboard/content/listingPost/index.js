import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaginationRe from "../../../../common/Paging";
// import ArticleItem from "../../../../components/ArticleItem";
//import ArticleItemEditor from "../../../../components/ArticleItem/ArticleItemEditor";
import ArticleItemStatslist from "../../../../components/ArticleItem/ArticleItemStatslist";
import { actFetchManusAsync } from "../../../../store/post/actions";
function ListingPost() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
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
      <div className="row">
        <div className="col-lg-12 col-md-12 col-xs-12 traffic">
          <div className="dashboard-list-box margin-top-20 user-list">
            <h4 className="gray">Danh sách bản thảo</h4>
            <ul>
              {manuscript && (
                <>
                  {manuscript.slice(page, page + 8).map((user, index) => (
                    <ArticleItemStatslist
                      user={user}
                      key={index}
                      isEditor={true}
                      isEditorUse={true}
                    />
                  ))}
                  <PaginationRe
                    page={page}
                    setPage={setPage}
                    count={8}
                    totalPages={manuscript.length}
                  />
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      {/* <section id="mt_blog">
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
                          <ArticleItemEditor
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
      </section> */}
    </div>
  );
}

export default ListingPost;
