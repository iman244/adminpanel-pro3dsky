import React, { useState } from "react";
import Modal from "../Modal";
import "./userCard.css";
import UpdateUser from "../../../components/FetchesViews/UpdateUser";
import DeleteUser from "../../../components/FetchesViews/DeleteUser";

const UserCard = ({ user }) => {
  const { username, password, isAdmin } = user;
  const [modalOpenUpdate, setModalOpenUpdate] = useState(false);
  const [modalOpenDelete, setModalOpenDelete] = useState(false);

  return (
    <>
      <div className="userCard">
        <div className="credential-wrapper">
          <span className="label">username:</span>
          <span className="credential" title={username}>
            {username}
          </span>
        </div>
        <div className="credential-wrapper">
          <span className="label">password:</span>
          <span className="credential" title={password}>
            {password}
          </span>
        </div>
        <div className="credential-wrapper">
          <span className="label">isAdmin:</span>
          <span className="credential" title={`${isAdmin}`}>
            {isAdmin ? (
              <i
                className="fa-solid fa-check fa-lg"
                style={{ color: "green" }}
              ></i>
            ) : (
              <i
                className="fa-solid fa-xmark fa-lg"
                style={{ color: "red" }}
              ></i>
            )}
          </span>
        </div>
        <div className="buttons">
          <button onClick={() => setModalOpenUpdate(true)}>update</button>
          <button className="delete" onClick={() => setModalOpenDelete(true)}>
            delete
          </button>
        </div>
      </div>
      <Modal
        modalOpen={modalOpenUpdate}
        setModalOpen={setModalOpenUpdate}
        content={<UpdateUser user={user} setModal={setModalOpenUpdate} />}
      />
      <Modal
        modalOpen={modalOpenDelete}
        setModalOpen={setModalOpenDelete}
        content={<DeleteUser user={user} setModal={setModalOpenDelete} />}
      />
    </>
  );
};

export default UserCard;
