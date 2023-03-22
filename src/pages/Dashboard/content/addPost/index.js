import React, { useEffect, useRef, useState } from "react";
import useForm from "../../../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { validateAddPost } from "../../../../components/Validate/validateInput";
import { NotificationManager } from "react-notifications";
import { actFetchUpdatePosts, actPostArticleAsync, actPutArticleAsync } from "../../../../store/post/actions";
import { useIsLogin } from "../../../../hooks/useIsLogin";
//import { actGetAllMajor } from "../../../../store/user/actions";
// import { useDetectOutsideClick } from "../../../../hooks/useOutsideClick";
import htmlToDraft from "html-to-draftjs";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw,ContentState ,EditorState} from "draft-js";
import draftToHtml from "draftjs-to-html";
import "../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./addPost.css"
import { storePdfToFireBase } from "../../../../utils/storePdfToFirebase.";
import axios from "axios";
// import { PayPalButton } from 'react-paypal-button-v2/lib';
function AddPost() {
  const dispatch = useDispatch();
  const { currentUser } = useIsLogin();
  const dropdownRef = useRef(null);
  const [authorlist, setAuthorlist] = useState([
      {
        fullname: currentUser.fullname,
        email: currentUser.email,
        iscorresponding: true,
      },
    ]);
  const [author, setAuthor] = useState({
    fullname: "",
    email: "",
    iscorresponding: false,
  });
 const infoUpdate = useSelector((state) => state.Post.infoUpdate);
  const [pdfFront, setPdfFront] = useState({ pdfUrl:null, pdfNameFile:null });
  const [selectedFile, setSelectedFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const [checkUpdate, setCheckUpdate] = useState(false);
  const [editorState, setEditorState] = useState();
    const onEditorStateChange = (state) => {  
      setEditorState(state);
      setContent(draftToHtml(convertToRaw(state.getCurrentContent())));
    };
  const [isActive, setIsActive] = useState( false);
  const onClick = () => setIsActive(!isActive);
  const { values, errors, setValues, handleChange, handleSubmit } = useForm(
    login,
    validateAddPost
  );
    useEffect(() => {
      if (infoUpdate !== null) {
        setValues(infoUpdate);
        setAuthorlist(infoUpdate.author);
        infoUpdate.doc && setPdfFront({ pdfUrl: infoUpdate.doc, pdfNameFile:"update File PDF" });
        if (infoUpdate.content !== null) {
          const blocksFromHtml = htmlToDraft(infoUpdate?.content);
          const { contentBlocks, entityMap } = blocksFromHtml;
          const contentState = ContentState.createFromBlockArray(
            contentBlocks,
            entityMap
          );
          const editorState = EditorState.createWithContent(contentState);
          setEditorState(editorState);
        }
        setCheckUpdate(true);
      }
      // eslint-disable-next-line
    }, [infoUpdate]);
    const [error, setError] = useState("");
   const validateAuthor = () => {
     let isValid = true;
     if (!/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/.test(author.email)) {
       setError("Định dạng email không đúng");
       isValid = false;
     }
     return isValid;
   };
     const onAdd = () => {
       if (validateAuthor()) {
         setAuthorlist([...[author], ...authorlist]);
         setAuthor({
           fullname: "",
           email: "",
           iscorresponding: false,
         });
          setError("");
       }
     };
  const baseURL = "http://localhost:5000/";
  const [allMajor, setAllMajor] = useState(null);
    useEffect(() => {
      const getAccountInfo = async () => {
        const response = await axios
          .create({
            baseURL,
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          })
          .get("article/submit/major",);
        setAllMajor(response.data.list);
      };
      getAccountInfo();
      // eslint-disable-next-line
    }, []);
  function login() {
    values.openaccess = values.openaccess === "true";
    dispatch(
      checkUpdate
        ? actPutArticleAsync({
            ...values,
            doc: pdfFront.pdfUrl ? pdfFront.pdfUrl : "",
            content,
            authorlist,
          })
        : actPostArticleAsync({
            ...values,
            doc: pdfFront.pdfUrl ? pdfFront.pdfUrl : "",
            content,
            authorlist,
          })
    ).then((res) => {
      if (res.ok) {
        setContent("");
        setEditorState("");
        setPdfFront(null);
        setCheckUpdate(false);
        dispatch(actFetchUpdatePosts(null));
        NotificationManager.success("thành công");
      } else {
        NotificationManager.error("thất bại");
      }
    });
  }
  function handleChanges(key) {
    return (evt) => {
      setAuthor({
        ...author,
        [key]: evt.target.value,
      });
    };
  }

  useEffect(
    () => {
      const uploadPdf = async () => {
        setIsLoading(true);
        if (!selectedFile) {
          setIsLoading(false);
          return;
        }
        const { isSuccess, pdfNameFile, pdfUrl, message } =
          await storePdfToFireBase(selectedFile);
        if (isSuccess) {
          setPdfFront({ pdfUrl, pdfNameFile });
          setIsLoading(false);
          return pdfUrl;
        } else {
          console.log(message);
        }
        setIsLoading(false);
      };
      uploadPdf();
    },
    // eslint-disable-next-line
    [selectedFile]
  );
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };
  return (
    <div className="dashboard-content">
      <div className="row">
        <div className="col-lg-12 col-sm-12">
          <form id="add-listing" onSubmit={handleSubmit} noValidate>
            <div className="add-listing-section">
              <div className="add-listing-headline">
                <h3>
                  <i className="sl sl-icon-map" /> Bài viết
                </h3>
              </div>
              <div className="submit-section">
                <div className="row with-forms">
                  <div className="col-md-6" style={{ color: "lightcoral" }}>
                    <label>Tên bài viết</label>
                    {errors.title ? ` * ${errors.title}` : ""}
                    <input
                      type="text"
                      name="title"
                      placeholder="tên bài viết ..."
                      onChange={handleChange}
                      value={values.title || ""}
                      required
                    />
                  </div>
                  <div className="col-md-6" style={{ color: "lightcoral" }}>
                    <label>Truy cập</label>
                    {errors.openaccess ? ` * ${errors.openaccess}` : ""}
                    <select
                      className="chosen-select-no-single"
                      style={{
                        background: "rgb(53, 54, 58)",
                        color: "#ddd",
                      }}
                      name="openaccess"
                      onChange={handleChange}
                      value={values.openaccess || ""}
                      required
                    >
                      <option>chọn quyền truy cập</option>
                      <option value={"false"}>Hạn Chế</option>
                      <option value={"true"}>Công Khai</option>
                    </select>
                  </div>
                  <div className="col-md-6" style={{ color: "lightcoral" }}>
                    <label>Tóm tắt</label>
                    {errors.summary ? ` * ${errors.summary}` : ""}
                    <input
                      type="text"
                      name="summary"
                      placeholder="tóm tắt ..."
                      onChange={handleChange}
                      value={values.summary || ""}
                      required
                    />
                  </div>
                  <div className="col-md-6" style={{ color: "lightcoral" }}>
                    <label>Ngành học</label>
                    {errors.majorid ? ` * ${errors.majorid}` : ""}
                    <select
                      className="chosen-select-no-single"
                      style={{
                        background: "rgb(53, 54, 58)",
                        color: "#ddd",
                      }}
                      name="majorid"
                      onChange={handleChange}
                      value={values.majorid || ""}
                      required
                    >
                      <option>chọn ngành học </option>
                      {allMajor &&
                        allMajor.map((major, index) => (
                          <option value={major.id} key={index}>
                            {major.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-md-6" style={{ color: "lightcoral" }}>
                    <label>Thêm tác giả</label>
                    <div
                      ref={dropdownRef}
                      className={`dropdown ${isActive && "open"}`}
                      style={{
                        borderRadius: "10px",
                        padding: "10px 25px",
                        border: "2px solid #666",
                        height: "42px",
                      }}
                      onClick={onClick}
                    ></div>
                    <div
                      ref={dropdownRef}
                      className={`dropdown ${isActive && "open"}`}
                    >
                      <div
                        className="dropdown-menu"
                        style={{
                          width: "100%",
                          maxWidth: "inherit",
                        }}
                      >
                        <div
                          className="row with-forms"
                          style={{
                            padding: "0 20px",
                          }}
                        >
                          <div
                            className="col-md-6"
                            style={{ color: "lightcoral" }}
                          >
                            <label>Tên</label>
                            <input
                              type="text"
                              name="fullname"
                              placeholder="fullname ..."
                              onChange={handleChanges("fullname")}
                              value={author.fullname}
                            />
                          </div>
                          <div
                            className="col-md-6"
                            style={{ color: "lightcoral" }}
                          >
                            <label>Email</label>

                            <input
                              type="text"
                              name="email"
                              placeholder="email ..."
                              onChange={handleChanges("email")}
                              value={author.email}
                            />
                          </div>
                        </div>
                        <div
                          className="row with-forms"
                          style={{
                            padding: "0 20px",
                          }}
                        >
                          <div
                            className="col-md-6"
                            style={{ color: "lightcoral" }}
                          >
                            <button
                              type="button"
                              className="button preview"
                              onClick={onAdd}
                            >
                              Thêm tác giả
                            </button>
                          </div>
                          {error}
                          {/* <div
                            className="col-md-6"
                            style={{ color: "lightcoral" }}
                          >
                            <label>Được chỉnh sửa</label>
                            <select
                              className="chosen-select-no-single"
                              style={{
                                background: "rgb(53, 54, 58)",
                                color: "#ddd",
                              }}
                              name="iscorresponding"
                              onChange={handleChanges("iscorresponding")}
                              value={author.iscorresponding}
                            >
                              <option value={true}>có</option>
                              <option value={false}>không</option>
                            </select>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6" style={{ color: "lightcoral" }}>
                    <label>Tác giả hổ trợ</label>
                    <br />
                    {authorlist.map((u, i) => (
                      <label key={i} style={{ marginRight: "10px" }}>
                        {u.email} |
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="form" style={{ color: "lightcoral" }}>
                <label>Nội dung</label>
                {isLoading ? (
                  <div>
                    <button
                      type="button"
                      disabled
                      style={{
                        opacity: ".4",
                      }}
                      className="button preview"
                    >
                      loading..
                    </button>
                  </div>
                ) : (
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <button type="button" className="button preview">
                      Choose PDF
                    </button>
                    <input
                      type="file"
                      name="profileImageUrl"
                      accept="application/pdf"
                      onChange={onSelectFile}
                      id="upload"
                      className="btn"
                      style={{
                        opacity: 0,
                        zIndex: 1,
                        top: 0,
                        position: "absolute",
                      }}
                    />
                    {pdfFront && <label>{pdfFront.pdfNameFile}</label>}
                  </div>
                )}
                {errors.content ? ` * ${errors.content}` : ""}
                <Editor
                  editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={onEditorStateChange}
                  toolbar={{
                    options: [
                      "inline",
                      "blockType",
                      "fontSize",
                      "fontFamily",
                      "list",
                      "textAlign",
                      "colorPicker",
                      "emoji",
                      "remove",
                      "history",
                    ],
                  }}
                />
                {/* <textarea
                  className="WYSIWYG"
                  name="content"
                  placeholder="nội dung ..."
                  onChange={handleChange}
                  value={values.content || ""}
                  required
                  style={{ marginBottom: "0px", color: "#fff" }}
                /> */}
              </div>
            </div>
            <button className="button preview" style={{ height: "50px" }}>
              {checkUpdate ? "Chỉnh sửa bài viết" : "Đăng Bài Viết"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
