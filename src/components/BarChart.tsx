import React, { useEffect, useState, useMemo } from "react";
import { SideBarContext } from "../pages";
import Highcharts from "highcharts";
import styles from "../styles/BarChart.module.scss";
// import {HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, Legend, LineSeries, Caption, ColumnSeries, SplineSeries, PieSeries} from 'react-jsx-highcharts';
import HighchartsReact from "highcharts-react-official";
//import { info } from "console";
import Query from "@arcgis/core/rest/support/Query";
import useInitiumTable from "../hooks/useInitiumTable";
import intl from "esri/intl";


type BarChartProps = {
  bId: intl;
  timeFrame: intl;
}


/**
 *  Uses HighCharts React to render a bar chart.
 *  This component could be easily generalized to support all types of charts that HighCharts supports.
 *  Essentially just update the options and the query and we can display whatever we want.
 */

const BarChart: React.FC<BarChartProps> = ({ bId, timeFrame }) => {
  // TODO: memo-ize this function?
  const createQuery = (): Query => {
    let q = new Query();
    q.outFields = ["Watts", "time"];
    q.where = `BUILDINGID = '${bId}' AND time >= CURRENT_TIMESTAMP - INTERVAL '168' HOUR`;
    return q;
  };

  const data = useInitiumTable(createQuery());

  const options = useMemo<Highcharts.Options>(() => {
    const opts: Highcharts.Options = {
      chart: {
        zoomType: "x",
      },
      tooltip: {
        pointFormatter: function () {
          // const d = new Date(this.x).toLocaleString(undefined, {
          //   month: "2-digit",
          //   day: "2-digit",
          //   year: "2-digit",
          //   second: "2-digit",
          //   minute: "2-digit",
          // });
          const energy = parseInt(this.y + "").toLocaleString() + " kW";

          return `Used ${energy}`;
        },
      },
      title: {
        text: "Wattage over Time",
      },
      yAxis: {
        title: {
          text: "Wattage (kW)",
        },
        labels: {
          formatter: function () {
            return parseInt(this.value + "").toLocaleString() + " kW";
          },
        },
      },
      xAxis: {
        title: {
          text: "Time",
        },
        labels: {
          allowOverlap: false,
          padding: 20,
          formatter: function () {
            return new Date(this.value).toLocaleString(undefined, {
              month: "2-digit",
              day: "2-digit",
              year: "2-digit",
              hour: "numeric",
              minute: "2-digit",
            });
          },
        },
        type: "datetime",
        // tickInterval: 1000 * 60 * 60 * 12
        // milliseconds * seconds * minutes * hours * days = 1 year
      },
      series: [
        {
          name: "Energy Consumption",
          type: "area",
          data: data
            ? data.map((d: any) => {
                return [
                  d.time,
                  d.Watts/1000.0,
                ];
              })
            : [],
        },
      ],
    };
    return opts;
  }, [data]);

  return (
    <div className={styles.container}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default BarChart;
