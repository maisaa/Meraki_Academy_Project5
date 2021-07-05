import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Search = () => {
  const history = useHistory();
  const state = useSelector((state) => {
    return { Search: state.SearchReducer.Search };
  });
  return (
    <div className="App">
      Search Results :
      {!state.Search ? (
        <p>no search</p>
      ) : (
        state.Search.map((ele) => {
          return (
            <p
              onClick={() => {
                history.push(`info/${ele.user_id}`);
              }}
            >
              {ele.firstName}
            </p>
          );
        })
      )}
    </div>
  );
};

export default Search;
