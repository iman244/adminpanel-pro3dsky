import React, { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import CreateUser from "../../components/FetchesViews/CreateUser";
import UserCard from "./UserCard/UserCard";
import "./users.css";
import ReactPaginate from "react-paginate";
import { UsersContext } from "./UsersService";
import Search from "../../components/Search/Search";
import LoaderPaginate from "./LoaderPaginate";
import ReactLoading from "react-loading";

const Users = () => {
  const [modalOpenCreate, setModalOpenCreate] = useState(false);
  const [viewPortSizeSmall, setViewPortSizeSmall] = useState(true);
  const handleView = () => {
    if (window.innerWidth <= 768) {
      setViewPortSizeSmall(true);
    } else {
      setViewPortSizeSmall(false);
    }
  };
  window.addEventListener("resize", handleView);
  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    setPage,
    itemsPerPage,
    usersCount,
    page,
    keyword,
    setKeyword,
  } = useContext(UsersContext);

  useEffect(() => {
    handleView();
  }, []);

  return (
    <div className="users-container">
      <div className="top">
        <div className="headers">
          {!viewPortSizeSmall && <h2 title="users list">users list</h2>}
          <Search
            searchName="search in users ..."
            keyword={keyword}
            setKeyword={setKeyword}
          />
          <button
            className="create-user"
            title="create new user"
            onClick={() => setModalOpenCreate(true)}
          >
            <i className="fa-solid fa-plus"></i>
            {viewPortSizeSmall ? (
              <i className="fa-solid fa-user"></i>
            ) : (
              <span>create new user</span>
            )}
          </button>
        </div>

        {isLoading ? (
          <ReactLoading
            type={"bars"}
            color={"gray"}
            height={"30%"}
            width={"30%"}
          />
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : (
          <div className="users-grid">
            {data.users.map((user) => (
              <UserCard key={user.username} user={user} />
            ))}
          </div>
        )}

        {isFetching ? <span> Loading...</span> : null}
        <Modal
          modalOpen={modalOpenCreate}
          setModalOpen={setModalOpenCreate}
          content={<CreateUser setModal={setModalOpenCreate} />}
        />
      </div>

      <div className="bottom">
        {isLoading ? (
          <LoaderPaginate />
        ) : (
          <ReactPaginate
            breakLabel="..."
            nextLabel="forward"
            onPageChange={(event) => setPage(event.selected + 1)}
            pageRangeDisplayed={3}
            pageCount={Math.ceil(usersCount / itemsPerPage)}
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
        )}
      </div>
    </div>
  );
};

export default Users;
