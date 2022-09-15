import React, { useContext, useEffect, useState } from "react";
import "./designs.css";
import "./paginate.css";
import ProFreeButtons from "./components/ProFreeButtons/ProFreeButtons";
import Card from "./components/Card/Card";
import ReactPaginate from "react-paginate";
import { DesignContext } from "../../Services/DesignService";
import ReactLoading from "react-loading";
import Search from "../../components/Search/Search";
import { sidebarList } from "./SidebarData";
import Select from "react-select";

const selectStyle = {
  option: (styles) => ({ ...styles, textTransform: "capitalize" }),
  control: (styles) => ({
    ...styles,
    padding: "0.1rem 0rem",
    borderColor: "#d0d0d0",
    textTransform: "capitalize",
  }),
};

const Designs = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    setPage,
    itemsPerPage,
    DesignsCount,
    page,
    name,
    setName,
    category,
    setCategory,
  } = useContext(DesignContext);

  return (
    <div className="content design">
      <div className="headers">
        <ProFreeButtons />
        <Search
          searchName="search in designs ..."
          keyword={name}
          setKeyword={setName}
        />
        <Select
          defaultValue={category}
          onChange={(d) => setCategory(d.value)}
          placeholder="Categories"
          options={sidebarList}
          styles={selectStyle}
        />
      </div>
      <div className="cardList wrapper">
        {isLoading ? (
          <ReactLoading
            type={"bars"}
            color={"gray"}
            height={"30%"}
            width={"20%"}
          />
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : (
          <div className="grid-container">
            {data &&
              data.designs.map((card) => {
                return (
                  <div className="card" key={card._id}>
                    <Card id={card._id} src={card.keyList} desc={card.name} />
                  </div>
                );
              })}
          </div>
        )}
      </div>
      <div className="bottom">
        <ReactPaginate
          breakLabel="..."
          nextLabel="forward"
          onPageChange={(event) => setPage(event.selected + 1)}
          pageRangeDisplayed={3}
          pageCount={Math.ceil(DesignsCount / itemsPerPage)}
          previousLabel="backward"
          renderOnZeroPageCount={null}
          pageClassName="page"
          pageLinkClassName="pagelink"
          previousClassName="previouse"
          previousLinkClassName="previouselink"
          nextClassName="next"
          nextLinkClassName="nextlink"
          breakClassName="break"
          breakLinkClassName="breaklink"
          containerClassName="container"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default Designs;
