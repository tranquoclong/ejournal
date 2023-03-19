import "./ArticleItem.css";
import ArticleItemTitle from "./ArticleItemTitle";
import ArticleItemThumbnail from "./ArticleItemThumbnail";
// import ArticleItemDesc from "./ArticleItemDesc";
// import ArticleItemCategories from "./ArticleItemCategories";
// import ArticleItemStats from "./ArticleItemStats";
import cls from "classnames";

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

  if (!post) {
    return null;
  }

  const title = post.title;
//   const id = post.id;
  const slugLink = `/post/${post.id}`;
  const thumbnail = `https://source.unsplash.com/random/?book,post,${post.id}`;

//   const authorId = post.id;
//   const authorName = post.id;
//   const authorAvatar = `https://source.unsplash.com/random/?book,post,${post.id}`;
//   const authorLink = `/user/${post.id}`;

  return (
    <article className={classes}>
      <div className="blog-post-image">
        <ArticleItemThumbnail
          title={title}
          slugLink={slugLink}
          thumbnail={thumbnail}
        />
      </div>

      <div
        className="post-content"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "end",
        }}
      >
        <div>
          <ArticleItemTitle title={title} slugLink={slugLink} />
        </div>
      </div>
    </article>
  );
}
