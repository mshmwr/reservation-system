import { getUser } from "../apis/usersApi";

const requestParameters = {
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "user-agent": "Mozilla/4.0 MDN Example",
    "content-type": "application/json",
  },
  mode: "cors",
  redirect: "follow",
  referrer: "no-referrer",
};

const checkLoggedIn = async () => {
  const parsedData = await getUser();
  // console.log(parsedData);
  return true;
  if (parsedData.status === "ok") {
    return true;
  }
  return false;
};

export { requestParameters, checkLoggedIn };
