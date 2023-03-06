// import PostComments from "./PostComments";
import PostDetailTags from "./PostDetailTags";
import { useSelector } from "react-redux";

function PostDetailContent() {
  // const slug = useSelector(state => state.Posts.currentPostSlug);
  const post = useSelector((state) => state.Post.postDetail);

  if (!post) {
    return <div>Post detail content</div>;
  }

  return (
    <div className="blog-detail-main">
      <div className="post_body">
        <div
          className="rte"
          dangerouslySetInnerHTML={{
            __html: post.summary,
          }}
        />
      </div>
      <PostDetailTags />
      {/* <PostComments /> */}
    </div>
  );
}

export default PostDetailContent;
