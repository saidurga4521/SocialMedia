export const LocalStorage = (token, key = "authToken") => {
  localStorage.setItem(key, JSON.stringify(token));
};
export const getAuthToken = (key = "authToken") => {
  return JSON.parse(localStorage.getItem(key)) || "";
};
