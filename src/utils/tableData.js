import { redirect } from "react-router-dom";

export function tableData() {
  const token = localStorage.getItem("token");
  const expirationTime = localStorage.getItem("expirationTime");
  if (!expirationTime || new Date(expirationTime) <= new Date() || !token) {
    localStorage.clear();
    return redirect("/auth");
  }
  return null;
}
