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
      <div className="titleSearchStyle1">Search Results :</div>
      {!state.Search ? (
        <div className="noResultStyle1">no search Results please insert what you want Search </div>
      ) : (
        state.Search.map((ele) => {
          console.log("ele", ele);
          return (
            <div
              onClick={() => {
                history.push(`info/${ele.user_id}`);
              }}
            >
              <div className="p3">
                <img src={ele.image} />
                <div>
                   <span className="titleName123">{ele.firstName} {ele.lastName} </span>
                  {ele.role_id === 4 ? <div className="nameNameStyle1">Gym</div> : <div className="nameNameStyle1">Couch</div>}
                </div>
              </div>
              <div className="hrStyleSearch1"> </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Search;
