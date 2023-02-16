import React from "react";
import ArticleItem from "../../../../components/ArticleItem";
import { posts } from "../../../../data";

function ListingPost() {
  return (
    <div className="dashboard-content">
      <section id="mt_blog" className>
        <div className="row">
          <div className="col-md-12">
            <div className="blog_post_sec blog_post_inner">
              <div className="row">
                {posts.map((post) => {
                  return (
                    <div
                      className="col-md-6 col-sm-12 mar-bottom-30"
                      key={post.id}
                    >
                      <ArticleItem post={post} isStyleRow isShowCategories />
                    </div>
                  );
                })}
                <div className="col-xs-12">
                  <div className="pagination__wrapper">
                    <ul className="pagination">
                      <li>
                        <button className="prev" title="previous page">
                          ❮
                        </button>
                      </li>
                      <li>
                        <button title="first page - page 1">1</button>
                      </li>
                      <li>
                        <button className="active" title="current page">
                          2
                        </button>
                      </li>
                      <li>
                        <button>3</button>
                      </li>
                      <li>
                        <button>4</button>
                      </li>
                      <li>
                        <button className="next" title="next page">
                          ❯
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ListingPost;
