import axios from "axios";

import { createContext, useReducer } from "react";
import userReducer from "./GithubReducer";
const UserContext = createContext();

const github = axios.create({
  baseURL: `https://api.github.com`,
  headers: {
    Authorization: `token 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`,
  },
});

export const UserProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    isLoading: false,
  };

  // Clearing Users
  const clearUsers = () => {
    dispatch({
      type: "CLEAR_USERS",
    });
  };

  // Set isLoading
  const setIsLoading = () =>
    dispatch({
      type: "SET_LOADING",
    });

  const [state, dispatch] = useReducer(userReducer, initialState);

  // get Users
  const searchUsers = async (text) => {
    setIsLoading();
    const params = new URLSearchParams({
      q: text,
    });
    const response = await github.get(`/search/users?${params}`);

    const { items } = response.data;
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  // Get Single user
  const searchUser = async (userName) => {
    setIsLoading();
    const response = await fetch(`https://api.github.com/users/${userName}`, {
      method: "GET",
      headers: {
        Authorization: `token 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`,
      },
    });
    if (response.status === 404) {
      window.location = "/notfound";
    }
    const item = await response.json();
    dispatch({
      type: "GET_USER",
      payload: item,
    });
  };

  // get Repos
  const getRepo = async (userName) => {
    setIsLoading();
    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });
    const response = await fetch(
      `https://api.github.com/users/${userName}/repos?${params}`,
      {
        method: "GET",
        headers: {
          Authorization: `token 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`,
        },
      }
    );
    if (response.status === 404) {
      window.location = "/notfound";
    }
    const repos = await response.json();
    dispatch({
      type: "GET_REPOS",
      payload: repos,
    });
  };

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        isLoading: state.isLoading,
        user: state.user,
        repos: state.repos,
        searchUsers,
        searchUser,
        clearUsers,
        getRepo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;
