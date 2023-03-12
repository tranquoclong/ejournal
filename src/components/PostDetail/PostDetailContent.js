// import PostComments from "./PostComments";
import PostDetailTags from "./PostDetailTags";
import { useSelector } from "react-redux";
import { useState } from "react";

function PostDetailContent() {
  // const slug = useSelector(state => state.Posts.currentPostSlug);
  const post = useSelector((state) => state.Post.postDetail);
  const fullText = useSelector((state) => state.Comments.fullText);
  const [state, SetState] = useState(false);
  if (!post) {
    return <div>Post detail content</div>;
  }

  return (
    <div className="blog-detail-main">
      <div className="post_body">
        <div
          className="rte"
          dangerouslySetInnerHTML={{
            __html: state ? fullText.content : post.summary,
          }}
        />
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        {!state && (
          <>
            {post.openaccess ? (
              <button
                style={{
                  background: "linear-gradient(144deg, #555, #666 50%, #777)",
                  padding: "10px",
                  borderRadius: "10px",
                }}
                onClick={() => SetState(true)}
              >
                Đọc tất cả
              </button>
            ) : (
              <button
                style={{
                  background: "linear-gradient(144deg, #555, #666 50%, #777)",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                trả phí để Đọc tất cả
              </button>
            )}
          </>
        )}
      </div>
      <PostDetailTags />
      {/* <PostComments /> */}
    </div>
  );
}

export default PostDetailContent;
