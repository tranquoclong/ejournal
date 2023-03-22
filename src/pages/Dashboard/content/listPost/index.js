import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import PaginationRe from '../../../../common/Paging';
//import ArticleItem from '../../../../components/ArticleItem';
import ArticleItemStatslist from '../../../../components/ArticleItem/ArticleItemStatslist';
import { actFetchPostsAsync } from '../../../../store/post/actions';
function ListPost() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const articles = useSelector((state) => state.Post.articles);
   useEffect(
     () => {
       dispatch(actFetchPostsAsync());
     },
     // eslint-disable-next-line
     []
   );
  return (
    <div className="dashboard-content">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-xs-12 traffic">
          <div className="dashboard-list-box margin-top-20 user-list">
            <h4 className="gray">Danh sách bài báo</h4>
            <ul>
              {articles && (
                <>
                  {articles.slice(page, page + 8).map((user, index) => (
                    <ArticleItemStatslist
                      user={user}
                      key={index}
                      isEditor={true}
                    />
                  ))}
                  <PaginationRe
                    page={page}
                    setPage={setPage}
                    count={8}
                    totalPages={articles.length}
                  />
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      {/* <section id="mt_blog" className>
        <div className="row">
          <div className="col-md-12">
            <div className="blog_post_sec blog_post_inner">
              <div className="row">
                {articles ? (
                  <>
                    {articles.map((post) => {
                      return (
                        <div
                          className="col-md-6 col-sm-12 mar-bottom-30"
                          key={post.id}
                        >
                          <ArticleItem
                            post={post}
                            isStyleRow
                            isShowCategories
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
      </section> */}
    </div>
  );
}

export default ListPost