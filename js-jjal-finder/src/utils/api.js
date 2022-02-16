import { API_URL } from "../common/constants.js";

const request = async ({ queryValue, options = {}, errorMessage = "default errorMessage !" }) => {
  const url = API_URL + queryValue;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${errorMessage} : ${(response.ok, response.status)}`);
  }

  return response.json();
};

export const getZzalData = (keyword) =>
  request({
    queryValue: keyword,
    errorMessage: "Network response was not ok, status code",
  });
