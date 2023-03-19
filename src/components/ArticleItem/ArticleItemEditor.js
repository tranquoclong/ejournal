import "./ArticleItem.css";
import React, { useEffect, useState } from "react";
// import ArticleItemInfor from "./ArticleItemInfor";
import ArticleItemTitle from "./ArticleItemTitle";
import ArticleItemThumbnail from "./ArticleItemThumbnail";
import ArticleItemDesc from "./ArticleItemDesc";
import ArticleItemCategories from "./ArticleItemCategories";
import ArticleItemStats from "./ArticleItemStats";
import cls from "classnames";
import axios from "axios";
export default function ArticleItemEditor({
  post,
  isStyleRow,
  isStyleCard,
  isShowDesc = false,
  isShowCategories = false,
  isShowCategoriesImg = false,
  isEditor,
}) {
  const classes = cls("blog-post_wrapper", {
    "blog-post_wrapper image-wrapper": isStyleRow,
    "blog-post_wrapper image-wrapper blog-wrapper-list": isStyleCard,
  });
  const [review, setReview] = useState(null);
  const baseURL = "http://localhost:5000/";
  useEffect(() => {
    const getAccountInfo = async () => {
     const response = await axios
       .create({
         baseURL,
         headers: {
           "Content-Type": "application/json",
         },
         withCredentials: true,
       })
       .post("review/view/all/", { articleid: post.id });
        setReview(response.data.list[0]);
    };
    getAccountInfo();
    // eslint-disable-next-line
  }, []);
  if (!post) {
    return null;
  }

  const title = post.title;
  const id = post.id;
  const slugLink = `/post/${post.id}`;
  const thumbnail = `https://source.unsplash.com/random/?book,post,${post.id}`;
  const shortDesc = post.status;
  const viewCount = post.status;
  const categoriesId = post.author;

  return (
    <article className={classes}>
      <div className="blog-post-image">
        <ArticleItemThumbnail
          title={title}
          slugLink={slugLink}
          thumbnail={thumbnail}
        />
        {isShowCategoriesImg && (
          <ArticleItemCategories categoriesId={categoriesId} />
        )}
      </div>

      {review && (
        <div className="post-content">
          Đánh giá
          <ArticleItemTitle title={review.content} />
        </div>
      )}
      <div
        className="post-content"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "end",
        }}
      >
        <ArticleItemStats viewCount={viewCount} id={id} isEditor={isEditor} />
        <div>
          <ArticleItemTitle title={title} slugLink="/dashboard/postListing" />
          {isShowDesc && <ArticleItemDesc shortDesc={shortDesc} />}
          {isShowCategories && (
            <ArticleItemCategories categoriesId={categoriesId} />
          )}
        </div>
      </div>
    </article>
  );
}

