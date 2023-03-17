import { api } from '.';

export const CommentsService = {
  getPostFullText: ({ postId }) => {
    return api.call().post("/article/public/", { id: postId });
  },
  getPostFullTextFile: ({ postId }) => {
    return api.call().post("/article/public-file/", { id: postId });
  },
  getCommentsByPostId: ({
    postId,
    parentId = 0,
    per_page = 3,
    page = 1,
    // ...restParams
  }) => {
    return api.call().get("/wp/v2/comments", {
      params: {
        page,
        per_page: per_page,
        post: postId,
        parent: parentId,
        order: "asc", //
        // ...restParams
      },
    });
  },
  postComment: ({ userId, content, postId, parentId = 0 }) => {
    return api.callWithAuth().post("/wp/v2/comments", {
      author: userId,
      content: content,
      post: postId,
      parent: parentId,
    });
  },
};