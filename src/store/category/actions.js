import { CategoryService } from "../../services/category";

export const ACT_FETCH_CATEGORIES = "ACT_FETCH_CATEGORIES";

export function actFetchCategories({ categories = [] } = {}) {
  return {
    type: ACT_FETCH_CATEGORIES,
    payload: {
      categories,
    },
  };
}

export function actFetchCategoriesAsync() {
  return async (dispatch) => {
    try {
      const response = await CategoryService.getListCategories({
        per_page: 100,
      });
      const categories = response.data;

      dispatch(
        actFetchCategories({
          categories,
        })
      );
    } catch (e) {}
  };
}
