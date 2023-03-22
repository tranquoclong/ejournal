import { PostService } from "../../services/post";
import { actFetchCommentsAsync, actFetchFullTextAsync, actFetchFullTextFileAsync } from "../comments/actions";

export const ACT_FETCH_LATEST_POSTS = "ACT_FETCH_LATEST_POSTS";
export const ACT_FETCH_POPULAR_POSTS = "ACT_FETCH_POPULAR_POSTS";
export const ACT_FETCH_POSTS = "ACT_FETCH_POSTS";
export const ACT_FETCH_MANUS = "ACT_FETCH_MANUS";
export const UPDATE_POST = "UPDATE_POST";
export const ACT_UPDATE_POST = "ACT_UPDATE_POST";
export const ACT_FETCH_PAYMENT = "ACT_FETCH_PAYMENT";
export const ACT_FETCH_PAYMENTAU = "ACT_FETCH_PAYMENTAU";
export const ACT_FETCH_PAYMENTUNI = "ACT_FETCH_PAYMENTUNI";
export const ACT_FETCH_PAYMENTUNIS = "ACT_FETCH_PAYMENTUNIS";
export const ACT_FETCH_AUTHOR_POSTS = "ACT_FETCH_AUTHOR_POSTS";
export const ACT_FETCH_AUTHOR_MANUS = "ACT_FETCH_AUTHOR_MANUS";
export const ACT_FETCH_POSTS_SEARCH = "ACT_FETCh_POSTS_SEARCH";
export const ACT_FETCH_POST_DETAIL = "ACT_FETCH_POST_DETAIL";
export const ACT_FETCH_RELATED_AUTHOR_POST = "ACT_FETCH_RELATED_AUTHOR_POST";
export const ACT_RESET_DATA_DETAIL = "ACT_RESET_DATA_DETAIL";
export const ACT_SET_LOADING_STATUS = "ACT_SET_LOADING_STATUS";

export function actSetLoadingStatus({ status }) {
  return {
    type: ACT_SET_LOADING_STATUS,
    payload: {
      status,
    },
  };
}
export function actResetDataDetail() {
  return {
    type: ACT_RESET_DATA_DETAIL,
  };
}
export function actFetchLatestPosts({ posts = [] } = {}) {
  return {
    type: ACT_FETCH_LATEST_POSTS,
    payload: {
      posts,
    },
  };
}
export function actFetchPopularPosts({ posts = [] } = {}) {
  return {
    type: ACT_FETCH_POPULAR_POSTS,
    payload: {
      posts,
    },
  };
}
export function actFetchPosts(posts) {
  return {
    type: ACT_FETCH_POSTS,
    payload: posts,
  };
}
export function actFetchUpdatePosts(posts) {
  return {
    type: UPDATE_POST,
    payload: posts,
  };
}
export function actFetchAuthorPosts(authorPosts) {
  return {
    type: ACT_FETCH_AUTHOR_POSTS,
    payload: authorPosts,
  };
}
export function actFetchManus(manuscript) {
  return {
    type: ACT_FETCH_MANUS,
    payload: manuscript,
  };
}
export function actFetchPayment(manuscript) {
  return {
    type: ACT_FETCH_PAYMENT,
    payload: manuscript,
  };
}
export function actFetchPaymentAu(manuscript) {
  return {
    type: ACT_FETCH_PAYMENTAU,
    payload: manuscript,
  };
}
export function actFetchPaymentUni(manuscript) {
  return {
    type: ACT_FETCH_PAYMENTUNI,
    payload: manuscript,
  };
}
export function actFetchPaymentUnis(manuscript) {
  return {
    type: ACT_FETCH_PAYMENTUNIS,
    payload: manuscript,
  };
}
export function actFetchAuthorManus(authorManuscript) {
  return {
    type: ACT_FETCH_AUTHOR_MANUS,
    payload: authorManuscript,
  };
}
export function actFetchPostsSearch({
  posts = [],
  page = 1,
  per_page = 3,
  totalPages = 1,
  totalElement = 0,
} = {}) {
  return {
    type: ACT_FETCH_POSTS_SEARCH,
    payload: {
      posts,
      page,
      per_page,
      totalPages,
      totalElement,
    },
  };
}
export function actFetchPostDetail({ post }) {
  return {
    type: ACT_FETCH_POST_DETAIL,
    payload: { post },
  };
}
export function actFetchRelatedAuthorPost({ posts }) {
  return {
    type: ACT_FETCH_RELATED_AUTHOR_POST,
    payload: { posts },
  };
}

