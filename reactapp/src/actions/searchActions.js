import axios from "axios";
export const FETCH_MYPROJECT = "FETCH_MYPROJECT";
export const FETCH_MYPROJECT_SUCCESS = "FETCH_MYPROJECT_SUCCESS";
export const FETCH_MYPROJECT_ERROR = "FETCH_MYPROJECT_ERROR";

export const FETCH_MYREVIEWS = "FETCH_MYREVIEWS";
export const FETCH_MYREVIEWS_SUCCESS = "FETCH_MYREVIEWS_SUCCESS";
export const FETCH_MYREVIEWS_ERROR = "FETCH_MYREVIEWS_ERROR";

export const FETCH_SEARCH_RESULTS = "FETCH_SEARCH_RESULTS";
export const FETCH_SEARCH_RESULTS_SUCCESS = "FETCH_SEARCH_RESULTS_SUCCESS";
export const FETCH_SEARCH_RESULTS_ERROR = "FETCH_SEARCH_RESULTS_ERROR";

export const fetchMyProjects = () => {
  return dispatch => {
    dispatch({ type: FETCH_MYPROJECT });
    axios
      .get(
        (process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
          "/api/myProjects"
      )
      .then(response => {
        dispatch({ type: FETCH_MYPROJECT_SUCCESS, payload: response.data });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: FETCH_MYPROJECT_ERROR });
      });
  };
};

export const fetchMyReviews = () => {
  return dispatch => {
    dispatch({ type: FETCH_MYREVIEWS });
    axios
      .get(
        (process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
          "/api/reviewList"
      )
      .then(response => {
        dispatch({ type: FETCH_MYREVIEWS_SUCCESS, payload: response.data });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: FETCH_MYREVIEWS_ERROR });
      });
  };
};

export const fetchSearchResults = query => {
  return dispatch => {
    console.log("query: " + query);
    const url =
      (process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
      "/api/search?query=" +
      query;
    dispatch({ type: FETCH_SEARCH_RESULTS });
    axios
      .get(url)
      .then(response => {
        dispatch({
          type: FETCH_SEARCH_RESULTS_SUCCESS,
          payload: response.data
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: FETCH_SEARCH_RESULTS_ERROR });
      });
  };
};
