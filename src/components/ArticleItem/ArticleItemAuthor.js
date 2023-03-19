import React, { useEffect, useState } from "react";
import "./ArticleItem.css";
import ArticleItemTitle from "./ArticleItemTitle";
import ArticleItemThumbnail from "./ArticleItemThumbnail";
// import ArticleItemDesc from "./ArticleItemDesc";
// import ArticleItemCategories from "./ArticleItemCategories";
// import ArticleItemStats from "./ArticleItemStats";
import cls from "classnames";
import axios from "axios";

export default function ArticleItemAuthor({
  post,
  isStyleRow,
  isStyleCard,
  //   isShowDesc = false,
  //   isShowCategories = false,
  //   isShowCategoriesImg = false,
  //   isEditor,
}) {
  const classes = cls("blog-post_wrapper", {
    "blog-post_wrapper image-wrapper": isStyleRow,
    "blog-post_wrapper image-wrapper blog-wrapper-list": isStyleCard,
  });

  const title = post.title;
  const slugLink = `/post/${post.id}`;
  const thumbnail = `https://source.unsplash.com/random/?book,post,${post.id}`;
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
  return (
    <article className={classes}>
      <div className="blog-post-image">
        <ArticleItemThumbnail
          title={title}
          slugLink={slugLink}
          thumbnail={thumbnail}
        />
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
        <ArticleItemTitle title={title} slugLink={slugLink} />
      </div>
    </article>
  );
}
