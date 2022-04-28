import React, { useContext } from "react";
import { SideBarContext } from "../../pages/index";
import styles from "../../styles/SideBar.module.scss";
import BuildingFocussedComponent from "./BuildingFocussedComponent";
import BuildingUnfocussedComponent from "./BuildingUnfocussedComponent";

const SideBar = () => {
  const {
    state: { buildingData },
  } = useContext(SideBarContext);

  return (
    <div className={styles.sidebar}>
      {buildingData != null && Object.keys(buildingData).length != 0 ? (
        <BuildingFocussedComponent buildingData={buildingData} />
      ) : (
        <BuildingUnfocussedComponent />
      )}
    </div>
  );
};

export default SideBar;
