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
import Error403 from "../../components/Error403/Error403";
import { Link } from "react-router-dom";

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
  const [viewPortSizeSmall, setViewPortSizeSmall] = useState(true);

  const {
    isLoading,
    isError,
    error,
    data,
    setPage,
    itemsPerPage,
    DesignsCount,
    name,
    setName,
    category,
    setCategory,
  } = useContext(DesignContext);

  const handleView = () => {
    if (window.innerWidth <= 768) {
      setViewPortSizeSmall(true);
    } else {
      setViewPortSizeSmall(false);
    }
  };

  window.addEventListener("resize", handleView);

  useEffect(() => {
    handleView();
  }, []);

  return (
    <div className="content design">
      <div className="headers DesignToolbar">
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
        <Link
          to="/design/upload"
          className="upload-new-design"
          title="upload new design"
        >
          <i className="fa-solid fa-plus"></i>
          {viewPortSizeSmall ? (
            <i className="fa-solid fa-chair design"></i>
          ) : (
            <span>upload new design</span>
          )}
        </Link>
      </div>
      <div className="cardList wrapper">
        {isLoading ? (
          <ReactLoading
            type={"bars"}
            color={"gray"}
            height={"fit-content"}
            width={"200px"}
          />
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : (
          <>
            <div className="grid-container">
              {data && data.statusCode === 403 ? (
                <Error403 />
              ) : data.totalDesigns ? (
                data.designs.map((card) => {
                  return (
                    <div className="card" key={card._id}>
                      <Card
                        id={card._id}
                        src={card.keyList}
                        desc={card.name}
                        isPremium={card.isPremium}
                      />
                    </div>
                  );
                })
              ) : (
                <p>
                  there is no item to show please{" "}
                  <Link to="/design/upload" className="textLink">
                    upload new item!
                  </Link>
                </p>
              )}
            </div>
          </>
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
