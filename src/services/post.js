import { api } from '.';
// import { defaultLocale } from '../i18n';

export const PostService = {
  getListPosts() {
    return api.call().get("/article/");
  },
  getListAuthorPosts() {
    return api.call().get("/author/article/");
  },
  getPostBySlug(slug) {
    return api.call().post("/article/info", { id: slug });
  },
  getListManus() {
    return api.call().get("/editor/manuscript/");
  },
  getListAuthorManus() {
    return api.call().get("/author/manuscript/");
  },
  getLatestPosts({ lang }) {
    return PostService.getListPosts({ lang });
  },
  getPopularPosts() {
    return PostService.getListPosts({
      orderby: "post_views",
    });
  },
  getRelatedPostByAuthor: (authorId, exclude = []) => {
    return PostService.getListPosts({
      author: authorId,
      exclude,
    });
  },
  updateStatusPost(path, id) {
    return api.call().put(`/editor/${path}/`, { id });
  },
  postArticle(values) {
    return api.call().post("article/submit-file/", values);
  },
  postAssignReview(id, roleId) {
    return api.callWithAuth().post("/review/assign/", {
      articleid: id.toString(),
      reviewerid: roleId,
    });
  },
};