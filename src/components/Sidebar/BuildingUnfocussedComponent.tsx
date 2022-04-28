import React, { useContext, useState, useEffect } from "react";
import FILTERS from "../../constants/filters";
import { SideBarContext } from "../../pages";
import styles from "../../styles/SideBar.module.scss";
import Filters from "../Filters";

const BuildingUnfocussedComponent = () => {
  return (
    <div className={styles.spanBoth}>
      <h2 className={styles.title}>Energy Usage Dashboard</h2>
      <p>
        Welcome to the Lehigh Energy and Water Usage Dashboard. Hover over a
        building to view data.
      </p>
      <Filters></Filters>
    </div>
  );
};

export default BuildingUnfocussedComponent;
