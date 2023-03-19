import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ArticleItemCategories from "../ArticleItem/ArticleItemCategories";

function PostDetailHead({ isShowCategories = false }) {
  const post = useSelector((state) => state.Post.postDetail);
  if (!post) {
    return <div></div>;
  }
  const thumbnails = `https://source.unsplash.com/random/?book,post,${post.id}`;
  const postTitle = post.title;
  const postAuthorName = post.author;
  const postCmtCount = post.status;
  const postViewCount = post.status;
  const categoriesId = post.author;
  const date = dayjs(new Date(post.date));
  const dateStr = date.format("DD/MM/YYYY");

  return (
    <div id="mt_banner" className="innerbanner">
      <div className="container-fluid">
        <div
          className="featured-image"
          style={{ backgroundImage: `url(${thumbnails})` }}
        />
        <div className="banner-caption">
          <div className="banner_caption_text">
            {isShowCategories && (
              <ArticleItemCategories categoriesId={categoriesId} />
            )}
            <h1>{postTitle}</h1>
            <div className="item-meta">
              <span style={{ paddingRight: "10px" }}>by</span>
              <a href="/">
                <strong>{postAuthorName[0]?.fullname}</strong>
              </a>
              {/* <p>{dateStr}</p> */}
              {/* <div style={{ display: "flex", alignItems: "baseline" }}>
                <p
                  className="item views"
                  style={{ paddingRight: "15px", margin: "0px" }}
                >
                  {postViewCount} <i className="icons ion-ios-eye" />
                </p>
                <p className="item comments">
                  {postCmtCount}100 <i className="icons ion-ios-chatbubble" />
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetailHead;
