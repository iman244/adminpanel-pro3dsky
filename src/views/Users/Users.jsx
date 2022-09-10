import React, { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import CreateUser from "../../components/FetchesViews/CreateUser";
import UserCard from "./UserCard/UserCard";
import "./users.css";
import ReactPaginate from "react-paginate";
import { UsersContext } from "./UsersService";
import Search from "../../components/Search/Search";

const Users = () => {
    const [modalOpenCreate, setModalOpenCreate] = useState(false);
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
        setKeyword
    } = useContext(UsersContext);

    useEffect(() => {
        console.log("data", data)
    });

    return (
        <div className="users-container">
            <div className="top">
                <div className="headers">
                    <h2>users list</h2>
                    <Search searchName="search users" keyword={keyword} setKeyword={setKeyword} />
                    <button
                        className="create-user"
                        onClick={() => setModalOpenCreate(true)}
                    >
                        <i className="fa-solid fa-plus"></i>
                        <span>create new user</span>
                    </button>
                </div>

                <div className="users-grid">
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : isError ? (
                        <div>Error: {error.message}</div>
                    ) : (
                        data.users.map((user) => (
                            <UserCard key={user.username} user={user} />
                        ))
                    )}
                    {isFetching ? <span> Loading...</span> : null}

                    <Modal
                        modalOpen={modalOpenCreate}
                        setModalOpen={setModalOpenCreate}
                        content={<CreateUser />}
                    />
                </div>
            </div>

            <div className="bottom">
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
            </div>
        </div>
    );
};

export default Users;
