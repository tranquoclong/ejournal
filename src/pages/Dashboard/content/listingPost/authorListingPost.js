import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaginationRe from "../../../../common/Paging";
// import ArticleItem from "../../../../components/ArticleItem";
//import ArticleItemAuthor from "../../../../components/ArticleItem/ArticleItemAuthor";
import ArticleItemStatslist from "../../../../components/ArticleItem/ArticleItemStatslist";
import { actFetchAuthorManusAsync } from "../../../../store/post/actions";
function AuthorListingPost() {
  const dispatch = useDispatch();
  const authorManuscript = useSelector((state) => state.Post.authorManuscript);
  const [page, setPage] = useState(0);
  useEffect(
    () => {
      dispatch(actFetchAuthorManusAsync());
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
              {authorManuscript && (
                <>
                  {authorManuscript.slice(page, page + 8).map((user, index) => (
                    <ArticleItemStatslist
                      user={user}
                      key={index}
                      isAuthor={true}
                      isAuthorUse={true}
                    />
                  ))}
                  <PaginationRe
                    page={page}
                    setPage={setPage}
                    count={8}
                    totalPages={authorManuscript.length}
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
                {authorManuscript ? (
                  <>
                    {authorManuscript.map((post) => {
                      return (
                        <div
                          className="col-md-6 col-sm-12 mar-bottom-30"
                          key={post.id}
                        >
                          <ArticleItemAuthor post={post} isStyleRow />
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

export default AuthorListingPost;
