import "@arcgis/core/assets/esri/themes/dark/main.css";
import React, { useReducer } from "react";
import SideBar from "../components/Sidebar/SideBar";
//import * as styles from "../styles/Home.module.scss";
import styles from "../styles/Home.module.scss";
//import * as globalStyles from "../styles/globals.scss";

import FILTERS from "../constants/filters";
import EsriMap from "../components/EsriMap";
import EsriMapWithNoSSR from "../components/EsriMapWithNoSSR";

import BarChart from "../components/BarChart";
const UPDATE_FOCUSSED_BUILDING = "UPDATE_FOCUSSED_BUILDING";
const UNFOCUS = "UNFOCUS";
const UPDATE_FILTERS = "UPDATE_FILTERS";

import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

const initialState: ReducerState = {
  buildingData: null,
  filters: [],
};

// interface ContextType {
//   state: any;
//   dispatch: React.Dispatch<ReducerActions>;
// }

// const SideBarContext = React.createContext<initialState>({
//   state: "default value",
//   dispatch: () =>{} ,
// });


const SideBarContext = React.createContext(null);

// state of the map page
// building data - information about the currently focussed building
// filters - array of which filters are currently applied
type ReducerState = {
  buildingData: {} | null;
  filters: [keyof typeof FILTERS] | [];
};

type ReducerActions =
  | {
      type: "UPDATE_FOCUSSED_BUILDING";
      payload: {
        buildingData: ReducerState["buildingData"];
      };
    }
  | {
      type: "UNFOCUS";
    }
  | {
      type: "UPDATE_FILTERS";
      payload: {
        filters: ReducerState["filters"];
      };
    };

const reducer = (state: ReducerState, action: ReducerActions) => {
  // console.log("action: ", action);
  switch (action.type) {
    case UPDATE_FOCUSSED_BUILDING:
      return {
        ...state,
        buildingData: action.payload?.buildingData,
      };
    case UPDATE_FILTERS:
      return {
        ...state,
        filters: action.payload?.filters,
      };
    case UNFOCUS:
      return {
        ...state,
        buildingData: null,
      };
    default:
      return initialState;
  }
};

function HomePage() {
  
  // We manage the state of the map in this parent and use context to pass it to both the sidebar and map components.
  // Lifting the state like this is important, for instance it allows us to save the filter state even when the sidebar unfocussed component is unmounted.
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className={styles.mapContainer}>
      <SideBarContext.Provider value={{ state, dispatch}}>
        <SideBar></SideBar>
        <EsriMapWithNoSSR />
      </SideBarContext.Provider>
    </div>
  );
}

export {
  HomePage as default,
  SideBarContext,
  UPDATE_FOCUSSED_BUILDING,
  UNFOCUS,
};
