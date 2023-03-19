import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid4 } from "uuid";
import { storage } from "../configs/firebase.configs";

export const storePdfToFireBase = async (uploadedPdf) => {
  if (uploadedPdf === null) {
    return {
      isSuccess: false,
      pdfUrl: "",
      message: "Upload PDF failed",
    };
  }
  const pdfRef = ref(storage, `PDF/${uploadedPdf.name}${uuid4()}`);
  try {
    const response = await uploadBytes(pdfRef, uploadedPdf);
    const url = await getDownloadURL(response.ref);

    return {
      isSuccess: true,
      pdfNameFile:uploadedPdf.name,
      pdfUrl: url,
      message: "Upload PDF successfully",
    };
  } catch (ex) {
    return {
      isSuccess: false,
      pdfNameFile: "",
      pdfUrl: "",
      message: "Upload PDF failed",
    };
  }
};
