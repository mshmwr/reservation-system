import { getUser, deleteUser } from "../apis/usersApi";

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

const checkLoggedIn = async (setIsLoggedIn) => {
  const parsedData = await getUser();
  // console.log(parsedData);

  // setIsLoggedIn(true);
  // return;
  if (parsedData.status === "ok") {
    setIsLoggedIn(true);
  }
  setIsLoggedIn(false);
};

export { requestParameters, checkLoggedIn };
