import React from "react";
import "./proFreeButtons.css";
import { useContext } from "react";
import { DesignContext } from "../../../../Services/DesignService";
import { useEffect } from "react";

const ProFreeButtons = () => {
  const { pro, setPro, free, setFree } = useContext(DesignContext);

  useEffect(() => {});

  return (
    <div className="buttons">
      <div className="content proFreeButtons">
        <button
          className={pro ? "proFreeButtons selected" : "proFreeButtons"}
          onClick={() => setPro(!pro)}
        >
          pro
        </button>
        <button
          className={free ? "proFreeButtons selected" : "proFreeButtons"}
          onClick={() => setFree(!free)}
        >
          free
        </button>
      </div>
    </div>
  );
};

export default ProFreeButtons;
