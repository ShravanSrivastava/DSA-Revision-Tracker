import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getUserProfile = () => API.get("/auth/profile");
export const updateUserProfile = (data) => API.put("/auth/profile", data);

export const getQuestions = () => API.get("/questions");
export const addQuestion = (data) => API.post("/questions", data);
export const deleteQuestion = (id) => API.delete(`/questions/${id}`);
export const markRevision = (questionId, revisionId) =>
  API.patch(`/questions/${questionId}/revisions/${revisionId}`);
export const getTodayRevisions = () => API.get("/questions/today");
