import React, {useReducer} from 'react';
import axios from 'axios';
import {GithubContext} from "./GithubContext";
import {GithubReducer} from "./GithubReducer";
import {CLEAR_USERS, GET_REPOS, GET_USER, SEARCH_USERS, SET_LOADING} from "../types";

const CLIENT_ID = location.hostname === 'localhost' ? process.env.REACT_APP_CLIENT_ID : 'c1ba2323943800484b1b';
const CLIENT_SECRET = location.hostname === 'localhost' ? process.env.REACT_APP_CLIENT_SECRET : '86f3b9280e747f73d3c4d3de45ca4262efbee505';
const withCreds = url => {
  return `${url}client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
};

export const GithubState = ({children}) => {
  const initialState = {
    user: {},
    users: [],
    loading: false,
    repos: []
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);
  const search = async value => {
    setLoading();

    const res = await axios.get(
      withCreds(`https://api.github.com/search/users?q=${value}&`)
    );

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    })
  };

  const getUser = async name => {
    setLoading();

    const res = await axios.get(
      withCreds(`https://api.github.com/users/${name}?`)
    );

    dispatch({
      type: GET_USER,
      payload: res.data
    })
  };

  const getRepos = async name => {
    setLoading();

    const res = await axios.get(
      withCreds(`https://api.github.com/users/${name}/repos?per_page=5&`)
    );

    dispatch({
      type: GET_REPOS,
      payload: res.data
    })
  };

  const clearUsers = () => {
    dispatch({type: CLEAR_USERS})
  };

  const setLoading = () => {
    dispatch({type: SET_LOADING})
  };

  const {user, users, repos, loading} = state;

  return (
    <GithubContext.Provider value={{
      setLoading, search, getRepos, getUser, clearUsers, user, users, repos, loading
    }}>
      {children}
    </GithubContext.Provider>
  )
};