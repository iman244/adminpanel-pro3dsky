import React from "react";
import "./proFreeButtons.css";
import Select from "react-select";
import { sidebarList } from "../../SidebarData";
import { useContext } from "react";
import { DesignContext } from "../../../../Services/DesignService";
import { useEffect } from "react";

const selectStyle = {
  option: (styles) => ({ ...styles, textTransform: "capitalize" }),
  control: (styles) => ({
    ...styles,
    padding: "0.1rem 0rem",
    borderColor: "#d0d0d0",
    textTransform: "capitalize",
  }),
};

const ProFreeButtons = () => {
  const { pro, setPro, free, setFree, category, setCategory } =
    useContext(DesignContext);

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
      <div className="sidebarOptions">
        <Select
          defaultValue={category}
          onChange={(d) => setCategory(d.value)}
          placeholder="Categories"
          options={sidebarList}
          styles={selectStyle}
        />
      </div>
    </div>
  );
};

export default ProFreeButtons;
