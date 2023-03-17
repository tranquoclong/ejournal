export function validateAddPost(values) {
  let errors = {};
  if (!values.title) {
    errors.title = "title is required";
  }
  if (!values.openaccess) {
    errors.openaccess = "openaccess is required";
  }
  if (!values.summary) {
    errors.summary = "summary is required";
  }
  if (!values.majorid) {
    errors.majorid = "majorid is required";
  }
  return errors;
}