export const actFetchLatestPostsAsync = () => {
  return async (dispatch, getState) => {
    try {
      const rootState = getState();
      const lang = rootState.App.lang;
      dispatch(actSetLoadingStatus({ status: "loading" }));
      const response = await PostService.getLatestPosts({ lang });
      const posts = response.data;

      dispatch(
        actFetchLatestPosts({
          posts,
        })
      );
      dispatch(actSetLoadingStatus({ status: "success" }));
    } catch (e) {
      dispatch(actSetLoadingStatus({ status: "error" }));
    }
  };
};
export const actFetchPopularPostsAsync = () => {
  return async (dispatch) => {
    try {
      const response = await PostService.getPopularPosts();
      const posts = response.data;

      dispatch(
        actFetchPopularPosts({
          posts,
        })
      );
    } catch (e) {}
  };
};
export const actFetchPostsAsync = () => {
  return async (dispatch) => {
    try {
      const response = await PostService.getListPosts();
      dispatch(actFetchPosts(response.data.list));
    } catch (e) {}
  };
};
export const actFetchUpdatePostsAsync = (id, history) => {
  return async (dispatch) => {
    try {
      const response = await PostService.getUpdatePosts(id);
      dispatch(actFetchUpdatePosts(response.data.article[0], history));
      history.push("/dashboard/addPost");
    } catch (e) {}
  };
};
export const actFetchPayAuAsync = (id) => {
  return async (dispatch) => {
    try {
       await PostService.payAu(id);
       return {
         ok: true,
       };
    } catch (e) {
      return {
        ok: false,
      };
    }
  };
};
export const actFetchAuthorPostsAsync = () => {
  return async (dispatch) => {
    try {
      const response = await PostService.getListAuthorPosts();
      dispatch(actFetchAuthorPosts(response.data.list));
    } catch (e) {}
  };
};
export const actFetchManusAsync = () => {
  return async (dispatch) => {
    try {
      const response = await PostService.getListManus();
      dispatch(actFetchManus(response.data.list));
    } catch (e) {}
  };
};
export const actFetchPaymentsAsync = () => {
  return async (dispatch) => {
    try {
      const response = await PostService.getPayment();
      dispatch(actFetchPayment(response.data.list));
    } catch (e) {}
  };
};
export const actFetchPaymentAuAsync = () => {
  return async (dispatch) => {
    try {
      const response = await PostService.getPaymentAu();
      dispatch(actFetchPaymentAu(response.data.list));
    } catch (e) {}
  };
};
export const actFetchPaymentUniAsync = () => {
  return async (dispatch) => {
    try {
      const response = await PostService.getPaymentUni();
      dispatch(actFetchPaymentUni(response.data.id ? response.data : null));
    } catch (e) {}
  };
};
export const actFetchPaymentUnisAsync = () => {
  return async (dispatch) => {
    try {
      const response = await PostService.getPaymentUnis();
      dispatch(actFetchPaymentUnis(response.data.list));
    } catch (e) {}
  };
};
export const actFetchAuthorManusAsync = () => {
  return async (dispatch) => {
    try {
      const response = await PostService.getListAuthorManus();
      dispatch(actFetchAuthorManus(response.data.list));
    } catch (e) {}
  };
};
export const actFetchPostsSearchAsync = ({
  page = 1,
  per_page = 2,
  ...extraSearchParams
} = {}) => {
  return async (dispatch) => {
    try {
      const response = await PostService.getListPosts({
        page,
        per_page,
        ...extraSearchParams,
      });
      const headers = response.headers;
      const totalElement = Number(headers["x-wp-total"]);
      const totalPages = Number(headers["x-wp-totalpages"]);
      const posts = response.data;

      dispatch(
        actFetchPostsSearch({
          posts,
          page,
          per_page,
          totalPages,
          totalElement,
        })
      );
    } catch (e) {}
  };
};

export function actFetchPostDetailAsync(slug) {
  return async (dispatch) => {
    try {
      const response = await PostService.getPostBySlug(slug);
      const post = response.data.article[0];
      if (!post) {
        throw new Error("No post");
      }
      const postId = post.id;
      const userId = post.author;

      dispatch(
        actFetchRelatedAuthorPostAsync({
          author: userId,
          exclude: [postId],
        })
      );
      dispatch(actFetchCommentsAsync({ postId }));
      dispatch(actFetchFullTextAsync({ postId }));
      dispatch(actFetchFullTextFileAsync({ postId }));
      dispatch(actFetchPostDetail({ post }));
      return {
        ok: true,
        post,
      };
    } catch (e) {
      return {
        ok: false,
        error: e,
      };
    }
  };
}

export function actFetchRelatedAuthorPostAsync({ author, exclude }) {
  return async function (dispatch) {
    try {
      const response = await PostService.getRelatedPostByAuthor(
        author,
        exclude
      );
      const posts = response.data;
      dispatch(actFetchRelatedAuthorPost({ posts }));
    } catch (e) {}
  };
}

export function actUpdateStatusPostAsync(path, id, manuscript) {
  return async (dispatch) => {
    try {
     await PostService.updateStatusPost(path, id);
     const response = manuscript.filter(m => m.id !== id);
      dispatch(actFetchManus(response));
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
      };
    }
  };
}
export function actDeletePostAsync( id) {
  return async (dispatch) => {
    try {
      await PostService.deletePost(id);
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
      };
    }
  };
}
export function actAssignReviewAsync(id, roleId, manuscript) {
  return async (dispatch) => {
    try {
      await PostService.postAssignReview(id, roleId);
      const index = manuscript.findIndex((m) => m.id === id);
      manuscript[index] = { ...manuscript[index], ...{ status: "PENDING" } };
      dispatch(actFetchManus([...manuscript]));
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
      };
    }
  };
}

export function actPostArticleAsync(values) {
  return async (dispatch) => {
    try {
      await PostService.postArticle(values);
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
      };
    }
  };
}
export function actPutArticleAsync(values) {
  return async (dispatch) => {
    try {
      await PostService.putArticle(values);
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
      };
    }
  };
}