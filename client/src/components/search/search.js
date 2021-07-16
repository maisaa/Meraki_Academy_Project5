import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./search.css";
const Search = () => {
  const history = useHistory();
  const state = useSelector((state) => {
    return { Search: state.SearchReducer.Search };
  });
  console.log(state.Search);
  return (
    <div className="Search">
      <p className="p2">Search Results :</p>
      {!state.Search ? (
        <p className="p1">no search Results please insert what you want Search </p>
      ) : (
        state.Search.map((ele) => {
          console.log("ele", ele);
          return (
            <div
              className="ser"
              onClick={() => {
                history.push(`info/${ele.user_id}`);
              }}
            >
              <div className="p3">
                <img src={ele.image} />
                <div>
                  Name : {ele.firstName} {ele.lastName}
                  {ele.role_id === 4 ? <div>Type : Gym</div> : <div>Type : Couch</div>}
                </div>
              </div>
            </div>
          );
        })
      )}
      <hr></hr>
    </div>
  );
};

export default Search;
