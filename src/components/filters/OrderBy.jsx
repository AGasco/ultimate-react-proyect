import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

function OrderBy({ curOrderBy, setCurOrderBy }) {
  //Dynamic UI
  const setUpOrderButton = (name) => {
    return (
      <button onClick={() => setCurOrderBy(name)} className="sidebar__orderBtn">
        {setUpOrderIcon(name)}
        {name[0].toUpperCase() + name.slice(1)}
      </button>
    );
  };

  //Dynamic UI
  const setUpOrderIcon = (name) => {
    if (curOrderBy?.includes(name)) {
      if (curOrderBy[0] === "-") return <FontAwesomeIcon icon={faArrowDown} />;
      else return <FontAwesomeIcon icon={faArrowUp} />;
    }
  };
  return (
    <div className="sidebar__sectionContainer orderBy">
      <h4 className="sidebar__subtitle">Order by</h4>
      <div className="sidebar__orderByContainer">
        {setUpOrderButton("name")}
        {setUpOrderButton("released")}
        {setUpOrderButton("metacritic")}
      </div>
    </div>
  );
}

export default OrderBy;
