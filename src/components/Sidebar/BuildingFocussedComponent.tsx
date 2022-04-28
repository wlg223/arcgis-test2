import React, { useEffect, useState, useMemo } from "react";
import styles from "../../styles/SideBar.module.scss";
import BarChart from "../../components/BarChart";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Button from "../Button";
import Link from "next/link";
import Query from "@arcgis/core/rest/support/Query";
import useLastWathTotTable from "../../hooks/useLastWathTotTable";
import intl from "esri/intl";


// type buildingData = {
//   YEARBUILT: intl,
//   SHORTNAME: String,
//   LONGNAME: String,
//   GROSSAREA: intl,
//   BUILDINGID: intl,
// }

const BuildingFocussedComponent = ({ buildingData }) => {
  const {
    YEARBUILT: yearBuilt,
    SHORTNAME: shortName,
    LONGNAME: longName,
    GROSSAREA: grossArea,
    BUILDINGID: id,
  } = buildingData || {};

  const createQuery = (): Query => {
    let q = new Query();
    q.outFields = ["wathtot", "Time"];
    q.where = `BUILDINGID = '${id}' AND time >= CURRENT_TIMESTAMP - INTERVAL '8982' HOUR AND time <= CURRENT_TIMESTAMP - INTERVAL '60' HOUR`;
    return q;
  };
  let sum = 0;
  let data = useLastWathTotTable(createQuery());
  console.log(data);
  data
    ? data.map((d) => {
        sum += (d.wathtot/1000.0);
      })
    : 0;
  let avg = (sum/365);
  let EUI = (sum*3.41214)/grossArea;

  return (
    <>
      <h2 className={styles.title}>{longName}</h2>
      <DataPoint
        title="Energy Use Intensity"
        data={`${EUI.toLocaleString()} kBtu/ft\u00B2`}
      />
      <DataPoint
        title="Average Energy Usage"
        data={`${avg.toLocaleString()} kWh/day`}
      />
      <DataPoint title="Year Built" data={yearBuilt} />
      <DataPoint title="Square Footage" data={`${grossArea} ft\u00B2`} />
      <DataPoint
        spanBoth
        title="Annual Usage"
        data={`${sum.toLocaleString()} kWh/year`}
      />
      <div className={styles.spanBoth}>
        <Link href={`/details/${id}`}>
          <Button text="View Details"></Button>
        </Link>
      </div>
    </>
  );
};

const DataPoint = ({ title, data, spanBoth = false }) => {
  return (
    <div className={`${styles.dataPoint} ${spanBoth && styles.spanBoth}`}>
      <p>{title}</p>
      {data}
    </div>
  );
};

export default BuildingFocussedComponent;
