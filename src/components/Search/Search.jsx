import React, { useEffect } from "react";
import "./search.css";
import SearchSVG from "./svg/SearchSVG";

const Search = ({ searchName, keyword, setKeyword }) => {
  useEffect(() => {}, []);

  return (
    <div className="searchBar">
      <input
        className="searchBar"
        placeholder={searchName}
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
      />
      <button className="searchBar" onClick={() => console.log("search")}>
        <div className="searchSVG">
          <SearchSVG />
        </div>
      </button>
    </div>
  );
};

export default Search;
