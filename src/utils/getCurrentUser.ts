import jwtDecode from "jwt-decode";
export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return jwtDecode(token);
  }
};
