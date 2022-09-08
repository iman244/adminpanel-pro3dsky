import React, { useEffect, useState } from "react";
import "./search.css";
import SearchSVG from "./svg/SearchSVG";

const Search = ({ searchName }) => {
    const [searchWord, setSearchWord] = useState("");

    useEffect(() => {
        console.log(searchWord);
    });

    return (
        <div className="searchBar">
            <input
                className="searchBar"
                placeholder="Search Users"
                value={searchWord}
                onChange={(event) => setSearchWord(event.target.value)}
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
