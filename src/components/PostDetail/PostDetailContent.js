// import PostComments from "./PostComments";
// import PostDetailTags from "./PostDetailTags";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { Document, Page } from "react-pdf";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// import { getDownloadURL, ref } from "firebase/storage";
// import { storage } from "../../configs/firebase.configs";
import { pdfjs } from "react-pdf";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { PayPalButton } from "react-paypal-button-v2/lib";
import { actPaymentAsync } from "../../store/user/actions";
// import axios from "axios";
// import { useIsLogin } from "../../hooks/useIsLogin";
function PostDetailContent() {
   const dispatch = useDispatch();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const post = useSelector((state) => state.Post.postDetail);
  console.log(post);
  // const fullText = useSelector((state) => state.Comments.fullText);
  const fullTextFile = useSelector((state) => state.Comments.fullTextFile);
  const [state, SetState] = useState(false);
  const baseURL = "http://localhost:5000/";
  const [fullText, setFullText] = useState(null);
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
        .post("article/public/", { id: post.id });
      setFullText(response.data[0]);
    };
    post && getAccountInfo();
    // eslint-disable-next-line
  }, []);
    const clientId =
      "AaD6Jk0vH-3xv3Znlq4ztjADzIHzaHABruRk8dCmnwbHB34rvJx7W-GUesEdMeX9kqSzXaaqnrEc3VGs";
    const onSuccess = (details, data) => {
      console.log(details);
      if (details.status === "COMPLETED") {
        dispatch(actPaymentAsync(post.id)).then((res) => {
          if (res.ok) {
            SetState(true);
            NotificationManager.success("thành công");
          } else {
            NotificationManager.error("thất bại");
          }
        });
      } else {
        alert("fail");
      }
    };
  if (!post) {
    return <div>Post detail content</div>;
  }
  return (
    <div className="blog-detail-main">
      <div className="post_body">
        <div
          className="rte"
          dangerouslySetInnerHTML={{
            __html: state ? fullTextFile.content : post.summary,
          }}
        />
        {state && (
          <>
            {fullTextFile.doc && (
              <Worker
                workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}
              >
                <Viewer
                  fileUrl={fullTextFile.doc}
                  plugins={[defaultLayoutPluginInstance]}
                />
              </Worker>
            )}
          </>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {!state && (
          <>
            {!fullText ? (
              <PayPalButton
                shippingPreference="NO_SHIPPING"
                amount="1500"
                options={{
                  clientId,
                }}
                onSuccess={(details, data) => {
                  onSuccess(details, data);
                }}
              />
            ) : (
              <>
                {fullTextFile && (
                  <button
                    style={{
                      background:
                        "linear-gradient(144deg, #555, #666 50%, #777)",
                      padding: "10px",
                      borderRadius: "10px",
                    }}
                    onClick={() => SetState(true)}
                  >
                    Đọc tất cả
                  </button>
                )}
              </>
            )}
          </>
        )}
      </div>
      {/* <PostDetailTags /> */}
      {/* <PostComments /> */}
    </div>
  );
}

export default PostDetailContent;
