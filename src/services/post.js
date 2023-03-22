import { api } from '.';
// import { defaultLocale } from '../i18n';

export const PostService = {
  getListPosts() {
    return api.call().get("/article/");
  },
  getUpdatePosts(id) {
    return api.call().get(`/article/manuscript/info?id=${id}`);
  },
  payAu(id) {
    return api.callWithAuth().post("/payment/submitpersonal/", {
      articleid: id,
      amount: "150000",
    });
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
  getPaymentAu() {
    return api.call().get("/payment/mypayment/");
  },
  getPaymentUni() {
    return api.call().get("/payment/unicorresponding/");
  },
  getPaymentUnis() {
    return api.call().get("/payment/universitypayment/");
  },
  getPayment() {
    return api.call().get("/payment/personalpayment/");
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
  deletePost(id) {
    return api.call().delete(`/article/manuscript/delete?id=${id}`);
  },
  postArticle(values) {
    return api.call().post("/article/submit-file/", values);
  },
  putArticle(values) {
    return api.call().put("article/manuscript/update/", values);
  },
  postAssignReview(id, roleId) {
    return api.callWithAuth().post("/review/assign/", {
      articleid: id.toString(),
      reviewerid: roleId,
    });
  },
};