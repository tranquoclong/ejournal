import axios from "axios";

const baseURL = "http://localhost:5000/";

export const api = {
  call: () => {
    return axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  callWithAuth: () => {
    return axios.create({
      baseURL,
      // headers: {
      //   Authorization: `Bearer ` + localStorage.getItem("access_token"),
      // },
    });
  },
};

  //  headers: {
  //       Cookie:
  //         "connect.sid=s%3A9p8zP8fM2QzBHBCdHNVLgF-GBRfwBPk-.sk%2FDmx7CXs9dZVFT8QYwlyexHuYcd0ssFJ1to18zXs0",
  //     }